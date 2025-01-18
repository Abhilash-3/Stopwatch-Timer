import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { color, size, font } from './typography';

interface ButtonProps {
  onPress: () => void;
  title: string;
  style?: object;
}

export const Button = ({ onPress, title, style }: ButtonProps) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.black,
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: color.white,
    fontSize: size.large,
    fontFamily: font.bold,
  },
});
