rm -rf modules/expo-flutter-view/ios/Flutter
cd flutter_module
flutter build ios-framework --no-plugins --cocoapods --output=../modules/expo-flutter-view/ios/Flutter
cd -
cd modules/expo-flutter-view/ios/Flutter
cp Release/Flutter.podspec Flutter.podspec
zip -rm Debug.zip Debug
zip -rm Release.zip Release
zip -rm Profile.zip Profile
cd -
node ./scripts/prepare_ios_plugins.js
