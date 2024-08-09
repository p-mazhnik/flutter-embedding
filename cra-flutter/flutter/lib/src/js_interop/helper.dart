import 'dart:ui_web' as ui_web;
import 'dart:js_interop';
import 'package:web/web.dart';

/// Locates the root of the flutter view,
/// and dispatches a JS event named [name] with [data].
void broadcastAppEvent(int viewId, String name, JSObject data) {
  final HTMLElement? root = ui_web.views.getHostElement(viewId) as HTMLElement?;
  assert(root != null, 'Flutter root element cannot be found!');

  final eventDetails = CustomEventInit(detail: data);
  eventDetails.bubbles = true;
  eventDetails.composed = true;

  root!.dispatchEvent(CustomEvent(name, eventDetails));
}
