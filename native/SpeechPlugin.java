package it.educk.magicplayprint;

import android.Manifest;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.RecognitionSupport;
import android.speech.RecognitionSupportCallback;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import java.util.ArrayList;
import java.util.List;

// dettatura con il riconoscimento vocale di Android (quello della WebView non funziona dentro l'app)
// - i nomi delle pedine arrivano dall'app come parole da preferire (Android 13+)
// - se sul telefono c'è il riconoscimento italiano installato, si usa quello (anche senza rete);
//   se fallisce prima che si parli, si riparte da soli con il servizio normale
@CapacitorPlugin(name = "Speech", permissions = { @Permission(alias = "mic", strings = { Manifest.permission.RECORD_AUDIO }) })
public class SpeechPlugin extends Plugin {
    private SpeechRecognizer sr;
    private Boolean devIt = null; // italiano installato sul telefono: null = non ancora saputo
    private boolean stopped = false;

    @Override
    public void load() {
        if (Build.VERSION.SDK_INT < 33) { devIt = false; return; }
        new Handler(Looper.getMainLooper()).post(() -> {
            try {
                if (Build.VERSION.SDK_INT < 33 || !SpeechRecognizer.isOnDeviceRecognitionAvailable(getContext())) { devIt = false; return; }
                final SpeechRecognizer chk = SpeechRecognizer.createOnDeviceSpeechRecognizer(getContext());
                Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "it-IT");
                chk.checkRecognitionSupport(i, getContext().getMainExecutor(), new RecognitionSupportCallback() {
                    public void onSupportResult(RecognitionSupport s) {
                        boolean ok = false;
                        for (String l : s.getInstalledOnDeviceLanguages()) if (l.toLowerCase().startsWith("it")) ok = true;
                        devIt = ok; chk.destroy();
                    }
                    public void onError(int e) { devIt = false; chk.destroy(); }
                });
            } catch (Exception e) { devIt = false; }
        });
    }

    @PluginMethod
    public void start(PluginCall c) {
        if (getPermissionState("mic") != PermissionState.GRANTED) { requestPermissionForAlias("mic", c, "micCb"); return; }
        start0(c);
    }

    @PermissionCallback
    private void micCb(PluginCall c) {
        if (getPermissionState("mic") == PermissionState.GRANTED) c.reject("riprova"); // il dito ormai è alzato: si riparte al prossimo tocco
        else c.reject("perm");
    }

    private void start0(PluginCall c) {
        final String lang = c.getString("lang", "it-IT");
        final int sid = c.getInt("sid", 0); // ogni evento porta il numero della sua richiesta: quelli vecchi l'app li ignora
        final boolean dev = c.getBoolean("dev", true);
        final ArrayList<String> bias = new ArrayList<>();
        try { JSArray b = c.getArray("bias"); if (b != null) { List<Object> l = b.toList(); for (Object x : l) if (x instanceof String) bias.add((String) x); } } catch (Exception ignored) {}
        getActivity().runOnUiThread(() -> {
            try {
                if (!SpeechRecognizer.isRecognitionAvailable(getContext())) { c.reject("nessun servizio di riconoscimento vocale"); return; }
                stopped = false;
                listen(lang, sid, bias, dev && Boolean.TRUE.equals(devIt));
                c.resolve();
            } catch (Exception e) { c.reject(e.getMessage()); }
        });
    }

    private void listen(final String lang, final int sid, final ArrayList<String> bias, final boolean onDev) {
        if (sr != null) { sr.destroy(); sr = null; }
        sr = onDev ? SpeechRecognizer.createOnDeviceSpeechRecognizer(getContext()) : SpeechRecognizer.createSpeechRecognizer(getContext());
        final SpeechRecognizer me = sr;
        final boolean[] heard = { false };
        final String[] last = { null }; // l'ultima trascrizione parziale: quella sul telefono a volte chiude con un risultato vuoto
        sr.setRecognitionListener(new RecognitionListener() {
            public void onReadyForSpeech(Bundle b) {}
            public void onBeginningOfSpeech() { heard[0] = true; }
            public void onRmsChanged(float v) {}
            public void onBufferReceived(byte[] b) {}
            public void onEndOfSpeech() {}
            public void onEvent(int t, Bundle b) {}
            public void onError(int e) {
                // sul telefono non è andata prima ancora di parlare (lingua mancante, servizio occupato…): riparto con il servizio normale
                if (onDev && sr == me && !heard[0] && !stopped && e != 7 && e != 6) {
                    devIt = false;
                    getActivity().runOnUiThread(() -> { try { listen(lang, sid, bias, false); } catch (Exception x) { sendErr(e, sid); } });
                    return;
                }
                sendErr(e, sid);
                if (e != 8) free();
            }
            public void onPartialResults(Bundle b) {
                ArrayList<String> m = b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                if (m != null && !m.isEmpty()) { heard[0] = true; last[0] = m.get(0); JSObject o = new JSObject(); o.put("text", m.get(0)); o.put("sid", sid); notifyListeners("partial", o); }
            }
            public void onResults(Bundle b) {
                ArrayList<String> m = b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                JSArray a = new JSArray(); if (m != null) for (String x : m) if (x != null && !x.trim().isEmpty()) a.put(x);
                if (a.length() == 0 && last[0] != null) a.put(last[0]);
                JSObject o = new JSObject(); o.put("matches", a); o.put("sid", sid); o.put("dev", onDev);
                notifyListeners("result", o);
                free(); // libero il riconoscitore: altrimenti la richiesta dopo trova il microfono occupato
            }
        });
        Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
        i.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5);
        if (onDev) i.putExtra(RecognizerIntent.EXTRA_PREFER_OFFLINE, true);
        // i nomi delle pedine (Tezzeret, Phyrexian…) da preferire: Android 13+, gli altri li ignorano
        if (Build.VERSION.SDK_INT >= 33 && !bias.isEmpty()) i.putStringArrayListExtra(RecognizerIntent.EXTRA_BIASING_STRINGS, bias);
        // finché tieni premuto non deve chiudersi da solo alle pause
        i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 10000);
        i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 10000);
        i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS, 15000);
        sr.startListening(i);
    }

    private void sendErr(int e, int sid) { JSObject o = new JSObject(); o.put("code", e); o.put("sid", sid); notifyListeners("error", o); }

    private void free() {
        final SpeechRecognizer old = sr; sr = null;
        if (old != null) getActivity().runOnUiThread(() -> { try { old.destroy(); } catch (Exception ignored) {} });
    }

    @PluginMethod
    public void stop(PluginCall c) { getActivity().runOnUiThread(() -> { stopped = true; if (sr != null) sr.stopListening(); c.resolve(); }); }

    @PluginMethod
    public void cancel(PluginCall c) { getActivity().runOnUiThread(() -> { stopped = true; if (sr != null) { sr.cancel(); sr.destroy(); sr = null; } c.resolve(); }); }
}
