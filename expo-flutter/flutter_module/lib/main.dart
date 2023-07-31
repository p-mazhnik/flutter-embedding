// ignore_for_file: avoid_web_libraries_in_flutter

import 'package:flutter/material.dart';

import 'pages/counter.dart';
import 'pages/dash.dart';
import 'pages/text.dart';

import 'src/counter_state_manager.dart';

import 'src/communication/native.dart'
  if (dart.library.html) 'src/communication/web.dart'
  as multi_platform;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final ValueNotifier<DemoScreen> _screen = ValueNotifier<DemoScreen>(
    DemoScreen.counter,
  );
  final ValueNotifier<int> _counter = ValueNotifier<int>(0);
  final ValueNotifier<String> _text = ValueNotifier<String>('');

  final ValueNotifier<ThemeMode> _theme = ValueNotifier<ThemeMode>(
    ThemeMode.light,
  );
  late ThemeMode _themeMode;

  late final DemoAppStateManager _state;

  @override
  void initState() {
    super.initState();
    _state = multi_platform.getStateManager(
      screen: _screen,
      counter: _counter,
      text: _text,
      theme: _theme,
    );
    _themeMode = _theme.value;
    multi_platform.setupFlutterApi(_state);
    _theme.addListener(() {
      setState(() {
        _themeMode = _theme.value;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Element embedding',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blue,
          brightness: Brightness.light,
        ),
        useMaterial3: true,
      ),
      darkTheme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      themeMode: _themeMode,
      home: ValueListenableBuilder<DemoScreen>(
        valueListenable: _screen,
        builder: (context, value, child) => demoScreenRouter(value),
      ),
    );
  }

  Widget demoScreenRouter(DemoScreen which) {
    switch (which) {
      case DemoScreen.counter:
        return CounterDemo(counter: _counter);
      case DemoScreen.text:
        return TextFieldDemo(text: _text);
      case DemoScreen.dash:
        return DashDemo(text: _text);
    }
  }
}
