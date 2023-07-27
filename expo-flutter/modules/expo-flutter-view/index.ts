import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoFlutterView.web.ts
// and on native platforms to ExpoFlutterView.ts
import ExpoFlutterViewModule from './src/ExpoFlutterViewModule';
import ExpoFlutterView from './src/ExpoFlutterView';
import { ChangeEventPayload, ExpoFlutterViewProps } from './src/ExpoFlutterView.types';

// Get the native constant value.
export const PI = ExpoFlutterViewModule.PI;

export function hello(): string {
  return ExpoFlutterViewModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoFlutterViewModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoFlutterViewModule ?? NativeModulesProxy.ExpoFlutterView);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoFlutterView, ExpoFlutterViewProps, ChangeEventPayload };
