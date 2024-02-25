import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Platform } from 'react-native';

import App from './App';

async function initialize() {
  let flutterWebApp = null;

  if (Platform.OS === 'web') {
    const engineInitializer = await new Promise((resolve) => {
      console.log('setup Flutter engine initializer...')
      _flutter.loader.loadEntrypoint({
        entrypointUrl: (process.env.PUBLIC_URL ?? '') + '/flutter/main.dart.js',
        onEntrypointLoaded: resolve,
      })
    })
    const appRunner = await engineInitializer?.initializeEngine({
      assetBase: (process.env.PUBLIC_URL ?? '') + '/flutter/',
      multiViewEnabled: true,
    })

    flutterWebApp = await appRunner.runApp()
  }

  registerRootComponent(() => <App flutterWebApp={flutterWebApp} />);

}

initialize()
