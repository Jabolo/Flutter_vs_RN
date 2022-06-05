import React from 'react';
import {Text as RNText, TextStyle} from 'react-native';

const TEXT: TextStyle = {
  fontSize: 32,
  fontWeight: 'bold',
  textAlign: 'center',
};

export const Text = ({text}: {text: string}) => {
  return <RNText style={TEXT}>{text}</RNText>;
};
