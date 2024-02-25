import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { HomeScreen } from './src/HomeScreen'

export default function App({ flutterWebApp }: { flutterWebApp: any }) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  return (
    <PaperProvider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>
      <HomeScreen setIsDarkMode={setIsDarkMode} flutterWebApp={flutterWebApp} />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
