import 'package:flutter/material.dart';

import 'communication/native_api.g.dart';

enum DemoScreen {
  counter('counter'),
  text('text'),
  dash('dash');

  const DemoScreen(String screen) : _screen = screen;
  final String _screen;

  @override
  String toString() => _screen;
}

class DemoAppStateManager extends FlutterCounterApi {
  // Creates a DemoAppStateManager wrapping a ValueNotifier.
  DemoAppStateManager({
    required ValueNotifier<DemoScreen> screen,
    required ValueNotifier<int> counter,
    required ValueNotifier<String> text,
    required ValueNotifier<ThemeMode> theme,
  })  : _counter = counter,
        _text = text,
        _screen = screen,
        _theme = theme;

  final ValueNotifier<DemoScreen> _screen;
  final ValueNotifier<int> _counter;
  final ValueNotifier<String> _text;
  final ValueNotifier<ThemeMode> _theme;

  // _counter
  int getClicks() {
    return _counter.value;
  }

  @override
  void setClicks(int value) {
    _counter.value = value;
  }

  void incrementClicks() {
    _counter.value++;
  }

  void decrementClicks() {
    _counter.value--;
  }

  // _text
  @override
  void setText(String text) {
    _text.value = text;
  }

  String getText() {
    return _text.value;
  }

  // _screen
  @override
  void setScreen(String screen) {
    _screen.value = DemoScreen.values.byName(screen);
  }

  String getScreen() {
    return _screen.value.toString();
  }

  // Allows clients to subscribe to changes to the wrapped value.
  void onClicksChanged(Function(int)? f) {
    _counter.addListener(() {
      if (f != null) {
        f(getClicks());
      }
    });
  }

  void onTextChanged(Function(String)? f) {
    _text.addListener(() {
      if (f != null) {
        f(getText());
      }
    });
  }

  void onScreenChanged(Function(String)? f) {
    _screen.addListener(() {
      if (f != null) {
        f(getScreen());
      }
    });
  }

  @override
  void setTheme(String theme) {
    try {
      _theme.value = ThemeMode.values.byName(theme);
    } on ArgumentError {
      // ignore
    }
  }
}
