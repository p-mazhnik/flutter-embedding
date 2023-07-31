# flutter-embedding

Contains examples of how to embed Flutter in React apps

* **cra-flutter**: A simple React app (and component) bootstrapped with 
  [Create React App](https://github.com/facebook/create-react-app).  
  Renders Flutter app in a custom `hostElement`.  
  Inspired by [Angular example](https://github.com/flutter/samples/tree/main/web_embedding/ng-flutter) 
  from `flutter/samples`.
* **expo-flutter**: A simple Expo (React Native) app (and module).  
  On web, renders Flutter module in a custom `hostElement`.  
  On Android, renders Flutter module in a `FlutterView`.  
  On iOS, renders Flutter module in a `FlutterViewController`.
