package it.educk.magicplayprint;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothSocket;
import android.content.Context;
import android.os.Build;
import android.util.Base64;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import java.io.OutputStream;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// Bluetooth classico (porta seriale SPP): flusso continuo con controllo di flusso,
// la stampante riceve i dati alla velocità che le serve e non resta mai a secco.
@CapacitorPlugin(
    name = "BtSerial",
    permissions = { @Permission(alias = "bt", strings = { Manifest.permission.BLUETOOTH_CONNECT }) }
)
public class BtSerialPlugin extends Plugin {
    private static final UUID SPP = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    private final ExecutorService ex = Executors.newSingleThreadExecutor();
    private BluetoothSocket sock;
    private OutputStream out;

    private BluetoothAdapter adapter() {
        return ((BluetoothManager) getContext().getSystemService(Context.BLUETOOTH_SERVICE)).getAdapter();
    }

    private boolean needPerm(PluginCall c) {
        if (Build.VERSION.SDK_INT >= 31 && getPermissionState("bt") != PermissionState.GRANTED) {
            requestPermissionForAlias("bt", c, "permCb");
            return true;
        }
        return false;
    }

    @PermissionCallback
    private void permCb(PluginCall c) {
        if (getPermissionState("bt") != PermissionState.GRANTED) { c.reject("Permesso Bluetooth negato"); return; }
        if ("list".equals(c.getMethodName())) list(c); else connect(c);
    }

    @PluginMethod
    public void list(PluginCall c) {
        if (needPerm(c)) return;
        try {
            JSArray a = new JSArray();
            for (BluetoothDevice d : adapter().getBondedDevices()) {
                JSObject o = new JSObject();
                o.put("address", d.getAddress());
                o.put("name", d.getName());
                o.put("type", d.getType());
                a.put(o);
            }
            JSObject r = new JSObject();
            r.put("devices", a);
            c.resolve(r);
        } catch (Exception e) { c.reject(String.valueOf(e.getMessage())); }
    }

    private String addr0, how = "";

    // tre modi di aprire la porta seriale: le stampantine economiche spesso accettano solo quello "insecure"
    private BluetoothSocket open(String addr) throws Exception {
        BluetoothAdapter ad = adapter();
        try { ad.cancelDiscovery(); } catch (Exception ignored) {}
        BluetoothDevice d = ad.getRemoteDevice(addr);
        Exception last = null;
        for (int k = 0; k < 3; k++) {
            BluetoothSocket s = null;
            try {
                if (k == 0) { s = d.createInsecureRfcommSocketToServiceRecord(SPP); how = "insecure"; }
                else if (k == 1) { s = d.createRfcommSocketToServiceRecord(SPP); how = "secure"; }
                else { s = (BluetoothSocket) d.getClass().getMethod("createRfcommSocket", int.class).invoke(d, 1); how = "canale 1"; }
                s.connect();
                Thread.sleep(400); // la stampante deve "svegliarsi" prima di ricevere dati
                return s;
            } catch (Exception e) {
                last = e;
                try { if (s != null) s.close(); } catch (Exception ignored) {}
                Thread.sleep(300);
            }
        }
        throw last;
    }

    @PluginMethod
    public void connect(PluginCall c) {
        if (needPerm(c)) return;
        final String addr = c.getString("address");
        ex.execute(() -> {
            try {
                close0();
                sock = open(addr);
                out = sock.getOutputStream();
                addr0 = addr;
                JSObject r = new JSObject();
                r.put("how", how);
                c.resolve(r);
            } catch (Exception e) {
                close0();
                c.reject("Collegamento non riuscito: " + e.getMessage());
            }
        });
    }

    private void send(byte[] b) throws Exception {
        for (int i = 0; i < b.length; i += 512) {
            out.write(b, i, Math.min(512, b.length - i));
            out.flush();
        }
    }

    @PluginMethod
    public void write(PluginCall c) {
        final String b64 = c.getString("data", "");
        ex.execute(() -> {
            byte[] b = Base64.decode(b64, Base64.DEFAULT);
            try {
                if (out == null) throw new Exception("non collegata");
                send(b);
                c.resolve();
            } catch (Exception e) {
                // un tentativo di ricollegamento, poi rimando lo stesso blocco
                try {
                    close0();
                    if (addr0 == null) throw e;
                    sock = open(addr0);
                    out = sock.getOutputStream();
                    send(b);
                    c.resolve();
                } catch (Exception e2) {
                    close0();
                    notifyListeners("disconnected", new JSObject());
                    c.reject("SPP " + how + ": " + e.getMessage() + " / " + e2.getMessage());
                }
            }
        });
    }

    @PluginMethod
    public void disconnect(PluginCall c) {
        ex.execute(() -> { close0(); c.resolve(); });
    }

    private void close0() {
        try { if (sock != null) sock.close(); } catch (Exception ignored) {}
        sock = null;
        out = null;
    }
}
