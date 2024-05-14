// based on https://github.com/p-mazhnik/flutter-embedding/blob/87b188c61ffe642c0551ffd4e2a25a4988573b99/cra-flutter/src/App/FlutterView/FlutterView.tsx

import React, { useEffect, useRef, memo } from 'react'
import type { FlutterViewProps } from './ExpoFlutterView.types'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

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
    flutterApp
  },
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
    const target = ref.current
    const viewId: number = flutterApp.addView({ hostElement: target })

    const eventListener = (event: Event) => {
      let state = (event as CustomEvent).detail
      onFlutterAppLoaded(state)
    }

    target?.addEventListener('flutter-initialized', eventListener, {
      once: true,
    })

    return () => {
      target?.removeEventListener('flutter-initialized', eventListener)
      console.log(`[React] remove view: ${viewId}`)
      flutterApp.removeView(viewId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <ActivityIndicator animating={true} size="large" />
      </View>
    </div>
  )
})

export default ExpoFlutterView
