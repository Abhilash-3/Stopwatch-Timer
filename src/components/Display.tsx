import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { formatTime } from '../utils/timeFormatter';
import { color, size, font } from './common/typography';

interface DisplayProps {
  time: number;
}

const Display = ({ time }: DisplayProps) => {
  return <Text style={styles.display}>{formatTime(time)}</Text>;
};

const styles = StyleSheet.create({
  display: {
    fontSize: size.timer,
    fontFamily: font.bold,
    color: color.black,
  },
});

export default Display;
