'use client'

import styles from "./page.module.css";
import { FlutterView } from '@/FlutterView/FlutterView'
import { useEffect, useState } from 'react'

// The global _flutter namespace
declare var _flutter: any

export default function Home() {
  const [flutterApp, setFlutterApp] = useState<any>(null)
  const [screen, setScreen] = useState('counter')
  const [clicks, setClicks] = useState(2)
  const [text, setText] = useState('')


  useEffect(() => {
    async function init() {
      const engineInitializer = await new Promise<any>((resolve) => {
        console.log('setup Flutter engine initializer...')
        _flutter.loader.loadEntrypoint({
          entrypointUrl: '/flutter/main.dart.js',
          onEntrypointLoaded: resolve,
        })
      })
      const appRunner = await engineInitializer?.initializeEngine({
        assetBase: '/flutter/',
        multiViewEnabled: true,
      })

      const flutterApp = await appRunner.runApp()
      setFlutterApp(flutterApp)
    }
    init();
  }, [])
  if (!flutterApp) {
    return <div />
  }
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <FlutterView
          key='1'
          flutterApp={flutterApp}
          screen={screen}
          text={text}
          clicks={clicks}
          removeView={() => {}}
          onScreenChange={setScreen}
          onClicksChange={setClicks}
          onTextChange={setText}
        />
        <FlutterView
          key='2'
          flutterApp={flutterApp}
          screen={screen}
          text={text}
          clicks={clicks}
          removeView={() => {}}
          onScreenChange={setScreen}
          onClicksChange={setClicks}
          onTextChange={setText}
        />
      </div>
    </div>
  );
}
