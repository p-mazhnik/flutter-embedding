import React, { Dispatch, SetStateAction } from 'react';
import { ScrollView, View, StyleSheet, Platform, Linking } from 'react-native';
import {
  Appbar,
  SegmentedButtons,
  TextInput,
  useTheme,
  Button,
  IconButton,
} from 'react-native-paper';
import Feather from "@expo/vector-icons/Feather";
import { ExpoFlutterView } from '../modules/expo-flutter-view'
import FlutterDash from './assets/flutter-dash.svg';
import { Counter } from './ReactView'

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  appBarTitleStyle: {},
  viewContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    margin: 8,
    height: 240,
    width: 320,
    position: 'relative'
  },
  viewsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
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
    <FlutterDash width={30} height={30} color={theme.colors.onSurfaceVariant} />
  );
};

const ThemeIcon = () => {
  const theme = useTheme();
  return (
    <Feather name={theme.dark ? 'moon' : 'sun'} size={30} color={theme.colors.onSurfaceVariant} />
  )
}

type ViewType = 'REACT' | 'FLUTTER'

interface View {
  id: number
  type: ViewType
}

export function HomeScreen({
  setIsDarkMode,
  flutterWebApp,
}: {
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  flutterWebApp: any;
}) {
  const theme = useTheme();
  const [screen, setScreen] = React.useState('counter');
  const [clicks, setClicks] = React.useState(42);
  const [text, setText] = React.useState('');
  const [views, setViews] = React.useState<View[]>([
    { id: 1, type: 'FLUTTER' },
    { id: 2, type: 'REACT' },
    { id: 3, type: 'REACT' },
    { id: 4, type: 'FLUTTER' }
  ])
  const addView = (type: ViewType) => {
    setViews((flutterViewKeys) => {
      return [
        ...flutterViewKeys,
        {
          id: (flutterViewKeys[flutterViewKeys.length - 1]?.id ?? 0) + 1,
          type,
        }
      ]
    })
  }
  const removeView = (id: number) => {
    setViews((flutterViewKeys) => {
      return flutterViewKeys.filter(k => k.id !== id)
    })
  }
  return (
    <View style={{ ...styles.app, backgroundColor: theme.colors.background }}>
      <Appbar.Header mode="small" elevated>
        <Appbar.Content
          titleStyle={styles.appBarTitleStyle}
          title={`Expo 🤝 Flutter`}
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
            Linking.openURL('https://github.com/p-mazhnik/flutter-embedding/')
          }
        />
        <Appbar.Action
          icon={DashIcon}
          size={30}
          onPress={() => Linking.openURL('https://flutter.dev/')}
        />
      </Appbar.Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.main}>
        <View style={{ flexDirection: 'row' }}>
          <Button style={{ margin: 5 }} icon="plus" mode="outlined" compact={true} onPress={() => addView('FLUTTER')}>
            Add Flutter View
          </Button>
          <Button style={{ margin: 5 }} icon="plus" mode="outlined" compact={true} onPress={() => addView('REACT')}>
            Add React View
          </Button>
        </View>
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
        <View style={styles.viewsContainer}>
          {views.map((view) => {
            let child
            if (view.type === 'REACT') {
              child = (
                <Counter
                  onClicksChange={setClicks}
                  clicks={clicks}
                />
              )
            } else {
              child = (
                <ExpoFlutterView
                  webConfig={{
                    flutterApp: flutterWebApp,
                  }}
                  theme={theme.dark ? 'dark' : 'light'}
                  clicks={clicks}
                  screen={screen}
                  text={text}
                  onClicksChange={setClicks}
                  onTextChange={setText}
                  onScreenChange={setScreen}
                />
              )
            }
            return (
              <View
                key={view.id}
                style={{
                  ...styles.viewContainer,
                  borderColor: theme.dark ? theme.colors.onSecondary : '#eee',
                }}>
                <IconButton
                  icon="delete"
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, zIndex: 100,
                  }}
                  size={20}
                  onPress={() => removeView(view.id)}
                />
                {child}
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  );
}
