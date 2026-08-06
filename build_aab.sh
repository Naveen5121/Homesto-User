#!/bin/bash
set -e

echo "=== Step 1: Validating Keystore ==="
keytool -list -v -keystore android/app/my-upload-key.keystore -alias my-key-alias -storepass SmartTumakuru -keypass SmartTumakuru

echo ""
echo "=== Step 2: Cleaning and Building Release AAB Bundle ==="
cd android
./gradlew clean
./gradlew bundleRelease

echo ""
echo "=== Step 3: Verifying Output AAB ==="
ls -lh app/build/outputs/bundle/release/app-release.aab
