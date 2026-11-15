package it.educk.magicplayprint;

import android.graphics.Rect;
import android.os.Build;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.JSArray;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(BtSerialPlugin.class); // stampa via Bluetooth classico (SPP)
        registerPlugin(SpeechPlugin.class); // dettatura con il riconoscimento vocale di Android
        registerPlugin(GesturesPlugin.class); // zone escluse dai gesti di sistema (linguette dello swipe)
        super.onCreate(savedInstanceState);
    }

    // Con la navigazione a gesti, uno swipe dal bordo sinistro o destro torna indietro.
    // Le linguette del pannello personale stanno su quei bordi: le escludo dai gesti di sistema.
    @CapacitorPlugin(name = "Gestures")
    public static class GesturesPlugin extends Plugin {
        @PluginMethod
        public void exclude(PluginCall call) {
            JSArray arr = call.getArray("rects");
            float d = getActivity().getResources().getDisplayMetrics().density;
            List<Rect> list = new ArrayList<>();
            try {
                for (int i = 0; arr != null && i < arr.length(); i++) {
                    JSONObject o = arr.getJSONObject(i);
                    int x = Math.round((float) o.getDouble("x") * d), y = Math.round((float) o.getDouble("y") * d);
                    int w = Math.round((float) o.getDouble("w") * d), h = Math.round((float) o.getDouble("h") * d);
                    list.add(new Rect(x, y, x + w, y + h));
                }
            } catch (Exception e) {
                call.reject("Rettangoli non validi");
                return;
            }
            getActivity().runOnUiThread(() -> {
                if (Build.VERSION.SDK_INT >= 29) getBridge().getWebView().setSystemGestureExclusionRects(list);
            });
            call.resolve();
        }
    }
}
