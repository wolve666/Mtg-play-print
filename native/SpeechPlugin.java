package it.educk.magicplayprint;

import android.Manifest;
import android.content.Intent;
import android.os.Bundle;
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

// dettatura con il riconoscimento vocale di Android (quello della WebView non funziona dentro l'app)
@CapacitorPlugin(name = "Speech", permissions = { @Permission(alias = "mic", strings = { Manifest.permission.RECORD_AUDIO }) })
public class SpeechPlugin extends Plugin {
    private SpeechRecognizer sr;

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
        getActivity().runOnUiThread(() -> {
            try {
                if (!SpeechRecognizer.isRecognitionAvailable(getContext())) { c.reject("nessun servizio di riconoscimento vocale"); return; }
                if (sr != null) { sr.destroy(); sr = null; }
                sr = SpeechRecognizer.createSpeechRecognizer(getContext());
                sr.setRecognitionListener(new RecognitionListener() {
                    public void onReadyForSpeech(Bundle b) {}
                    public void onBeginningOfSpeech() {}
                    public void onRmsChanged(float v) {}
                    public void onBufferReceived(byte[] b) {}
                    public void onEndOfSpeech() {}
                    public void onEvent(int t, Bundle b) {}
                    public void onError(int e) { JSObject o = new JSObject(); o.put("code", e); o.put("sid", sid); notifyListeners("error", o); if (e != 8) free(); }
                    public void onPartialResults(Bundle b) {
                        ArrayList<String> m = b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                        if (m != null && !m.isEmpty()) { JSObject o = new JSObject(); o.put("text", m.get(0)); o.put("sid", sid); notifyListeners("partial", o); }
                    }
                    public void onResults(Bundle b) {
                        ArrayList<String> m = b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                        JSArray a = new JSArray(); if (m != null) for (String x : m) a.put(x);
                        JSObject o = new JSObject(); o.put("matches", a); o.put("sid", sid);
                        notifyListeners("result", o);
                        free(); // libero il riconoscitore: altrimenti la richiesta dopo trova il microfono occupato
                    }
                });
                Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
                i.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
                i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5);
                // finché tieni premuto non deve chiudersi da solo alle pause
                i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 10000);
                i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 10000);
                i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS, 15000);
                sr.startListening(i);
                c.resolve();
            } catch (Exception e) { c.reject(e.getMessage()); }
        });
    }

    private void free() {
        final SpeechRecognizer old = sr; sr = null;
        if (old != null) getActivity().runOnUiThread(() -> { try { old.destroy(); } catch (Exception ignored) {} });
    }

    @PluginMethod
    public void stop(PluginCall c) { getActivity().runOnUiThread(() -> { if (sr != null) sr.stopListening(); c.resolve(); }); }

    @PluginMethod
    public void cancel(PluginCall c) { getActivity().runOnUiThread(() -> { if (sr != null) { sr.cancel(); sr.destroy(); sr = null; } c.resolve(); }); }
}
