package it.educk.magicplayprint;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(BtSerialPlugin.class); // stampa via Bluetooth classico (SPP)
        registerPlugin(SpeechPlugin.class); // dettatura con il riconoscimento vocale di Android
        super.onCreate(savedInstanceState);
    }
}
