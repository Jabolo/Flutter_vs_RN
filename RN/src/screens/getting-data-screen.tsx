import React, {useEffect} from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';
import {useStores} from '../App';
import {Text} from '../components';

const BACKGROUND_CONTAINER: ViewStyle = {
  flex: 1,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
  marginHorizontal: 30,
  marginVertical: 30,
};

const GettingDataScreen = () => {
  const {
    stores: {
      benchmarkStore: {initGettingData},
    },
  } = useStores();

  useEffect(() => {
    initGettingData();
  }, []);

  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View>
          <Text text="4/4" />
          <Text text="Getting Data" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GettingDataScreen;
