import {action, computed, flow, makeObservable, observable} from 'mobx';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFetchBlob from 'rn-fetch-blob';
import {IDeviceInfo} from '../components/types/device-info';
import {getRandomInt, lzwEncode, measureMicroTime} from '../components/utils';
import {navigate} from '../navigators/app-navigator';
import benchmarkApi from '../services/api/benchmark-api';
import BaseStore from './base-store';
import RootStore from './root-store';
const sizes = [1024 * 1, 1024 * 8, 1024 * 64, 1024 * 512];
const counts = [60, 50, 40, 20];

export default class BenchmarkStore extends BaseStore {
  compressingResult = 0;
  gettingDataResult: number[] = [];
  listResult: number[] = [];
  animationResult: number[] = [];
  deviceInfo: IDeviceInfo | null = null;
  constructor(rootStore: RootStore) {
    super(rootStore);
    makeObservable(this, {
      compressingResult: observable,
      gettingDataResult: observable,
      listResult: observable,
      animationResult: observable,
      deviceInfo: observable,
      compressingInit: action,
      setDeviceInfo: action,
      setCompressingData: action,
      addListResult: action,
      addAnimationResult: action,
      results: computed,
    });
  }

  setCompressingData = (result: number) => {
    this.compressingResult = result;
  };
  addListResult = (result: number) => {
    this.listResult.push(result);
  };
  addAnimationResult = (result: number) => {
    this.animationResult.push(result);
  };
  setGettingDataResult = (result: number[]) => {
    this.gettingDataResult = result;
  };
  setDeviceInfo = (deviceInfo: IDeviceInfo | null) => {
    this.deviceInfo = deviceInfo;
  };
  clearStore = () => {
    this.compressingResult = 0;
    this.gettingDataResult = [];
    this.listResult = [];
    this.animationResult = [];
    this.deviceInfo = null;
  };

  compressingInit = () => {
    const testResult = measureMicroTime(() => {
      for (let i = 0; i < 10000; i++) {
        lzwEncode('looong randooom ttteeeexxxttt');
      }
    });
    this.setCompressingData(testResult);
    navigate('List');
  };

  readTime = async (size: number, count: number) => {
    const path = `${RNFetchBlob.fs.dirs.DownloadDir}/${size}.bin`;
    const bytes = Array.from({length: size}, () => getRandomInt(200));
    await RNFetchBlob.fs.writeFile(path, bytes, 'ascii');
    let result = 0;
    for (let i = 0; i < count; i++) {
      const start = new Date().getTime();
      await RNFetchBlob.fs.writeFile(path, bytes, 'ascii');
      result += new Date().getTime() - start;
    }
    const exists = await RNFetchBlob.fs.exists(path);

    if (exists) {
      try {
        await RNFetchBlob.fs.unlink(path);
      } catch (error) {
        console.log('[ERROR] unlink: errors');
      }
    }
    return result;
  };

  initGettingData = async () => {
    const results = [];
    for (let i = 0; i < sizes.length; i++) {
      results.push(await this.readTime(sizes[i], counts[i]));
    }
    this.setGettingDataResult(results);
    navigate('Result');
  };

  sendResult = flow(function* (this: BenchmarkStore) {
    try {
      const api = yield benchmarkApi.sendResult(this.deviceInfo, this.results);
      console.log('api', api);
    } catch (error) {
      console.log('checkHealthApi [ERROR]:', error);
    }
  }).bind(this);

  getDeviceInfo = flow(function* (this: BenchmarkStore) {
    try {
      const deviceId = DeviceInfo.getDeviceId();
      const model = DeviceInfo.getModel();
      const systemName = DeviceInfo.getSystemName();
      const systemVersion = DeviceInfo.getSystemVersion();
      const deviceName = yield DeviceInfo.getDeviceName();
      const isEmulator = yield DeviceInfo.isEmulator();
      this.setDeviceInfo({
        id: deviceId,
        deviceName,
        systemName,
        systemVersion,
        platform: Platform.OS,
        model,
        isEmulator,
      });
    } catch (error) {
      console.log('checkHealthApi [ERROR]:', error);
    }
  }).bind(this);

  get results() {
    return [
      {number: 1, name: 'Compressing data', result: this.compressingResult},
      {
        number: 2,
        name: 'List',
        result:
          this.listResult.slice(1).reduce((a, b) => a + b, 0) /
          this.listResult.length,
      },
      {
        number: 3,
        name: 'Animation',
        result:
          this.animationResult.slice(1).reduce((a, b) => a + b, 0) /
          this.listResult.length,
      },
      {
        number: 4,
        name: 'Getting data',
        result: this.gettingDataResult,
      },
    ];
  }
}
