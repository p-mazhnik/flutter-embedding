package expo.modules.flutterview

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import androidx.activity.ComponentActivity
import androidx.fragment.app.FragmentActivity
import expo.modules.core.interfaces.LifecycleEventListener
import expo.modules.core.interfaces.services.UIManager
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import io.flutter.embedding.android.ExclusiveAppComponent
import io.flutter.embedding.android.FlutterView
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.embedding.engine.FlutterEngineGroupCache
import io.flutter.plugin.platform.PlatformPlugin

@SuppressLint("ViewConstructor")
class ExpoFlutterView(context: Context, appContext: AppContext) :
    ExpoView(context, appContext),
    LifecycleEventListener,
    ExclusiveAppComponent<Activity>,
    HostCounterApi {
    private var engine: FlutterEngine? = null
    private var platformPlugin: PlatformPlugin? = null

    private val flutterView = FlutterView(context).also {
        it.layoutParams = LayoutParams(
            LayoutParams.MATCH_PARENT,
            LayoutParams.MATCH_PARENT
        )

        addView(it)
    }

    var flutterCounterApi: FlutterCounterApi? = null

    private val onTextChange by EventDispatcher()
    private val onScreenChange by EventDispatcher()
    private val onClicksChange by EventDispatcher()

    init {
        val uIManager = appContext.legacyModule<UIManager>()
        uIManager!!.registerLifecycleEventListener(this)
        val activity = appContext.currentActivity as FragmentActivity?
        val engineGroup =
            FlutterEngineGroupCache.getInstance().get(ExpoFlutterViewPackage.ENGINE_GROUP_ID)
        engine = engineGroup?.createAndRunDefaultEngine(context)
        if (engine != null && activity != null) {
            configureFlutterEngine(engine!!, activity)
        }
    }

    override fun onHostResume() {
        engine?.lifecycleChannel?.appIsResumed()
        platformPlugin?.updateSystemUiOverlays()
    }

    override fun onHostPause() {
        engine?.lifecycleChannel?.appIsInactive()
    }

    override fun onHostDestroy() {
        // Plugins are no longer attached to an activity.
        engine?.activityControlSurface?.detachFromActivity()
        // Release Flutter's control of UI such as system chrome.
        platformPlugin!!.destroy()
        platformPlugin = null

        // Set Flutter's application state to detached.
        engine?.lifecycleChannel?.appIsDetached()

        // Detach rendering pipeline.
        flutterView.detachFromFlutterEngine()
    }

    override fun detachFromFlutterEngine() {
        // do nothing
    }

    override fun getAppComponent(): Activity {
        return appContext.currentActivity!!
    }

    private fun configureFlutterEngine(engine: FlutterEngine, activity: ComponentActivity) {
        HostCounterApi.setUp(engine.dartExecutor, this)
        flutterCounterApi = FlutterCounterApi(engine.dartExecutor)
        platformPlugin = PlatformPlugin(activity, engine.platformChannel)
        engine.activityControlSurface.attachToActivity(this, activity.lifecycle)
        flutterView.attachToFlutterEngine(engine)
    }

    override fun setText(text: String) {
        onTextChange(mapOf("text" to text))
    }

    override fun setScreen(screen: String) {
        onScreenChange(mapOf("screen" to screen))
    }

    override fun setClicks(value: Long) {
        onClicksChange(mapOf("value" to value))
    }
}

