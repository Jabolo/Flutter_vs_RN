import AppStore from './app-store';
import BenchmarkStore from './benchmark-store';

export interface Stores {
  appStore: AppStore;
  benchmarkStore: BenchmarkStore;
}

export interface AppLifecycle {
  onAppStarted?: () => void;
  onAppFinished?: () => void;
  onAppWillGoToBackground?: () => void;
  onAppWillGoToForeground?: () => void;
}
type AppLifecycleFunc =
  | 'onAppStarted'
  | 'onAppFinished'
  | 'onAppWillGoToBackground'
  | 'onAppWillGoToForeground';
function implementsAppLifecycle(
  store: any,
  func: AppLifecycleFunc,
): store is AppLifecycle {
  return func in store;
}
function appLifecycleStores(stores: Stores, func: AppLifecycleFunc) {
  return Object.values(stores).filter(store =>
    implementsAppLifecycle(store, func),
  );
}

export interface UserLifecycle {
  onUserReady?: () => void;
  onLocationGranted?: () => void;
  onUserLogout?: () => void;
}
type UserLifecycleFunc = 'onUserReady' | 'onLocationGranted' | 'onUserLogout';
function implementsUserLifecycle(
  Store: any,
  func: UserLifecycleFunc,
): Store is UserLifecycle {
  return func in Store;
}
function userLifecycleStores(stores: Stores, func: UserLifecycleFunc) {
  return Object.values(stores).filter(store =>
    implementsUserLifecycle(store, func),
  );
}

const stores = (store: RootStore): Stores => ({
  appStore: new AppStore(store),
  benchmarkStore: new BenchmarkStore(store),
});

class RootStore {
  stores: Stores = stores(this);

  fetchUserData = () => {
    userLifecycleStores(this.stores, 'onUserReady').forEach(store => {
      store.onUserReady();
    });
  };

  onLocationGranted = () => {
    userLifecycleStores(this.stores, 'onLocationGranted').forEach(store => {
      store.onLocationGranted();
    });
  };

  onUserLogout = () => {
    userLifecycleStores(this.stores, 'onUserLogout').forEach(store => {
      store.onUserLogout();
    });
  };

  onAppStarted = () => {
    appLifecycleStores(this.stores, 'onAppStarted').forEach(store => {
      store.onAppStarted();
    });
  };

  onAppFinished = () => {
    appLifecycleStores(this.stores, 'onAppFinished').forEach(store => {
      store.onAppFinished();
    });
  };

  onAppWillGoToBackground = () => {
    appLifecycleStores(this.stores, 'onAppWillGoToBackground').forEach(
      store => {
        store.onAppWillGoToBackground();
      },
    );
  };

  onAppWillGoToForeground = () => {
    appLifecycleStores(this.stores, 'onAppWillGoToForeground').forEach(
      store => {
        store.onAppWillGoToForeground();
      },
    );
  };
}

export default RootStore;
