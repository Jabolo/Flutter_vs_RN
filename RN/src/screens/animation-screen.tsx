import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';
import {Button, Text} from '../components';
import {MainNavigatorParamList} from '../navigators/app-navigator';
import LottieView from 'lottie-react-native';

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
          <LottieView
            style={{height: 70, width: 70}}
            source={require('./data.json')}
            autoPlay
            loop
          />
        </View>
        <Button label="Getting Data" onPress={() => navigate('GettingData')} />
      </View>
    </SafeAreaView>
  );
};

export default AnimationScreen;
