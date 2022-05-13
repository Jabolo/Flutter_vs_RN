import {action, flow, makeObservable, observable} from 'mobx';
import {IDeviceInfo} from '../components/types/device-info';
import benchmarkApi from '../services/api/benchmark-api';
import BaseStore from './base-store';
import RootStore from './root-store';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import {lzwEncode, measureMicroTime} from '../components/utils';

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
      setDeviceInfo: action,
      setCompressingData: action,
      addListResult: action,
      addAnimationResult: action,
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

  onCompressingPress = () => {
    const testResult = measureMicroTime(() => {
      for (let i = 0; i < 10000; i++) {
        lzwEncode('looong randooom ttteeeexxxttt');
      }
    });
    this.setCompressingData(testResult);
  };

  sendResult = flow(function* (this: BenchmarkStore) {
    try {
      const device = {};
      const results = [
        {number: 1, name: 'Compressing data', result: this.compressingResult},
        {number: 2, name: 'List', result: this.listResult},
        {number: 3, name: 'Animation', result: this.animationResult},
        {number: 4, name: 'Getting data', result: this.gettingDataResult},
      ];
      yield benchmarkApi.sendResult(device, results);
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
}
