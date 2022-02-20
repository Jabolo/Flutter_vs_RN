import {
  createNavigationContainerRef,
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useColorScheme} from 'react-native';
import {
  AnimationScreen,
  CompressingDataScreen,
  GettingDataScreen,
  ListScreen,
  MainScreen,
  ResultScreen,
} from '../screens';

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export type MainNavigatorParamList = {
  Main: undefined;
  List: undefined;
  CompressingData: undefined;
  Animation: undefined;
  GettingData: undefined;
  Result: undefined;
};
export const navigationRef = createNavigationContainerRef();

export const MainStack = createNativeStackNavigator<MainNavigatorParamList>();

export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(params = {index: 0, routes: []}) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params);
  }
}

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main">
      <MainStack.Screen name="Main" component={MainScreen} />
      <MainStack.Screen
        name="CompressingData"
        component={CompressingDataScreen}
      />
      <MainStack.Screen name="List" component={ListScreen} />
      <MainStack.Screen name="Animation" component={AnimationScreen} />
      <MainStack.Screen name="GettingData" component={GettingDataScreen} />
      <MainStack.Screen name="Result" component={ResultScreen} />
    </MainStack.Navigator>
  );
};

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}>
      <MainNavigator />
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';
