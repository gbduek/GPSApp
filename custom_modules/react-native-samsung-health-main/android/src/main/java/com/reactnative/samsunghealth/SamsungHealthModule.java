package com.reactnative.samsunghealth;

import android.database.Cursor;
import android.util.Log;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.LifecycleEventListener;

import com.samsung.android.sdk.healthdata.HealthConnectionErrorResult;
import com.samsung.android.sdk.healthdata.HealthConstants;
import com.samsung.android.sdk.healthdata.HealthDataObserver;
import com.samsung.android.sdk.healthdata.HealthDataResolver;
import com.samsung.android.sdk.healthdata.HealthDataResolver.Filter;
import com.samsung.android.sdk.healthdata.HealthDataResolver.ReadRequest;
import com.samsung.android.sdk.healthdata.HealthDataResolver.ReadResult;
import com.samsung.android.sdk.healthdata.HealthDataService;
import com.samsung.android.sdk.healthdata.HealthDataStore;
import com.samsung.android.sdk.healthdata.HealthDevice;
import com.samsung.android.sdk.healthdata.HealthDeviceManager;
import com.samsung.android.sdk.healthdata.HealthPermissionManager;
import com.samsung.android.sdk.healthdata.HealthPermissionManager.PermissionKey;
import com.samsung.android.sdk.healthdata.HealthPermissionManager.PermissionResult;
import com.samsung.android.sdk.healthdata.HealthPermissionManager.PermissionType;
import com.samsung.android.sdk.healthdata.HealthResultHolder;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by firodj on 5/2/17.
 */

@ReactModule(name = "RNSamsungHealth")
public class SamsungHealthModule extends ReactContextBaseJavaModule implements
        LifecycleEventListener {

    private static final String REACT_MODULE = "RNSamsungHealth";
    public static final String STEP_DAILY_TREND_TYPE = "com.samsung.shealth.step_daily_trend";
    public static final String DAY_TIME = "day_time";

    private HealthDataStore mStore;

    public SamsungHealthModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return REACT_MODULE;
    }

    @Override
    public void initialize() {
        super.initialize();

        getReactApplicationContext().addLifecycleEventListener(this);
        initSamsungHealth();
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("STEP_COUNT", HealthConstants.StepCount.HEALTH_DATA_TYPE);
        constants.put("WEIGHT", HealthConstants.Weight.HEALTH_DATA_TYPE);
        constants.put("STEP_DAILY_TREND", SamsungHealthModule.STEP_DAILY_TREND_TYPE);
        return constants;
    }

    @Override
    public void onHostResume() {
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
        disconnect();
    }

    private void sendEvent(String eventName,
                           @Nullable WritableMap params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public void initSamsungHealth() {
        Log.d(REACT_MODULE, "initialize Samsung Health...");
        HealthDataService healthDataService = new HealthDataService();
        try {
            healthDataService.initialize(getReactApplicationContext());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public HealthDataStore getStore() {
        return mStore;
    }

    public ReactContext getContext() {
        return getReactApplicationContext();
    }

    @ReactMethod
    public void connect(ReadableArray permissions, Callback error, Callback success) {
        if (mStore != null && mStore.isConnected()) {
            success.invoke("Already connected to Samsung Health");
            return;
        }

        ConnectionListener listener = new ConnectionListener(this, error, success);
        for (int i = 0; i < permissions.size(); i++) {
            String permission = permissions.getString(i);
            if (permission != null) {
                listener.addReadPermission(permission);
            }
        }

        mStore = new HealthDataStore(getReactApplicationContext(), listener);
        mStore.connectService();
    }

    @ReactMethod
    public void disconnect() {
        if (mStore != null) {
            Log.d(REACT_MODULE, "disconnectService");
            mStore.disconnectService();
            mStore = null;
        }
    }

    @ReactMethod
    public void isConnected(Callback callback) {
        if (mStore != null && mStore.isConnected()) {
            callback.invoke(true);
        } else {
            callback.invoke(false);
        }
    }

    private long getStartTimeOfToday() {
        Calendar today = Calendar.getInstance();
        today.set(Calendar.HOUR_OF_DAY, 0);
        today.set(Calendar.MINUTE, 0);
        today.set(Calendar.SECOND, 0);
        today.set(Calendar.MILLISECOND, 0);
        return today.getTimeInMillis();
    }

    @ReactMethod
    public void readStepCount(double startDate, double endDate, Callback error, Callback success) {
        if (mStore == null || !mStore.isConnected()) {
            error.invoke("Not connected to Samsung Health. Call connect() first.");
            return;
        }

        HealthDataResolver resolver = new HealthDataResolver(mStore, null);
        Filter filter = Filter.and(
            Filter.greaterThanEquals(HealthConstants.StepCount.START_TIME, (long)startDate),
            Filter.lessThanEquals(HealthConstants.StepCount.START_TIME, (long)endDate)
        );
       
        HealthDataResolver.ReadRequest request = new ReadRequest.Builder()
            .setDataType(HealthConstants.StepCount.HEALTH_DATA_TYPE)
            .setProperties(new String[]{
                HealthConstants.StepCount.COUNT,
                HealthConstants.StepCount.START_TIME,
                HealthConstants.StepCount.TIME_OFFSET,
                HealthConstants.StepCount.DEVICE_UUID
            })
            .setFilter(filter)
            .build();

        try {
            resolver.read(request).setResultListener(new StepCountResultListener(this, error, success));
        } catch (Exception e) {
            Log.e(REACT_MODULE, "Getting step count fails: " + e.getMessage());
            error.invoke("Getting step count fails: " + e.getMessage());
        }
    }
    
    @ReactMethod
    public void readExercises(double startDate, double endDate, Callback error, Callback success) {
        if (mStore == null || !mStore.isConnected()) {
            error.invoke("Not connected to Samsung Health. Call connect() first.");
            return;
        }

        HealthDataResolver resolver = new HealthDataResolver(mStore, null);
        Filter filter = Filter.and(
            Filter.greaterThanEquals(HealthConstants.Exercise.START_TIME, (long)startDate),
            Filter.lessThanEquals(HealthConstants.Exercise.START_TIME, (long)endDate)
        );
       
        HealthDataResolver.ReadRequest request = new ReadRequest.Builder()
            .setDataType(HealthConstants.Exercise.HEALTH_DATA_TYPE)
            .setProperties(new String[]{
                HealthConstants.Exercise.DURATION,
                HealthConstants.Exercise.EXERCISE_TYPE,
                HealthConstants.Exercise.EXERCISE_CUSTOM_TYPE,
                HealthConstants.Exercise.START_TIME,
                HealthConstants.Exercise.TIME_OFFSET,
                HealthConstants.Exercise.DEVICE_UUID
            })
            .setFilter(filter)
            .build();

        try {
            resolver.read(request).setResultListener(new StepCountResultListener(this, error, success));
        } catch (Exception e) {
            Log.e(REACT_MODULE, "Getting exercises fails: " + e.getMessage());
            error.invoke("Getting exercises fails: " + e.getMessage());
        }
    }

    @ReactMethod
    public void readWeight(double startDate, double endDate, Callback error, Callback success) {
        if (mStore == null || !mStore.isConnected()) {
            error.invoke("Not connected to Samsung Health. Call connect() first.");
            return;
        }

        HealthDataResolver resolver = new HealthDataResolver(mStore, null);
        Filter filter = Filter.and(
            Filter.greaterThanEquals(HealthConstants.Weight.START_TIME, (long)startDate),
            Filter.lessThanEquals(HealthConstants.Weight.START_TIME, (long)endDate)
        );
        HealthDataResolver.ReadRequest request = new ReadRequest.Builder()
                .setDataType(HealthConstants.Weight.HEALTH_DATA_TYPE)
                .setProperties(new String[]{
                    HealthConstants.Weight.WEIGHT,
                    HealthConstants.Weight.START_TIME,
                    HealthConstants.Weight.TIME_OFFSET,
                    HealthConstants.Weight.DEVICE_UUID
                })
                .setFilter(filter)
                .build();

        try {
            resolver.read(request).setResultListener(new StepCountResultListener(this, error, success));
        } catch (Exception e) {
            Log.e(REACT_MODULE, "Getting weight fails: " + e.getMessage());
            error.invoke("Getting weight fails: " + e.getMessage());
        }
    }
}