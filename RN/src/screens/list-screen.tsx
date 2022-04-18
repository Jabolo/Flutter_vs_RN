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
const list = [...Array(1000).keys()];
type MainNavigationProps = NativeStackNavigationProp<
  MainNavigatorParamList,
  'List'
>;

const ListScreen = () => {
  const {navigate} = useNavigation<MainNavigationProps>();
  const [averageFps, setAverageFps] = useState(0);
  const {average, fps} = useFPSMetric();
  const scrollViewRef = useRef();
  // setTimeout(() => {
  //   setAverageFps(average);
  //   console.log('average', average);
  // }, 5000);
  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View style={{height: height - 200}}>
          <Text text="2/4" />
          <FlatList
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }
            data={list}
            renderItem={({item}) => <Text text={item} />}
          />
        </View>
        <Button label="bum" onPress={() => console.log(averageFps)} />
        <Button label="Animation" onPress={() => navigate('Animation')} />
      </View>
    </SafeAreaView>
  );
};
export default ListScreen;
