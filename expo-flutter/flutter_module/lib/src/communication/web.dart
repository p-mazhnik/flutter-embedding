// ignore_for_file: unnecessary_overrides

import 'package:flutter/material.dart';
import 'package:flutter_module/src/counter_state_manager.dart';
import 'dart:js_interop';

import 'js_interop.dart';

@JSExport()
class JSDemoAppStateManager extends DemoAppStateManager {
  JSDemoAppStateManager({
    required super.screen,
    required super.counter,
    required super.text,
    required super.theme,
  });

  @override
  void onScreenChanged(Function(String)? f) {
    super.onScreenChanged(f);
  }

  @override
  void onTextChanged(Function(String)? f) {
    super.onTextChanged(f);
  }

  @override
  void onClicksChanged(Function(int)? f) {
    super.onClicksChanged(f);
  }

  @override
  void setClicks(int value) {
    super.setClicks(value);
  }

  @override
  void setText(String text) {
    super.setText(text);
  }

  @override
  void setScreen(String screen) {
    super.setScreen(screen);
  }

  @override
  void setTheme(String theme) {
    super.setTheme(theme);
  }
}

void setupFlutterApi(int viewId, DemoAppStateManager state) {
  assert(state is JSDemoAppStateManager);
  final export = createJSInteropWrapper(state as JSDemoAppStateManager);
  broadcastAppEvent(viewId, 'flutter-initialized', export);
}

DemoAppStateManager getStateManager({
  required ValueNotifier<DemoScreen> screen,
  required ValueNotifier<int> counter,
  required ValueNotifier<String> text,
  required ValueNotifier<ThemeMode> theme,
}) {
  return JSDemoAppStateManager(
    screen: screen,
    counter: counter,
    text: text,
    theme: theme,
  );
}
