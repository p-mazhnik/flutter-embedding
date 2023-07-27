import * as React from 'react';

import { ExpoFlutterViewProps } from './ExpoFlutterView.types';

export default function ExpoFlutterView(props: ExpoFlutterViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
