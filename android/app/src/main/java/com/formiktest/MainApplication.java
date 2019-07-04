package com.formiktest;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.segment.analytics.reactnative.core.RNAnalyticsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.hoxfon.react.RNTwilioVoice.TwilioVoicePackage;
import com.beefe.picker.PickerViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.twiliorn.library.TwilioPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNAnalyticsPackage(),
            new RNGestureHandlerPackage(),
            new TwilioVoicePackage(),
            new PickerViewPackage(),
            new TwilioPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
