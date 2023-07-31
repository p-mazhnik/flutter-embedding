import ExpoModulesCore
import Flutter

public class ExpoFlutterViewModule: Module {
  static var flutterEngineGroup = FlutterEngineGroup(name: "flutter_engine_group", project: nil)
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoFlutterView')` in JavaScript.
    Name("ExpoFlutterView")

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(ExpoFlutterView.self) {
      Prop("clicks") { (view: ExpoFlutterView, value: Int64) in
        view.flutterCounterApi.setClicks(value: value) {}
      }
      Prop("text") { (view: ExpoFlutterView, text: String) in
        view.flutterCounterApi.setText(text: text) {}
      }
      Prop("screen") { (view: ExpoFlutterView, screen: String) in
        view.flutterCounterApi.setScreen(screen: screen) {}
      }
      Prop("theme") { (view: ExpoFlutterView, theme: String) in
        view.flutterCounterApi.setTheme(theme: theme) {}
      }
      Events("onClicksChange", "onTextChange", "onScreenChange")
    }
  }
}
