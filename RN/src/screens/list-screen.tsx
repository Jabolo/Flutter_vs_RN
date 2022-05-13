import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  View,
  ViewStyle,
} from 'react-native';
import {useStores} from '../App';
import {Button, Text} from '../components';
import {useFPSMetric} from '../components/utils';
import {MainNavigatorParamList} from '../navigators/app-navigator';
const {width, height} = Dimensions.get('window');
const BACKGROUND_CONTAINER: ViewStyle = {
  flex: 1,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
  marginHorizontal: 30,
  marginVertical: 30,
};
const INNER_CONTAINER: ViewStyle = {
  height: height - 200,
};

const list = [...Array(1000).keys()];
type MainNavigationProps = NativeStackNavigationProp<
  MainNavigatorParamList,
  'List'
>;
const renderItem = ({item}: {item: number}) => <Text text={`${item}`} />;
const keyExtractor = (item: number) => `${item}`;

const ListScreen = () => {
  const {navigate} = useNavigation<MainNavigationProps>();
  const {
    stores: {
      benchmarkStore: {addListResult},
    },
  } = useStores();

  const [seconds, setSeconds] = useState(0);
  const {average, fps} = useFPSMetric();
  const scrollViewRef = useRef();

  useEffect(() => {
    setInterval(() => {
      addListResult(fps);
      setSeconds(seconds + 1);
    }, 5000);
  }, [addListResult, seconds, fps]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 5) {
        clearInterval(interval);
      } else {
        addListResult(fps);
        setSeconds(seconds + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [addListResult, fps, seconds]);
  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View style={INNER_CONTAINER}>
          <Text text="2/4" />
          <FlatList
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }
            keyExtractor={keyExtractor}
            data={list}
            renderItem={renderItem}
          />
        </View>
        <Button label="Animation" onPress={() => navigate('Animation')} />
      </View>
    </SafeAreaView>
  );
};
export default ListScreen;
