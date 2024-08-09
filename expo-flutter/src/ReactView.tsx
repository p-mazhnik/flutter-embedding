import React from 'react';
import { View } from 'react-native';
import { FAB, Appbar, Text, useTheme } from 'react-native-paper';

interface CounterProps {
  onClicksChange?: (clicks: number) => void;
  clicks: number;
}

export const Counter: React.FC<CounterProps> = ({ clicks, onClicksChange }) => {
  const theme = useTheme();
  const incrementNumber = () => {
    onClicksChange?.(clicks + 1);
  };

  return (
    <View style={{ flex: 1, userSelect: 'none' }}>
      <Appbar.Header mode='center-aligned' style={{ height: 56, backgroundColor: theme.colors.elevation.level2 }} statusBarHeight={0}>
        <Appbar.Content title="React Counter" />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: 2 }}>You have pushed the button this many times:</Text>
        <Text variant="headlineMedium" style={{ marginBottom: 16 }}>{clicks}</Text>
        <FAB
          style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
          icon="plus"
          onPress={incrementNumber}
        />
      </View>
    </View>
  );
};
