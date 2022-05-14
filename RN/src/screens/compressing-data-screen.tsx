import {observer} from 'mobx-react';
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

const CompressingDataScreen = observer(() => {
  const {
    stores: {benchmarkStore},
  } = useStores();
  useEffect(() => {
    benchmarkStore.compressingInit();
  }, []);
  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View>
          <Text text="1/4" />
          <Text text="Calculation" />
        </View>
      </View>
    </SafeAreaView>
  );
});

export default CompressingDataScreen;
