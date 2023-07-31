// based on https://github.com/p-mazhnik/flutter-embedding/blob/87b188c61ffe642c0551ffd4e2a25a4988573b99/cra-flutter/src/App/FlutterView/FlutterView.tsx

import React, { useEffect, useRef, useState, memo } from 'react'
import type { FlutterViewProps } from './ExpoFlutterView.types'
import { defaultWebConfig } from './ExpoFlutterView.types'
import { ActivityIndicator, useTheme, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { A } from '@expo/html-elements'

// The global _flutter namespace
declare var _flutter: any

const styles = StyleSheet.create({
  flutterRoot: {
    height: '100%',
    width: '100%',
  },
  innerWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    width: '100%',
  },
})

const ExpoFlutterView: React.FC<FlutterViewProps> = memo(({
  webConfig: {
    assetBase = defaultWebConfig.assetBase!,
    src = defaultWebConfig.src!,
  } = defaultWebConfig,
  onClicksChange,
  onScreenChange,
  onTextChange,
  text,
  screen,
  clicks,
  theme,
}) => {
  const appTheme = useTheme()
  const flutterState = useRef<any>(null)
  const ref = useRef<HTMLDivElement | null>(null)
  const [isMultiView, setIsMultiView] = useState(false)

  const onFlutterAppLoaded = (state: any) => {
    flutterState.current = state
    // listen to state changes
    state.onClicksChanged(onClicksChange)
    state.onTextChanged(onTextChange)
    state.onScreenChanged(onScreenChange)
    // set initial values
    state.setText(text)
    state.setScreen(screen)
    state.setClicks(clicks)
    state.setTheme(theme)
  }

  useEffect(() => {
    if (document.querySelectorAll('.flutter').length > 1) {
      // we can't render multiple Flutter instances in web: https://github.com/flutter/flutter/issues/118481
      setIsMultiView(true)
      return
    }
    const target = ref.current
    let isRendered = true
    const initFlutterApp = async () => {
      if (!isRendered) return
      const engineInitializer = await new Promise<any>((resolve) => {
        console.log('setup Flutter engine initializer...')
        _flutter.loader.loadEntrypoint({
          entrypointUrl: src,
          onEntrypointLoaded: resolve,
        })
      })
      if (!isRendered) return

      console.log('initialize Flutter engine...')
      const appRunner = await engineInitializer?.initializeEngine({
        hostElement: target,
        assetBase: assetBase,
      })
      if (!isRendered) return

      console.log('run Flutter engine...')
      await appRunner?.runApp()
    }
    initFlutterApp()

    const eventListener = (event: Event) => {
      let state = (event as CustomEvent).detail
      onFlutterAppLoaded(state)
    }

    target?.addEventListener('flutter-initialized', eventListener, {
      once: true,
    })

    return () => {
      isRendered = false
      target?.removeEventListener('flutter-initialized', eventListener)
    }
  }, [])

  useEffect(() => {
    flutterState.current?.setText(text)
  }, [text])
  useEffect(() => {
    flutterState.current?.setScreen(screen)
  }, [screen])
  useEffect(() => {
    flutterState.current?.setTheme(theme)
  }, [theme])
  useEffect(() => {
    flutterState.current?.setClicks(clicks)
  }, [clicks])

  return (
    <div
      ref={ref}
      className="flutter"
      style={styles.flutterRoot}
    >
      <View style={styles.innerWrapper}>
        {isMultiView &&
          <>
            <Text>
              Multiple Flutter Instances are not supported:
            </Text>
            <A
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/flutter/flutter/issues/118481"
              style={{ color: appTheme.colors.onSurface }}
            >
              flutter/issues/118481
            </A>
          </>
        }
        {!isMultiView && <ActivityIndicator animating={true} size="large" />}
      </View>
    </div>
  )
})

export default ExpoFlutterView
