package it.educk.magicplayprint;

import android.Manifest;
import android.os.Build;
import androidx.annotation.NonNull;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.nearby.Nearby;
import com.google.android.gms.nearby.connection.AdvertisingOptions;
import com.google.android.gms.nearby.connection.ConnectionInfo;
import com.google.android.gms.nearby.connection.ConnectionLifecycleCallback;
import com.google.android.gms.nearby.connection.ConnectionResolution;
import com.google.android.gms.nearby.connection.ConnectionsClient;
import com.google.android.gms.nearby.connection.ConnectionsStatusCodes;
import com.google.android.gms.nearby.connection.DiscoveredEndpointInfo;
import com.google.android.gms.nearby.connection.DiscoveryOptions;
import com.google.android.gms.nearby.connection.EndpointDiscoveryCallback;
import com.google.android.gms.nearby.connection.Payload;
import com.google.android.gms.nearby.connection.PayloadCallback;
import com.google.android.gms.nearby.connection.PayloadTransferUpdate;
import com.google.android.gms.nearby.connection.Strategy;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

// V2, telefoni collegati tra loro: Nearby Connections di Android (Bluetooth e Wi-Fi diretto, senza internet).
// Una stella: il telefono principale si fa trovare, gli altri lo cercano e chiedono di unirsi.
// Qui c'è solo il trasporto: messaggi di testo, la logica della partita sta tutta nella pagina.
@CapacitorPlugin(
    name = "Nearby",
    permissions = {
        // Android 13 e successivi
        @Permission(alias = "near33", strings = {
            Manifest.permission.BLUETOOTH_SCAN, Manifest.permission.BLUETOOTH_ADVERTISE,
            Manifest.permission.BLUETOOTH_CONNECT, "android.permission.NEARBY_WIFI_DEVICES" }),
        // Android 12
        @Permission(alias = "near31", strings = {
            Manifest.permission.BLUETOOTH_SCAN, Manifest.permission.BLUETOOTH_ADVERTISE,
            Manifest.permission.BLUETOOTH_CONNECT, Manifest.permission.ACCESS_FINE_LOCATION }),
        // Android 11 e precedenti
        @Permission(alias = "nearOld", strings = { Manifest.permission.ACCESS_FINE_LOCATION })
    }
)
public class NearbyPlugin extends Plugin {
    private static final String SERVICE = "it.educk.magicplayprint.v2";
    private static final Strategy STRATEGY = Strategy.P2P_STAR;
    private ConnectionsClient cc;

    @Override
    public void load() { cc = Nearby.getConnectionsClient(getContext()); }

    private String alias() { return Build.VERSION.SDK_INT >= 33 ? "near33" : Build.VERSION.SDK_INT >= 31 ? "near31" : "nearOld"; }

    private boolean needPerm(PluginCall c) {
        if (getPermissionState(alias()) != PermissionState.GRANTED) {
            requestPermissionForAlias(alias(), c, "permCb");
            return true;
        }
        return false;
    }

    @PermissionCallback
    private void permCb(PluginCall c) {
        if (getPermissionState(alias()) != PermissionState.GRANTED) { c.reject("Permesso «Dispositivi nelle vicinanze» negato", "perm"); return; }
        if ("advertise".equals(c.getMethodName())) advertise(c); else discover(c);
    }

    private static String err(Exception e) {
        if (e instanceof ApiException) return ConnectionsStatusCodes.getStatusCodeString(((ApiException) e).getStatusCode());
        return String.valueOf(e.getMessage());
    }

    private final PayloadCallback payloads = new PayloadCallback() {
        @Override
        public void onPayloadReceived(@NonNull String ep, @NonNull Payload p) {
            if (p.getType() != Payload.Type.BYTES || p.asBytes() == null) return;
            JSObject o = new JSObject();
            o.put("ep", ep);
            o.put("data", new String(p.asBytes(), StandardCharsets.UTF_8));
            notifyListeners("data", o);
        }
        @Override
        public void onPayloadTransferUpdate(@NonNull String ep, @NonNull PayloadTransferUpdate u) {}
    };

    private final ConnectionLifecycleCallback life = new ConnectionLifecycleCallback() {
        @Override
        public void onConnectionInitiated(@NonNull String ep, @NonNull ConnectionInfo info) {
            JSObject o = new JSObject();
            o.put("ep", ep);
            o.put("name", info.getEndpointName());
            o.put("digits", info.getAuthenticationDigits());
            o.put("incoming", info.isIncomingConnection());
            notifyListeners("initiated", o);
        }
        @Override
        public void onConnectionResult(@NonNull String ep, @NonNull ConnectionResolution r) {
            JSObject o = new JSObject();
            o.put("ep", ep);
            o.put("ok", r.getStatus().isSuccess());
            o.put("code", r.getStatus().getStatusCode());
            notifyListeners("result", o);
        }
        @Override
        public void onDisconnected(@NonNull String ep) {
            JSObject o = new JSObject();
            o.put("ep", ep);
            notifyListeners("disconnected", o);
        }
    };

    private final EndpointDiscoveryCallback found = new EndpointDiscoveryCallback() {
        @Override
        public void onEndpointFound(@NonNull String ep, @NonNull DiscoveredEndpointInfo info) {
            if (!SERVICE.equals(info.getServiceId())) return;
            JSObject o = new JSObject();
            o.put("ep", ep);
            o.put("name", info.getEndpointName());
            notifyListeners("found", o);
        }
        @Override
        public void onEndpointLost(@NonNull String ep) {
            JSObject o = new JSObject();
            o.put("ep", ep);
            notifyListeners("lost", o);
        }
    };

    // telefono principale: si fa trovare con il suo nome (contiene il codice della partita)
    @PluginMethod
    public void advertise(PluginCall c) {
        if (needPerm(c)) return;
        String name = c.getString("name", "");
        AdvertisingOptions opt = new AdvertisingOptions.Builder().setStrategy(STRATEGY).build();
        cc.startAdvertising(name, SERVICE, life, opt)
            .addOnSuccessListener(v -> c.resolve())
            .addOnFailureListener(e -> {
                // già visibile: va bene così
                if (e instanceof ApiException && ((ApiException) e).getStatusCode() == ConnectionsStatusCodes.STATUS_ALREADY_ADVERTISING) c.resolve();
                else c.reject(err(e));
            });
    }

    @PluginMethod
    public void stopAdvertise(PluginCall c) { cc.stopAdvertising(); c.resolve(); }

    // gli altri telefoni: cercano le partite vicine
    @PluginMethod
    public void discover(PluginCall c) {
        if (needPerm(c)) return;
        DiscoveryOptions opt = new DiscoveryOptions.Builder().setStrategy(STRATEGY).build();
        cc.startDiscovery(SERVICE, found, opt)
            .addOnSuccessListener(v -> c.resolve())
            .addOnFailureListener(e -> {
                if (e instanceof ApiException && ((ApiException) e).getStatusCode() == ConnectionsStatusCodes.STATUS_ALREADY_DISCOVERING) c.resolve();
                else c.reject(err(e));
            });
    }

    @PluginMethod
    public void stopDiscover(PluginCall c) { cc.stopDiscovery(); c.resolve(); }

    @PluginMethod
    public void connect(PluginCall c) {
        String ep = c.getString("ep"), name = c.getString("name", "");
        if (ep == null) { c.reject("Manca il telefono"); return; }
        cc.requestConnection(name, ep, life)
            .addOnSuccessListener(v -> c.resolve())
            .addOnFailureListener(e -> {
                if (e instanceof ApiException && ((ApiException) e).getStatusCode() == ConnectionsStatusCodes.STATUS_ALREADY_CONNECTED_TO_ENDPOINT) c.resolve();
                else c.reject(err(e));
            });
    }

    @PluginMethod
    public void accept(PluginCall c) {
        String ep = c.getString("ep");
        if (ep == null) { c.reject("Manca il telefono"); return; }
        cc.acceptConnection(ep, payloads).addOnSuccessListener(v -> c.resolve()).addOnFailureListener(e -> c.reject(err(e)));
    }

    @PluginMethod
    public void reject(PluginCall c) {
        String ep = c.getString("ep");
        if (ep == null) { c.reject("Manca il telefono"); return; }
        cc.rejectConnection(ep).addOnSuccessListener(v -> c.resolve()).addOnFailureListener(e -> c.reject(err(e)));
    }

    // messaggio di testo a uno o più telefoni (la pagina lo spezza se è più lungo di 32 kB)
    @PluginMethod
    public void send(PluginCall c) {
        JSArray arr = c.getArray("eps");
        String data = c.getString("data", "");
        List<String> eps = new ArrayList<>();
        try { for (int i = 0; arr != null && i < arr.length(); i++) eps.add(arr.getString(i)); }
        catch (Exception e) { c.reject("Telefoni non validi"); return; }
        if (eps.isEmpty()) { c.resolve(); return; }
        cc.sendPayload(eps, Payload.fromBytes(data.getBytes(StandardCharsets.UTF_8)))
            .addOnSuccessListener(v -> c.resolve())
            .addOnFailureListener(e -> c.reject(err(e)));
    }

    @PluginMethod
    public void disconnect(PluginCall c) {
        String ep = c.getString("ep");
        if (ep != null) cc.disconnectFromEndpoint(ep);
        c.resolve();
    }

    // chiude tutto: visibilità, ricerca e collegamenti
    @PluginMethod
    public void stopAll(PluginCall c) { cc.stopAllEndpoints(); c.resolve(); }

    @Override
    protected void handleOnDestroy() { if (cc != null) cc.stopAllEndpoints(); }
}
