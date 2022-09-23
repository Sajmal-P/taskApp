package com.neornseed;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class HelloWorldModule extends ReactContextBaseJavaModule {
    HelloWorldModule(ReactApplicationContext context) {
        super(context);
    }
    @Override
    public String getName() {
        return "HelloWorldModule";
    }
    @ReactMethod
    public void getCustomName(Callback callback) {
        callback.invoke("Hello from Android");
    }

}

