import React from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';

const CONTAINER: ViewStyle = {
  borderRadius: 5,
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
  paddingHorizontal: 20,
  paddingVertical: 8,
  backgroundColor: 'white',
};
const TEXT: TextStyle = {
  fontSize: 20,
  textAlign: 'center',
};

export const Button = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={CONTAINER}>
      <Text style={TEXT}>{label}</Text>
    </TouchableOpacity>
  );
};
