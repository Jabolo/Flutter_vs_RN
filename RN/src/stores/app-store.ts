import {action, flow, makeObservable, observable} from 'mobx';
import {AppState, AppStateStatus} from 'react-native';
import BaseStore from './base-store';
import RootStore, {AppLifecycle} from './root-store';

export default class AppStore extends BaseStore implements AppLifecycle {
  isLoading = false;

  onAppStarted = () => {
    this.addEventsListeners();
  };

  onAppFinished = () => {
    this.removeEventsListeners();
  };

  constructor(rootStore: RootStore) {
    super(rootStore);
    makeObservable(this, {
      appState: observable,
      isLoading: observable,
      appWillUnmount: action,
      onAppStateChanged: action,
      setLoading: action,
    });
  }

  setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };

  appState: AppStateStatus = AppState.currentState;

  appDidMount = flow(function* (this: AppStore) {
    const {getDeviceInfo} = this.rootStore.stores.benchmarkStore;
    getDeviceInfo();
  }).bind(this);

  addEventsListeners = () => {
    AppState.addEventListener('change', this.onAppStateChanged);
  };

  removeEventsListeners = () => {
    AppState.removeEventListener('change', this.onAppStateChanged);
  };

  appWillUnmount = () => {
    const {onAppFinished} = this.rootStore;
    onAppFinished();
  };

  onAppStateChanged = (nextAppState: AppStateStatus) => {
    const {onAppWillGoToForeground, onAppWillGoToBackground} = this.rootStore;
    if (
      (this.appState === 'inactive' || this.appState === 'background') &&
      nextAppState === 'active'
    ) {
      onAppWillGoToForeground();
    } else if (nextAppState === 'background') {
      onAppWillGoToBackground();
    }
    this.appState = nextAppState;
  };
}
