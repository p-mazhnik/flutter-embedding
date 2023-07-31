package expo.modules.flutterview

import android.content.Context
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.embedding.engine.FlutterEngine.EngineLifecycleListener
import io.flutter.embedding.engine.FlutterEngineGroup

class ExpoFlutterEngineGroup(context: Context) : FlutterEngineGroup(context) {
    var activeEngines = arrayListOf<FlutterEngine>()

    override fun createAndRunEngine(options: Options): FlutterEngine {
        val engine = super.createAndRunEngine(options)
        activeEngines.add(engine)
        engine.addEngineLifecycleListener(
            object : EngineLifecycleListener {
                override fun onPreEngineRestart() {}

                override fun onEngineWillDestroy() {
                    activeEngines.remove(engine)
                }
            })
        return engine
    }
}
