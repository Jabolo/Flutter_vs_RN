import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {AppNavigator} from './navigators/app-navigator';
import RootStore from './stores/root-store';

const rootStore = new RootStore();
const storesContext = React.createContext(rootStore);
export const useStores = () => React.useContext(storesContext);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    stores: {
      appStore: {appDidMount, appWillUnmount},
    },
  } = useStores();
  useEffect(() => {
    appDidMount();
    return () => appWillUnmount();
  }, []);
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </>
  );
};

export default App;
