import RootStore from './root-store';

export default class BaseStore {
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  rootStore: RootStore;
}
