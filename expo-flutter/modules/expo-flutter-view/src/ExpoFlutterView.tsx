import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoFlutterViewProps } from './ExpoFlutterView.types';

const NativeView: React.ComponentType<ExpoFlutterViewProps> =
  requireNativeViewManager('ExpoFlutterView');

export default function ExpoFlutterView(props: ExpoFlutterViewProps) {
  return <NativeView {...props} />;
}
