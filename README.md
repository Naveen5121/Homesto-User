# JooYoo - React Native Hotel Booking App

This is a React Native application for hotel bookings, built with React Native 0.74.5 (stable version).

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** or **yarn**
- **React Native CLI**: `npm install -g react-native-cli`
- **Android Studio** (for Android development)
  - Android SDK
  - Android SDK Platform 34
  - Android Virtual Device (AVD)
- **Xcode** (for iOS development, macOS only)
  - CocoaPods: `sudo gem install cocoapods`

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd homestouser
```

### 2. Install Dependencies

```bash
# Install Node dependencies
npm install

# For iOS, install CocoaPods dependencies
cd ios && pod install && cd ..
```

### 3. Start Metro Bundler

Start the Metro bundler in a separate terminal:

```bash
npm start
```

Or with yarn:

```bash
yarn start
```

### 4. Run the Application

#### For Android

Make sure you have an Android emulator running or a device connected via USB with USB debugging enabled.

```bash
npm run android
```

#### For iOS (macOS only)

Make sure you have Xcode installed and an iOS simulator available.

```bash
npm run ios
```

## Project Structure

```
homestouser/
├── android/          # Android native code
├── ios/              # iOS native code
├── src/
│   ├── action/       # API services
│   ├── components/   # Reusable components
│   ├── constants/    # App constants
│   ├── navigations/  # Navigation setup
│   └── screens/      # Screen components
├── App.tsx           # Main app component
└── package.json      # Dependencies
```

## Key Dependencies

- **React Native**: 0.76.5
- **React Navigation**: Navigation library
- **React Native Reanimated**: Animation library
- **React Native Paper**: Material Design components
- **@rneui/themed**: UI component library
- **React Native Vector Icons**: Icon library

## Building for Production

### Android

1. Generate a signing key (if you haven't already)
2. Update `android/app/build.gradle` with your signing configuration
3. Build the APK:

```bash
cd android
./gradlew assembleRelease
```

The APK will be located at `android/app/build/outputs/apk/release/app-release.apk`

### iOS

1. Open `ios/JooYoo.xcworkspace` in Xcode
2. Select your target device/simulator
3. Product > Archive
4. Follow the prompts to distribute your app

## Troubleshooting

### Common Issues

1. **Metro bundler cache issues**:
   ```bash
   npm start -- --reset-cache
   ```

2. **Android build failures**:
   - Clean the build: `cd android && ./gradlew clean`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

3. **iOS build failures**:
   - Clean build folder in Xcode: Product > Clean Build Folder
   - Reinstall pods: `cd ios && pod deintegrate && pod install`

4. **Package linking issues**:
   - For Android: `cd android && ./gradlew clean`
   - For iOS: `cd ios && pod install`

## Environment Setup

Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) before running the project.

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## License

This project is private and proprietary.
