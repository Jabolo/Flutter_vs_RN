import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Image, ImageStyle, SafeAreaView, View, ViewStyle} from 'react-native';
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
  'Main'
>;

const MainSceen = () => {
  const {navigate} = useNavigation<MainNavigationProps>();
  useEffect(() => {
    setTimeout(() => {
      navigate('CompressingData');
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View>
          <Text text="BenchmarkApp" />
          <Image source={images.logo} resizeMode="contain" style={IMAGE} />
        </View>
        <Button label="START" onPress={() => navigate('CompressingData')} />
      </View>
    </SafeAreaView>
  );
};

export default MainSceen;
