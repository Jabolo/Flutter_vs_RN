import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';
import {Button, Text} from '../components';
import {MainNavigatorParamList} from '../navigators/app-navigator';
const RNFS = require('react-native-fs');

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
  'GettingData'
>;
const sizes = [
  1024 * 1,
  1024 * 8,
  1024 * 64,
  1024 * 512,
  1024 * 4096,
  1024 * 32768,
];
const counts = [60, 50, 40, 20, 10, 1];

const readTime = async () => {
  var path = RNFS.DocumentDirectoryPath + '/test.txt';
  RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    .then(success => {
      console.log('success', success);
      console.log('FILE WRITTEN!');
    })
    .catch(err => {
      console.log(err.message);
    });
  // const rng = Random(123);
  // const bytes = List.generate(size, (_) => rng.nextInt(200));
  // const filePath = '${dir.path}/file_$size.bin';
  // await File(filePath).writeAsBytes(bytes, flush: true);

  // let total = 0;
  // for (let i = 0; i < count; i++) {
  //   total += BenchmarkManager.measureMicroTime(() {
  //     const result = File(filePath).readAsBytesSync();
  //     const rng2 = Random(123);
  //     if (result[0] != rng2.nextInt(200)) {
  //       // error :/
  //       console.log("error while reading file");
  //     }
  //   });
  // }

  // await File(filePath).delete();
  // return total;
};

// const initState=()=> {
//     const results = []
//     const i = 0;
//     for (let i = 0; i < sizes.length; i++) {
//      results.push(await readTime(sizes[i], counts[i]));
//     }

// }

const GettingDataScreen = () => {
  const {navigate} = useNavigation<MainNavigationProps>();
  useEffect(() => {
    readTime();
    // initState();
  }, []);
  return (
    <SafeAreaView style={BACKGROUND_CONTAINER}>
      <View style={CONTAINER}>
        <View>
          <Text text="4/4" />
          <Text text="Getting Data" />
        </View>
        <Button label="Result" onPress={() => navigate('Result')} />
      </View>
    </SafeAreaView>
  );
};

export default GettingDataScreen;
