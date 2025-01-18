import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { formatTime } from '../utils/timeFormatter';
import { color, size, font } from './common/typography';

interface LapListProps {
  laps: number[];
}

const LapList = ({ laps }: LapListProps) => {
  return (
    <ScrollView style={styles.container}>
      {laps.map((lapTime, index) => (
        <View key={index} style={styles.lapRow}>
          <Text style={styles.lapText}>Lap {laps.length - index}</Text>
          <Text style={styles.lapTime}>{formatTime(lapTime)}</Text>
        </View>
      )).reverse()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '40%',
    width: '90%',
    marginTop: '5%',
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: '3%',
  },
  lapText: {
    fontSize: size.medium,
    fontFamily: font.regular,
    color: color.black,
  },
  lapTime: {
    fontSize: size.medium,
    fontFamily: font.bold,
    color: color.black,
  },
});

export default LapList;
