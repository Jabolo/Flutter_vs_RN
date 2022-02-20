import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {AppNavigator} from './navigators/app-navigator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </>
  );
};

export default App;
