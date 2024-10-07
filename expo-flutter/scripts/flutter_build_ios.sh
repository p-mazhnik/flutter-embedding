rm -rf modules/expo-flutter-view/ios/Flutter
cd flutter_module
# Use --no-plugins here, so flutter plugins won't be built as xcframeworks and will be handled by expo's Podfile.
# This is needed to resolve conflicts between flutter and expo native ios dependencies and build configs.
# See also https://github.com/p-mazhnik/flutter-embedding/issues/16 and https://github.com/flutter/flutter/issues/130220
flutter build ios-framework --no-plugins --cocoapods --output=../modules/expo-flutter-view/ios/Flutter
cd -
cd modules/expo-flutter-view/ios/Flutter
cp Release/Flutter.podspec Flutter.podspec
zip -rm Debug.zip Debug
zip -rm Release.zip Release
zip -rm Profile.zip Profile
cd -
# Copy flutter ios plugins from flutter_module to expo-flutter-view
# They will be injected to expo's Podfile by plugin
node ./scripts/prepare_ios_plugins.js
