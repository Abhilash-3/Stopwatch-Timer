import React from 'react';
import { View, StyleSheet } from 'react-native';
import Display from './Display';
import Controls from './Controls';
import LapList from './LapList';
import { useStopwatch } from '../hooks/useStopwatch';
import { color } from './common/typography';

export const Stopwatch = () => {
  const { time, isRunning, laps, start, stop, reset, lap } = useStopwatch();

  return (
    <View style={styles.container}>
      <Display time={time} />
      <Controls 
        isRunning={isRunning}
        onStart={start}
        onStop={stop}
        onReset={reset}
        onLap={lap}
      />
      <LapList laps={laps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%',
    backgroundColor: color.white,
  },
});
