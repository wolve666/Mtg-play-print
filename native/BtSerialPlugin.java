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

    @PluginMethod
    public void connect(PluginCall c) {
        if (needPerm(c)) return;
        final String addr = c.getString("address");
        ex.execute(() -> {
            try {
                close0();
                BluetoothAdapter ad = adapter();
                try { ad.cancelDiscovery(); } catch (Exception ignored) {}
                BluetoothDevice d = ad.getRemoteDevice(addr);
                BluetoothSocket s;
                try {
                    s = d.createRfcommSocketToServiceRecord(SPP);
                    s.connect();
                } catch (Exception first) {
                    // alcune stampantine rispondono solo sul canale 1
                    s = (BluetoothSocket) d.getClass().getMethod("createRfcommSocket", int.class).invoke(d, 1);
                    s.connect();
                }
                sock = s;
                out = s.getOutputStream();
                c.resolve();
            } catch (Exception e) {
                close0();
                c.reject("Collegamento non riuscito: " + e.getMessage());
            }
        });
    }

    @PluginMethod
    public void write(PluginCall c) {
        final String b64 = c.getString("data", "");
        ex.execute(() -> {
            try {
                if (out == null) throw new Exception("non collegata");
                out.write(Base64.decode(b64, Base64.DEFAULT));
                out.flush();
                c.resolve();
            } catch (Exception e) {
                close0();
                notifyListeners("disconnected", new JSObject());
                c.reject(String.valueOf(e.getMessage()));
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
