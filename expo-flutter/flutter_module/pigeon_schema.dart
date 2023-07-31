import 'package:pigeon/pigeon.dart';

@ConfigurePigeon(
  PigeonOptions(
    dartOut: 'lib/src/communication/native_api.g.dart',
    kotlinOut:
        '../modules/expo-flutter-view/android/src/main/java/expo/modules/flutterview/Messages.g.kt',
    kotlinOptions: KotlinOptions(package: 'expo.modules.flutterview'),
    swiftOut: '../modules/expo-flutter-view/ios/Messages.g.swift',
    swiftOptions: SwiftOptions(),
    dartPackageName: 'flutter_module',
  ),
)

@FlutterApi()
abstract class FlutterCounterApi {
  void setText(String text);

  void setScreen(String screen);

  void setClicks(int value);

  void setTheme(String theme);
}

@HostApi()
abstract class HostCounterApi {
  void setText(String text);

  void setScreen(String screen);

  void setClicks(int value);
}
