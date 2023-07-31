package expo.modules.flutterview

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import expo.modules.core.interfaces.ReactActivityLifecycleListener
import expo.modules.flutterview.ExpoFlutterViewPackage.Companion.ENGINE_GROUP_ID
import io.flutter.embedding.engine.FlutterEngineGroupCache

class ActivityLifecycleListener : ReactActivityLifecycleListener {
    private lateinit var flutterEngineGroup: ExpoFlutterEngineGroup

    override fun onCreate(activity: Activity, savedInstanceState: Bundle?) {
        flutterEngineGroup = ExpoFlutterEngineGroup(activity)
        // Cache the FlutterEngineGroup to be used by FlutterView.
        FlutterEngineGroupCache
            .getInstance()
            .put(ENGINE_GROUP_ID, flutterEngineGroup)
    }

    override fun onNewIntent(intent: Intent?): Boolean {
        for (engine in flutterEngineGroup.activeEngines) {
            if (intent != null) {
                engine.activityControlSurface.onNewIntent(intent)
            }
        }
        return super.onNewIntent(intent)
    }
}
