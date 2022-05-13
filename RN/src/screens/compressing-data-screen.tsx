import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';
import {useStores} from '../App';
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
  'CompressingData'
>;

const CompressingDataScreen = () => {
  const {navigate} = useNavigation<MainNavigationProps>();
  const {
    stores: {benchmarkStore},
  } = useStores();

  const onNavigateList = () => {
    navigate('List');
  };

  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View>
          <Text text="1/4" />
          <Text text="Calculation" />
        </View>
        {!!benchmarkStore.compressingResult && (
          <Text text={`Result: ${benchmarkStore.compressingResult} ms`} />
        )}
        {benchmarkStore.compressingResult ? (
          <Button label="List" onPress={onNavigateList} />
        ) : (
          <Button
            label="Start test"
            onPress={benchmarkStore.onCompressingPress}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CompressingDataScreen;
