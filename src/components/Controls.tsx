import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './common/Button';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
}

const Controls = ({ isRunning, onStart, onStop, onReset, onLap }: ControlsProps) => {
  return (
    <View style={styles.container}>
      <Button 
        title={isRunning ? 'Stop' : 'Start'}
        onPress={isRunning ? onStop : onStart}
      />
      <Button 
        title="Lap"
        onPress={onLap}
      />
      <Button 
        title="Reset"
        onPress={onReset}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
    paddingHorizontal: '5%',
  },
});

export default Controls;
