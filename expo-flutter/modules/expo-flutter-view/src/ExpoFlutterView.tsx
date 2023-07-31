import { NativeSyntheticEvent, ViewProps, StyleSheet } from 'react-native'
import { requireNativeViewManager } from 'expo-modules-core'
import * as React from 'react'

import type { FlutterViewProps } from './ExpoFlutterView.types'

interface FlutterNativeViewProps extends ViewProps {
  text: string;
  screen: string;
  clicks: number;
  theme: 'dark' | 'light';
  onClicksChange?: (event: NativeSyntheticEvent<{ value: number }>) => void;
  onScreenChange?: (event: NativeSyntheticEvent<{ screen: string }>) => void;
  onTextChange?: (event: NativeSyntheticEvent<{ text: string }>) => void;
}

const NativeView = requireNativeViewManager<FlutterNativeViewProps>('ExpoFlutterView')

export default function ExpoFlutterView ({
  onClicksChange,
  onTextChange,
  onScreenChange,
  ...props
}: FlutterViewProps) {
  return (
    <NativeView
      style={styles.view}
      {...props}
      onClicksChange={(event) => {
        onClicksChange?.(event.nativeEvent.value)
      }}
      onTextChange={(event) => {
        onTextChange?.(event.nativeEvent.text)
      }}
      onScreenChange={(event) => {
        onScreenChange?.(event.nativeEvent.screen)
      }}
    />
  )
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    width: '100%'
  }
})
