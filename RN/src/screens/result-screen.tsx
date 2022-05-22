import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  Image,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  View,
  ViewStyle,
} from 'react-native';
import {useStores} from '../App';
import {Button, Text} from '../components';
import {MainNavigatorParamList} from '../navigators/app-navigator';
import images from '../theme/images';

const BACKGROUND_CONTAINER: ViewStyle = {
  flex: 1,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
  marginHorizontal: 30,
  marginVertical: 30,
};

const IMAGE: ImageStyle = {
  height: 120,
  width: 120,
  alignSelf: 'center',
};
const SCROLL: ViewStyle = {
  flex: 1,
};

type MainNavigationProps = NativeStackNavigationProp<
  MainNavigatorParamList,
  'Result'
>;

const ResultSceen = () => {
  const {navigate} = useNavigation<MainNavigationProps>();
  const {
    stores: {
      benchmarkStore: {sendResult, clearStore},
      benchmarkStore,
    },
  } = useStores();
  useEffect(() => {
    sendResult();
  }, []);
  const onStartAgainPress = () => {
    clearStore();
    navigate('CompressingData');
  };
  const results = benchmarkStore.results.map(result => (
    <Text text={`${result.name}: ${result.result}`} />
  ));
  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <ScrollView style={SCROLL}>
        <View style={CONTAINER}>
          <View>
            <Text text={'Device'} />
            <Text text={`id: ${benchmarkStore.deviceInfo?.id}`} />
            <Text
              text={`deviceName: ${benchmarkStore.deviceInfo?.deviceName}`}
            />
            <Text
              text={`isEmulator: ${benchmarkStore.deviceInfo?.isEmulator}`}
            />
            <Text text={`model: ${benchmarkStore.deviceInfo?.model}`} />
            <Text text={`platform: ${benchmarkStore.deviceInfo?.platform}`} />
            <Text
              text={`systemName: ${benchmarkStore.deviceInfo?.systemName}`}
            />
            <Text
              text={`systemVersion: ${benchmarkStore.deviceInfo?.systemVersion}`}
            />
            <Text text="Results" />
            {results}
            <Image source={images.logo} resizeMode="contain" style={IMAGE} />
          </View>
          <Button label="START AGAIN" onPress={onStartAgainPress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultSceen;
