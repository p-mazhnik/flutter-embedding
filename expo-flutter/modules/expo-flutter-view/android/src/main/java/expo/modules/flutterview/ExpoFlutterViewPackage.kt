package expo.modules.flutterview

import android.content.Context
import expo.modules.core.interfaces.Package
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class ExpoFlutterViewPackage: Package {
    override fun createReactActivityLifecycleListeners(activityContext: Context): List<ReactActivityLifecycleListener> {
        return listOf(ActivityLifecycleListener())
    }

    companion object {
        const val ENGINE_GROUP_ID = "my_engine_id"
    }
}
