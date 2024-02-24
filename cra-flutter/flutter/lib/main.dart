// ignore_for_file: avoid_web_libraries_in_flutter

import 'dart:js_interop';

import 'package:flutter/material.dart';
import 'package:flutter_counter/src/widgets.dart';

import 'pages/counter.dart';
import 'pages/dash.dart';
import 'pages/text.dart';

import 'src/js_interop.dart';

void main() {
  runWidget(
    MultiViewApp(
      viewBuilder: (BuildContext context) => const MyApp(),
    ),
  );
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final ValueNotifier<DemoScreen> _screen =
      ValueNotifier<DemoScreen>(DemoScreen.counter);
  final ValueNotifier<int> _counter = ValueNotifier<int>(0);
  final ValueNotifier<String> _text = ValueNotifier<String>('');

  late final DemoAppStateManager _state;

  @override
  void initState() {
    super.initState();
    _state = DemoAppStateManager(
      screen: _screen,
      counter: _counter,
      text: _text,
    );
  }

  @override
  void didChangeDependencies() {
    final export = createJSInteropWrapper(_state);
    final int viewId = View.of(context).viewId;

    // Emit this through the root object of the flutter app :)
    broadcastAppEvent(viewId, 'flutter-initialized', export);
    super.didChangeDependencies();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'React 🤝 Flutter',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
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
