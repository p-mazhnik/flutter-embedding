import ExpoModulesCore
import Flutter
// import FlutterPluginRegistrant

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class ExpoFlutterView: ExpoView, HostCounterApi {
  private let viewController: FlutterViewController
  let flutterCounterApi: FlutterCounterApi
  private var embedded: Bool = false

  let onClicksChange = EventDispatcher()
  let onTextChange = EventDispatcher()
  let onScreenChange = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    let engine = ExpoFlutterViewModule.flutterEngineGroup.makeEngine(withEntrypoint: nil, libraryURI: nil)
    // Connects plugins with iOS platform code to this app.
    // GeneratedPluginRegistrant.register(with: flutterEngine)
    viewController = FlutterViewController(
      engine: engine,
      nibName: nil,
      bundle: nil
    )
    flutterCounterApi = FlutterCounterApi.init(binaryMessenger: engine.binaryMessenger)
    super.init(appContext: appContext)
    clipsToBounds = true
    HostCounterApiSetup.setUp(binaryMessenger: engine.binaryMessenger, api: self)
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override func layoutSubviews() {
    super.layoutSubviews()
    if !embedded {
      embed()
    } else {
      viewController.view.frame = bounds
    }
  }

  override func removeFromSuperview() {
    viewController.removeFromParent()
    embedded = false
    super.removeFromSuperview()
  }

  private func embed() {
    guard
      let parentVC = self.reactViewController() else {
      return
    }

    parentVC.addChild(viewController)
    addSubview(viewController.view)
    viewController.view.frame = bounds
    viewController.didMove(toParent: parentVC)
    embedded = true
  }

  func setText(text: String) throws {
    onTextChange([
      "text": text
    ])
  }
  
  func setScreen(screen: String) throws {
    onScreenChange([
      "screen": screen
    ])
  }
  
  func setClicks(value: Int64) throws {
    onClicksChange([
      "value": value
    ])
  }
}
