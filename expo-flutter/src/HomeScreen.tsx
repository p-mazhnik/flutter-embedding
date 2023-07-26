import React, { Dispatch, SetStateAction } from 'react';
import { ScrollView, View, StyleSheet, Platform, Linking } from 'react-native';
import {
  Appbar,
  SegmentedButtons,
  TextInput,
  useTheme,
} from 'react-native-paper';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  appBarTitleStyle: {
    fontSize: Platform.select({
      native: 18,
    }),
  },
  flutterContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 8,
    height: 480,
    width: 320,
  },
  scrollView: {
    flex: 1,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    margin: 8,
  },
  textInput: {
    flex: 1,
  },
  segmentedButtons: {
    marginTop: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    minWidth: Platform.select({
      web: 500,
    }),
  },
});

const DashIcon = () => {
  const theme = useTheme();
  return (
    <MaterialIcons name="flutter-dash" size={30} color={theme.colors.onSurfaceVariant} />
  );
};

const ThemeIcon = () => {
  const theme = useTheme();
  return (
    <Feather name={theme.dark ? 'moon' : 'sun'} size={30} color={theme.colors.onSurfaceVariant} />
  )
}

export function HomeScreen({
  setIsDarkMode,
}: {
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useTheme();
  const [screen, setScreen] = React.useState('counter');
  const [clicks, setClicks] = React.useState(0);
  const [text, setText] = React.useState('');
  return (
    <View style={{ ...styles.app, backgroundColor: theme.colors.background }}>
      <Appbar.Header mode="small" elevated>
        <Appbar.Content
          titleStyle={styles.appBarTitleStyle}
          title={`React Native ${
            Platform.OS === 'web' ? 'Web' : ''
          } 🤝 Flutter`}
        />
        <Appbar.Action
          icon={ThemeIcon}
          size={30}
          onPress={() => setIsDarkMode(oldValue => !oldValue)}
        />
        <Appbar.Action
          icon="github"
          size={30}
          onPress={() =>
            Linking.openURL('https://github.com/p-mazhnik/rn-package-flutter/')
          }
        />
        {/*
        // todo
        <Appbar.Action
          icon={DashIcon}
          size={30}
          onPress={() => Linking.openURL('https://flutter.dev/')}
        />*/}
      </Appbar.Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.main}>
        <SegmentedButtons
          style={styles.segmentedButtons}
          value={screen}
          onValueChange={setScreen}
          buttons={[
            {
              value: 'counter',
              label: 'Counter',
              icon: 'numeric',
            },
            {
              value: 'text',
              label: 'TextField',
              icon: 'form-textbox',
            },
            {
              value: 'dash',
              label: 'Custom App',
              icon: 'application-edit-outline',
            },
          ]}
        />
        {screen === 'counter' && (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Clicks"
              onChangeText={textValue => {
                if (textValue && !isNaN(parseInt(textValue, 10))) {
                  setClicks(parseInt(textValue, 10));
                } else if (textValue === '') {
                  setClicks(0);
                }
              }}
              value={clicks?.toString()}
              keyboardType="numeric"
            />
          </View>
        )}
        {screen !== 'counter' && (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Text"
              value={text}
              onChangeText={setText}
              right={
                <TextInput.Icon
                  icon="close-circle-outline"
                  onPress={() => setText('')}
                />
              }
            />
          </View>
        )}
        <View
          style={{
            ...styles.flutterContainer,
            borderColor: theme.dark ? theme.colors.onSecondary : '#eee',
          }}>
          {/*<FlutterView
            webConfig={{
              useIframe: false,
              assetBase: '/flutter/',
              src: 'flutter/main.dart.js',
            }}
            theme={isDarkMode ? 'dark' : 'light'}
            clicks={clicks}
            screen={screen}
            text={text}
            onClicksChange={setClicks}
            onTextChange={setText}
            onScreenChange={setScreen}
          />*/}
        </View>
        <View
          style={{
            ...styles.flutterContainer,
            borderColor: theme.dark ? theme.colors.onSecondary : '#eee',
          }}>
          {/*<FlutterView
            webConfig={{
              useIframe: true,
              assetBase: '/flutter/',
              src: 'flutter/main.dart.js',
            }}
            theme={isDarkMode ? 'dark' : 'light'}
            clicks={clicks}
            text="initial text"
            screen="counter"
          />*/}
        </View>
      </ScrollView>
    </View>
  );
}
