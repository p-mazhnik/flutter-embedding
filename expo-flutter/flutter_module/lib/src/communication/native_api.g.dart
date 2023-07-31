// Autogenerated from Pigeon (v10.1.4), do not edit directly.
// See also: https://pub.dev/packages/pigeon
// ignore_for_file: public_member_api_docs, non_constant_identifier_names, avoid_as, unused_import, unnecessary_parenthesis, prefer_null_aware_operators, omit_local_variable_types, unused_shown_name, unnecessary_import

import 'dart:async';
import 'dart:typed_data' show Float64List, Int32List, Int64List, Uint8List;

import 'package:flutter/foundation.dart' show ReadBuffer, WriteBuffer;
import 'package:flutter/services.dart';

abstract class FlutterCounterApi {
  static const MessageCodec<Object?> codec = StandardMessageCodec();

  void setText(String text);

  void setScreen(String screen);

  void setClicks(int value);

  void setTheme(String theme);

  static void setup(FlutterCounterApi? api, {BinaryMessenger? binaryMessenger}) {
    {
      final BasicMessageChannel<Object?> channel = BasicMessageChannel<Object?>(
          'dev.flutter.pigeon.flutter_module.FlutterCounterApi.setText', codec,
          binaryMessenger: binaryMessenger);
      if (api == null) {
        channel.setMessageHandler(null);
      } else {
        channel.setMessageHandler((Object? message) async {
          assert(message != null,
          'Argument for dev.flutter.pigeon.flutter_module.FlutterCounterApi.setText was null.');
          final List<Object?> args = (message as List<Object?>?)!;
          final String? arg_text = (args[0] as String?);
          assert(arg_text != null,
              'Argument for dev.flutter.pigeon.flutter_module.FlutterCounterApi.setText was null, expected non-null String.');
          api.setText(arg_text!);
          return;
        });
      }
    }
    {
      final BasicMessageChannel<Object?> channel = BasicMessageChannel<Object?>(
          'dev.flutter.pigeon.flutter_module.FlutterCounterApi.setScreen', codec,
          binaryMessenger: binaryMessenger);
      if (api == null) {
        channel.setMessageHandler(null);
      } else {
        channel.setMessageHandler((Object? message) async {
          assert(message != null,
          'Argument for dev.flutter.pigeon.flutter_module.FlutterCounterApi.setScreen was null.');
          final List<Object?> args = (message as List<Object?>?)!;
          final String? arg_screen = (args[0] as String?);
          assert(arg_screen != null,
              'Argument for dev.flutter.pigeon.flutter_module.FlutterCounterApi.setScreen was null, expected non-null String.');
          api.setScreen(arg_screen!);
          return;
        });
      }
    }
    {
      final BasicMessageChannel<Object?> channel = BasicMessageChannel<Object?>(
          'dev.flutter.pigeon.flutter_module.FlutterCounterApi.setClicks', codec,
          binaryMessenger: binaryMessenger);
      if (api == null) {
        channel.setMessageHandler(null);
      } else {
        channel.setMessageHandler((Object? message) async {
          assert(message != null,
          'Argument for dev.flutter.pigeon.flutter_module.FlutterCounterApi.setClicks was null.');
          final List<Object?> args = (message as List<Object?>?)!;
          final int? arg_value = (args[0] as int?);
          assert(arg_value != null,
              'Argument for dev.flutter.pigeon.flutter_module.FlutterCounterApi.setClicks was null, expected non-null int.');
          api.setClicks(arg_value!);
          return;
        });
      }
    }
    {
      final BasicMessageChannel<Object?> channel = BasicMessageChannel<Object?>(
          'dev.flutter.pigeon.flutter_module.FlutterCounterApi.setTheme', codec,
          binaryMessenger: binaryMessenger);
      if (api == null) {
        channel.setMessageHandler(null);
      } else {
        channel.setMessageHandler((Object? message) async {
          assert(message != null,
          'Argument for dev.flutter.pigeon.flutter_module.FlutterCounterApi.setTheme was null.');
          final List<Object?> args = (message as List<Object?>?)!;
          final String? arg_theme = (args[0] as String?);
          assert(arg_theme != null,
              'Argument for dev.flutter.pigeon.flutter_module.FlutterCounterApi.setTheme was null, expected non-null String.');
          api.setTheme(arg_theme!);
          return;
        });
      }
    }
  }
}

class HostCounterApi {
  /// Constructor for [HostCounterApi].  The [binaryMessenger] named argument is
  /// available for dependency injection.  If it is left null, the default
  /// BinaryMessenger will be used which routes to the host platform.
  HostCounterApi({BinaryMessenger? binaryMessenger})
      : _binaryMessenger = binaryMessenger;
  final BinaryMessenger? _binaryMessenger;

  static const MessageCodec<Object?> codec = StandardMessageCodec();

  Future<void> setText(String arg_text) async {
    final BasicMessageChannel<Object?> channel = BasicMessageChannel<Object?>(
        'dev.flutter.pigeon.flutter_module.HostCounterApi.setText', codec,
        binaryMessenger: _binaryMessenger);
    final List<Object?>? replyList =
        await channel.send(<Object?>[arg_text]) as List<Object?>?;
    if (replyList == null) {
      throw PlatformException(
        code: 'channel-error',
        message: 'Unable to establish connection on channel.',
      );
    } else if (replyList.length > 1) {
      throw PlatformException(
        code: replyList[0]! as String,
        message: replyList[1] as String?,
        details: replyList[2],
      );
    } else {
      return;
    }
  }

  Future<void> setScreen(String arg_screen) async {
    final BasicMessageChannel<Object?> channel = BasicMessageChannel<Object?>(
        'dev.flutter.pigeon.flutter_module.HostCounterApi.setScreen', codec,
        binaryMessenger: _binaryMessenger);
    final List<Object?>? replyList =
        await channel.send(<Object?>[arg_screen]) as List<Object?>?;
    if (replyList == null) {
      throw PlatformException(
        code: 'channel-error',
        message: 'Unable to establish connection on channel.',
      );
    } else if (replyList.length > 1) {
      throw PlatformException(
        code: replyList[0]! as String,
        message: replyList[1] as String?,
        details: replyList[2],
      );
    } else {
      return;
    }
  }

  Future<void> setClicks(int arg_value) async {
    final BasicMessageChannel<Object?> channel = BasicMessageChannel<Object?>(
        'dev.flutter.pigeon.flutter_module.HostCounterApi.setClicks', codec,
        binaryMessenger: _binaryMessenger);
    final List<Object?>? replyList =
        await channel.send(<Object?>[arg_value]) as List<Object?>?;
    if (replyList == null) {
      throw PlatformException(
        code: 'channel-error',
        message: 'Unable to establish connection on channel.',
      );
    } else if (replyList.length > 1) {
      throw PlatformException(
        code: replyList[0]! as String,
        message: replyList[1] as String?,
        details: replyList[2],
      );
    } else {
      return;
    }
  }
}
