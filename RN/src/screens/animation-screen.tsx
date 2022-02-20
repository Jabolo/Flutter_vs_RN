import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';
import {Button, Text} from '../components';
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
  'Animation'
>;

const AnimationScreen = () => {
  const {navigate} = useNavigation<MainNavigationProps>();
  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View>
          <Text text="3/4" />
          <Text text="Animation" />
        </View>
        <Button label="Getting Data" onPress={() => navigate('GettingData')} />
      </View>
    </SafeAreaView>
  );
};

export default AnimationScreen;
