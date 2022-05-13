import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';
import {Button, Text} from '../components';
import {MainNavigatorParamList} from '../navigators/app-navigator';
import LottieView from 'lottie-react-native';
import {useStores} from '../App';
import {useFPSMetric} from '../components/utils';

const data = require('./data.json');

const BACKGROUND_CONTAINER: ViewStyle = {
  flex: 1,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
  marginHorizontal: 30,
  marginVertical: 30,
};
const ROW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};
const ANIMATION: ViewStyle = {
  height: 70,
  width: 70,
};
type MainNavigationProps = NativeStackNavigationProp<
  MainNavigatorParamList,
  'Animation'
>;
const arr = [...Array(4).keys()]
const renderAnimation = arr.map(() => (
  <LottieView style={ANIMATION} source={data} autoPlay loop />
));
const renderAnimations = arr.map(() => (
  <View style={ROW}>{...renderAnimation()}</View>
));
const AnimationScreen = () => {
  const {navigate} = useNavigation<MainNavigationProps>();
  const {
    stores: {
      benchmarkStore: {addAnimationResult},
    },
  } = useStores();

  const [seconds, setSeconds] = useState(0);
  const {average, fps} = useFPSMetric();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 5) {
        clearInterval(interval);
      } else {
        addAnimationResult(fps);
        setSeconds(seconds + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [addAnimationResult, fps, seconds]);

  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View>
          <Text text="3/4" />
          <Text text="Animation" />
        </View>
     {  renderAnimations()}
        </View>
        <Button label="Getting Data" onPress={() => navigate('GettingData')} />
      </View>
    </SafeAreaView>
  );
};

export default AnimationScreen;
