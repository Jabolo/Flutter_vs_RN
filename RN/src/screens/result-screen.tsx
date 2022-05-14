import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Image, ImageStyle, SafeAreaView, View, ViewStyle} from 'react-native';
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

type MainNavigationProps = NativeStackNavigationProp<
  MainNavigatorParamList,
  'Result'
>;

const ResultSceen = () => {
  const {navigate} = useNavigation<MainNavigationProps>();
  const {
    stores: {
      benchmarkStore: {sendResult, clearStore},
    },
  } = useStores();
  useEffect(() => {
    sendResult();
  }, []);
  const onStartAgainPress = () => {
    clearStore();
    navigate('CompressingData');
  };
  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View>
          <Text text="Result" />
          <Image source={images.logo} resizeMode="contain" style={IMAGE} />
        </View>
        <Button label="START AGAIN" onPress={onStartAgainPress} />
      </View>
    </SafeAreaView>
  );
};

export default ResultSceen;
