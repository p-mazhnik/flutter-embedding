#!/bin/bash

rm -rf modules/expo-flutter-view/ios/Flutter
cd flutter_module
flutter build ios-framework --output=../modules/expo-flutter-view/ios/Flutter
cd -
cd modules/expo-flutter-view/ios/Flutter
zip -rm Debug.zip Debug
zip -rm Release.zip Release
zip -rm Profile.zip Profile
cd -
