import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';
import {Button, Text} from '../components';
import {lzwEncode, measureMicroTime} from '../components/utils';
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
  const [result, setResult] = useState(0);
  const onCompressingPress = () => {
    const testResult = measureMicroTime(() => {
      for (let i = 0; i < 10000; i++) {
        lzwEncode('looong randooom ttteeeexxxttt');
      }
    });
    setResult(testResult);
  };

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
        {!!result && <Text text={`Result: ${result} ms`} />}
        {!!result ? (
          <Button label="List" onPress={onNavigateList} />
        ) : (
          <Button label="Start test" onPress={onCompressingPress} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CompressingDataScreen;
