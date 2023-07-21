import React, { useEffect, useRef, memo } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

// The global _flutter namespace
declare var _flutter: any

const divStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
}

interface FlutterViewProps {
  assetBase?: string;
  src?: string;
  onClicksChange?: (clicks: number) => void;
  onScreenChange?: (screen: string) => void;
  onTextChange?: (text: string) => void;

  text: string;
  screen: string;
  clicks: number;
}

export const FlutterView: React.FC<FlutterViewProps> = memo(({
  assetBase = '',
  src = 'main.dart.js',
  onClicksChange,
  onScreenChange,
  onTextChange,
  text,
  screen,
  clicks= 3,
}) => {
  const flutterState = useRef<any>(null)
  const ref = useRef<HTMLDivElement>(null)

  const onFlutterAppLoaded = (state: any) => {
    flutterState.current = state
    // listen to state changes
    state.onClicksChanged(() => { onClicksChange?.(flutterState.current?.getClicks()) })
    state.onTextChanged(() => { onTextChange?.(flutterState.current?.getText()) })
    state.onScreenChanged(() => { onScreenChange?.(flutterState.current?.getScreen()) })
    // set initial values
    flutterState.current?.setText(text)
    flutterState.current?.setScreen(screen)
    flutterState.current?.setClicks(clicks)
  }

  useEffect(() => {
    let isRendered = true
    const initFlutterApp = async () => {
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
        hostElement: ref.current,
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

    ref.current?.addEventListener('flutter-initialized', eventListener, {
      once: true,
    })

    return () => {
      isRendered = false
      ref.current?.removeEventListener('flutter-initialized', eventListener)
    }
  }, [])

  useEffect(() => {
    flutterState.current?.setText(text)
  }, [text]);
  useEffect(() => {
    flutterState.current?.setScreen(screen)
  }, [screen]);
  useEffect(() => {
    flutterState.current?.setClicks(clicks)
  }, [clicks]);

  return (
    <div
      ref={ref}
      style={divStyle}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    </div>
  )
})
