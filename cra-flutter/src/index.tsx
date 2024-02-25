import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

// The global _flutter namespace
declare var _flutter: any

const engineInitializer = await new Promise<any>((resolve) => {
  console.log('setup Flutter engine initializer...')
  _flutter.loader.loadEntrypoint({
    entrypointUrl: process.env.PUBLIC_URL + '/flutter/main.dart.js',
    onEntrypointLoaded: resolve,
  })
})
const appRunner = await engineInitializer?.initializeEngine({
  assetBase: process.env.PUBLIC_URL + '/flutter/',
  multiViewEnabled: true,
})

const flutterApp = await appRunner.runApp()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App flutterApp={flutterApp} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
