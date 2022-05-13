import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Button, Text} from '../components';
import {getRandomInt} from '../components/utils';
import {MainNavigatorParamList} from '../navigators/app-navigator';

const BACKGROUND_CONTAINER: ViewStyle = {
  flex: 1,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
  marginHorizontal: 30,
  marginVertical: 30,
};

type MainNavigationProps = NativeStackNavigationProp<
  MainNavigatorParamList,
  'GettingData'
>;
const sizes = [
  1024 * 1,
  1024 * 8,
  1024 * 64,
  1024 * 512,
  1024 * 4096,
  1024 * 32768,
];
const counts = [60, 50, 40, 20, 10, 1];

const readTime = async (size: number, count: number) => {
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

const initState = async () => {
  const results = [];
  for (let i = 0; i < sizes.length; i++) {
    results.push(await readTime(sizes[i], counts[i]));
  }
};

const GettingDataScreen = () => {
  const {navigate} = useNavigation<MainNavigationProps>();
  useEffect(() => {
    initState();
  }, []);
  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View>
          <Text text="4/4" />
          <Text text="Getting Data" />
        </View>
        <Button label="Result" onPress={() => navigate('Result')} />
      </View>
    </SafeAreaView>
  );
};

export default GettingDataScreen;
