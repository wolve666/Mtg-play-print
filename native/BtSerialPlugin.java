package it.educk.magicplayprint;

import android.Manifest;
import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothClass;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import androidx.core.content.ContextCompat;
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
// Qui c'è anche la ricerca delle stampanti nuove e l'accoppiamento, senza passare dalle impostazioni di Android.
@SuppressLint("MissingPermission")
@CapacitorPlugin(
    name = "BtSerial",
    permissions = {
        @Permission(alias = "bt", strings = { Manifest.permission.BLUETOOTH_CONNECT }),
        @Permission(alias = "scan", strings = { Manifest.permission.BLUETOOTH_SCAN, Manifest.permission.BLUETOOTH_CONNECT }),
        @Permission(alias = "loc", strings = { Manifest.permission.ACCESS_FINE_LOCATION }) // solo Android 11 e precedenti
    }
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

    // ricerca e accoppiamento: "Dispositivi nelle vicinanze" da Android 12, prima la posizione
    private String scanAlias() { return Build.VERSION.SDK_INT >= 31 ? "scan" : "loc"; }
    private boolean needScanPerm(PluginCall c) {
        if (getPermissionState(scanAlias()) != PermissionState.GRANTED) {
            requestPermissionForAlias(scanAlias(), c, "scanPermCb");
            return true;
        }
        return false;
    }

    @PermissionCallback
    private void permCb(PluginCall c) {
        if (getPermissionState("bt") != PermissionState.GRANTED) { c.reject("Permesso Bluetooth negato"); return; }
        if ("list".equals(c.getMethodName())) list(c); else connect(c);
    }

    @PermissionCallback
    private void scanPermCb(PluginCall c) {
        if (getPermissionState(scanAlias()) != PermissionState.GRANTED) { c.reject("Permesso «Dispositivi nelle vicinanze» negato"); return; }
        if ("pair".equals(c.getMethodName())) pair(c); else scan(c);
    }

    // ---------- ricerca delle stampanti nuove ----------
    private BroadcastReceiver scanRx;

    @PluginMethod
    public void scan(PluginCall c) {
        if (needScanPerm(c)) return;
        BluetoothAdapter ad = adapter();
        if (ad == null || !ad.isEnabled()) { c.reject("il Bluetooth è spento"); return; }
        stopScan0();
        scanRx = new BroadcastReceiver() {
            @Override
            public void onReceive(Context ctx, Intent i) {
                String a = i.getAction();
                if (BluetoothDevice.ACTION_FOUND.equals(a)) {
                    BluetoothDevice d = i.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                    if (d == null) return;
                    String name = null;
                    try { name = d.getName(); } catch (Exception ignored) {}
                    if (name == null) name = i.getStringExtra(BluetoothDevice.EXTRA_NAME);
                    BluetoothClass bc = i.getParcelableExtra(BluetoothDevice.EXTRA_CLASS);
                    JSObject o = new JSObject();
                    o.put("address", d.getAddress());
                    o.put("name", name);
                    o.put("type", d.getType());
                    o.put("bonded", d.getBondState() == BluetoothDevice.BOND_BONDED);
                    o.put("major", bc != null ? bc.getMajorDeviceClass() : -1);
                    o.put("rssi", (int) i.getShortExtra(BluetoothDevice.EXTRA_RSSI, Short.MIN_VALUE));
                    notifyListeners("found", o);
                } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(a)) {
                    stopScan0();
                    notifyListeners("scanDone", new JSObject());
                }
            }
        };
        IntentFilter f = new IntentFilter(BluetoothDevice.ACTION_FOUND);
        f.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
        ContextCompat.registerReceiver(getContext(), scanRx, f, ContextCompat.RECEIVER_EXPORTED);
        try {
            if (!ad.startDiscovery()) { stopScan0(); c.reject("ricerca non avviata"); return; }
        } catch (Exception e) { stopScan0(); c.reject(String.valueOf(e.getMessage())); return; }
        c.resolve();
    }

    @PluginMethod
    public void stopScan(PluginCall c) { stopScan0(); c.resolve(); }

    private void stopScan0() {
        if (scanRx != null) { try { getContext().unregisterReceiver(scanRx); } catch (Exception ignored) {} scanRx = null; }
        try { BluetoothAdapter ad = adapter(); if (ad != null) ad.cancelDiscovery(); } catch (Exception ignored) {}
    }

    // ---------- accoppiamento ----------
    // provo da solo i PIN più comuni delle stampantine (0000, poi 1234); se Android chiede conferma, basta un tocco
    private static final String[] PINS = { "0000", "1234" };
    private BroadcastReceiver bondRx;
    private PluginCall pairCall;
    private BluetoothDevice pairDev;
    private int pinIdx;
    private boolean pinSent;
    private final Handler main = new Handler(Looper.getMainLooper());
    private final Runnable pairTimeout = () -> pairEnd(false, "tempo scaduto");

    @PluginMethod
    public void pair(PluginCall c) {
        if (needScanPerm(c)) return;
        stopScan0();
        if (pairCall != null) pairEnd(false, "annullato");
        BluetoothDevice d;
        try { d = adapter().getRemoteDevice(c.getString("address")); }
        catch (Exception e) { c.reject("indirizzo non valido"); return; }
        if (d.getBondState() == BluetoothDevice.BOND_BONDED) { c.resolve(); return; }
        pairCall = c; pairDev = d; pinIdx = 0; pinSent = false;
        bondRx = new BroadcastReceiver() {
            @Override
            public void onReceive(Context ctx, Intent i) {
                BluetoothDevice x = i.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                if (x == null || pairDev == null || !pairDev.getAddress().equals(x.getAddress())) return;
                if (BluetoothDevice.ACTION_PAIRING_REQUEST.equals(i.getAction())) {
                    int v = i.getIntExtra(BluetoothDevice.EXTRA_PAIRING_VARIANT, -1);
                    if (v == BluetoothDevice.PAIRING_VARIANT_PIN) {
                        try { x.setPin(PINS[pinIdx].getBytes()); pinSent = true; } catch (Exception ignored) {}
                    }
                    return;
                }
                int st = i.getIntExtra(BluetoothDevice.EXTRA_BOND_STATE, BluetoothDevice.ERROR);
                int prev = i.getIntExtra(BluetoothDevice.EXTRA_PREVIOUS_BOND_STATE, BluetoothDevice.ERROR);
                if (st == BluetoothDevice.BOND_BONDED) pairEnd(true, null);
                else if (st == BluetoothDevice.BOND_NONE && prev == BluetoothDevice.BOND_BONDING) {
                    // PIN sbagliato: provo il successivo
                    if (pinSent && pinIdx < PINS.length - 1) {
                        pinIdx++; pinSent = false;
                        main.postDelayed(() -> { try { if (pairDev != null && !pairDev.createBond()) pairEnd(false, "non riuscito"); } catch (Exception e) { pairEnd(false, e.getMessage()); } }, 600);
                    } else pairEnd(false, "rifiutato o PIN sbagliato");
                }
            }
        };
        IntentFilter f = new IntentFilter(BluetoothDevice.ACTION_BOND_STATE_CHANGED);
        f.addAction(BluetoothDevice.ACTION_PAIRING_REQUEST);
        f.setPriority(IntentFilter.SYSTEM_HIGH_PRIORITY - 1);
        ContextCompat.registerReceiver(getContext(), bondRx, f, ContextCompat.RECEIVER_EXPORTED);
        main.postDelayed(pairTimeout, 60000);
        try {
            if (!d.createBond()) pairEnd(false, "non avviato");
        } catch (Exception e) { pairEnd(false, e.getMessage()); }
    }

    private void pairEnd(boolean ok, String why) {
        main.removeCallbacks(pairTimeout);
        if (bondRx != null) { try { getContext().unregisterReceiver(bondRx); } catch (Exception ignored) {} bondRx = null; }
        PluginCall c = pairCall;
        pairCall = null; pairDev = null;
        if (c == null) return;
        if (ok) c.resolve(); else c.reject(String.valueOf(why));
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
