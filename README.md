# GPSApp
# React Native Samsung Health Bridge (Expo 54)

This project demonstrates a **custom native module** that bridges between a React Native (Expo 54) application and the **Samsung Health SDK** on Android. The custom module is located under `custom_modules` and is installed into the app using:

npm install ./custom_modules

# 📂 Project Structure

- custom_modules/ - 
  Contains the RNSamsungHealth native module.
  The key file is:
  - SamsungHealthModule.java: Implements the bridge to Samsung Health SDK APIs.
  
  Other files are:
  - ConnectionListener.java
  - PermissionListener.java
  - SamsungHealthPackage.java
  - StepCountResultListener.java

  Also, on the libs folder, we have the actual Samsung Health SDK file: sdk-v1.0.0.jar

- android/ - 
  Native Android project with Gradle configuration.
  Samsung Health Maven repository is added in build.gradle.

# ⚙️ How the Custom Module Works

The custom bridge exposes Samsung Health SDK functionality to JavaScript:

## Connection Management
- connect(permissions, error, success) — connects to Samsung Health with given permissions.
- disconnect() — closes the connection.
- isConnected(callback) — checks if the app is connected.

## Data Queries
- readStepCount(startDate, endDate, error, success) — fetch step count data.
- readExercises(startDate, endDate, error, success) — fetch exercise sessions.
- readWeight(startDate, endDate, error, success) — fetch weight entries.

## Events
- Emits events back to JavaScript using React Native’s DeviceEventManagerModule.

# 🛠️ Building with Gradle

From the android/ directory, you can build using Gradle. Example:

cd android

## Clean project
./gradlew clean

## Assemble debug build
./gradlew assembleDebug

## Or install directly to a connected device
./gradlew installDebug

You can also run through Expo’s build command:

expo run:android

# 🔍 Current Compilation Issue

When compiling, the following error occurs:

Could not find org.jetbrains.kotlin:kotlin-gradle-plugin:2.1.20.
Searched in the following repositories:
  - Google
  - Maven Central
  - Jitpack
  - Samsung Health SDK repository

Error: FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'.
> Could not resolve all dependencies for configuration ':app:debugCompileClasspath'.
   > Could not resolve project :react-native-samsung-health.
     Required by:
         project :app
      > No matching variant of project :react-native-samsung-health was found. The consumer was configured to find a library for use during compile-time, preferably optimized for Android, as well as attribute 'com.android.build.api.attributes.AgpVersionAttr' with value '8.11.0', attribute 'com.android.build.api.attributes.BuildTypeAttr' with value 'debug', attribute 'org.jetbrains.kotlin.platform.type' with value 'androidJvm' but:
          - No variants exist.

* Try:
> Creating consumable variants is explained in more detail at https://docs.gradle.org/8.14.3/userguide/declaring_dependencies.html#sec:resolvable-consumable-configs.
> Review the variant matching algorithm at https://docs.gradle.org/8.14.3/userguide/variant_attributes.html#sec:abm_algorithm.

# Explanation

In android/build.gradle, the Kotlin Gradle plugin was updated to 2.1.20.  
At the time of building, this version is not yet published to Maven Central or Google’s repositories, so Gradle cannot resolve it.  
That is why the error points to `Could not find org.jetbrains.kotlin:kotlin-gradle-plugin:2.1.20`.

# Fix

Use a published version of the Kotlin Gradle plugin. For example:

classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.25"

or, if you need to align with AGP 8.x, use the most recent compatible Kotlin version (e.g., 1.9.x).

After adjusting, run:

./gradlew clean
./gradlew assembleDebug

# Notes

- The Samsung Health SDK requires the official Samsung Health app installed on the device and proper user permissions granted.
- Ensure your device/emulator has Samsung Health available (it’s not supported on most emulators).
- This project is meant to demonstrate integration; production use may require additional permission handling and testing on real Samsung devices.
- The custom module is located under `custom_modules` and must be installed using `npm install ./custom_modules`.
