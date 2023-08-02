# cra-flutter

This React project is a simple example of how React and Flutter
web apps could be integrated, and have them interop.

This project bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
using `npm init react-app cra-flutter --template typescript` command.

Deployed to [p-mazhnik.github.io/flutter-embedding/react](https://p-mazhnik.github.io/flutter-embedding/react).

## Points of Interest

### React
The following changes were made to be able to use (and interop) with a Flutter module:
* `package.json` has a custom `prebuild` script that builds the
  Flutter web app, so React can find it later.
* `flutter.js` is added using "script" tag in `public/index.html`
* The `FlutterView` component takes care of embedding Flutter web, and yielding
  control to React through an `appLoaded` `EventEmitter`. The object yielded
  by this emitter is a state controller exposed by flutter via a JS custom
  event!

### Flutter

The embedded Flutter application lives in the `flutter` directory of this repo.
That application is a standard web app, that doesn't need to be aware that it's
going to be embedded in another framework.

* Flutter uses new `@staticInterop` methods to allow certain Dart functions to
  be called from JavaScript.
* Look at how `createDartExport` and `broadcastAppEvent` work together to make
  the `_state` controller of the Flutter app available to Angular!

## How to build the app

### Requirements

If you want to build and run this demo on your machine, you'll need
a moderately recent version of NodeJS:

```console
$ node -v

v20.3.1
```

And Flutter:

```
$ flutter --version

Flutter 3.10.5 • channel stable
Framework • revision 796c8ef792 (5 weeks ago) • 2023-06-13 15:51:02 -0700
Engine • revision 45f6e00911
Tools • Dart 3.0.5 • DevTools 2.23.1
```
**Ensure `npm` and `flutter` are present in your `$PATH`.**

### Building the app

This repository is a moderately standard React app. It integrates
Flutter web by making it part of the React `assets`.

In order to build this app, first fetch its `npm` dependencies:

```console
$ npm install
```

Then run the `build` script. It'll take care of building Flutter
automatically:

```console
$ npm run build

> cra-flutter@0.0.0 prebuild

... Flutter web build output ...

Compiling lib/main.dart for the Web...

> cra-flutter@0.0.0 build
> react-scripts build

... React build output ...

Compiled successfully.
```

### Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).  
To learn Flutter, check out the [Flutter documentation](https://flutter.dev/docs).
