package expo.modules.flutterview

import expo.modules.core.interfaces.services.UIManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import io.flutter.embedding.engine.FlutterEngineGroupCache

class ExpoFlutterViewModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoFlutterView')` in JavaScript.
    Name("ExpoFlutterView")

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(ExpoFlutterView::class) {
      Prop("clicks") { view: ExpoFlutterView, clicks: Int ->
        view.flutterCounterApi?.setClicks(clicks.toLong()) {}
      }
      Prop("text") { view: ExpoFlutterView, text: String ->
        view.flutterCounterApi?.setText(text) {}
      }
      Prop("screen") { view: ExpoFlutterView, screen: String ->
        view.flutterCounterApi?.setScreen(screen) {}
      }
      Prop("theme") { view: ExpoFlutterView, theme: String ->
        view.flutterCounterApi?.setTheme(theme) {}
      }
      Events("onClicksChange", "onTextChange", "onScreenChange")

      OnViewDestroys<ExpoFlutterView> { view ->
        val uiManager = appContext.legacyModule<UIManager>()
        uiManager?.unregisterLifecycleEventListener(view)
      }
    }

    OnActivityResult { _, onActivityResultPayload ->
      val engineGroup =
        FlutterEngineGroupCache
          .getInstance()
          .get(ExpoFlutterViewPackage.ENGINE_GROUP_ID) as ExpoFlutterEngineGroup?
      if (engineGroup != null) {
        for (engine in engineGroup.activeEngines) {
          engine.activityControlSurface.onActivityResult(
            onActivityResultPayload.requestCode,
            onActivityResultPayload.resultCode,
            onActivityResultPayload.data
          )
        }
      }
    }
  }
}
