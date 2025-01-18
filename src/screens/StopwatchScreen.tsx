import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../components/common/Button';
import LapList from '../components/LapList';
import {color, size, font} from '../components/common/typography';

const StopwatchScreen = () => {
  const [time, setTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [laps, setLaps] = React.useState<number[]>([]);
  const [previousLapTime, setPreviousLapTime] = React.useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleLap = () => {
    const lapTime = time - previousLapTime;
    setLaps(prevLaps => [...prevLaps, lapTime]);
    setPreviousLapTime(time);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setPreviousLapTime(0);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime()}</Text>
      <View style={styles.buttonContainer}>
        // In the return statement, update the Start/Stop button:
        <Button
          title={isRunning ? 'Stop' : 'Start'}
          onPress={() => setIsRunning(!isRunning)}
          style={isRunning ? {backgroundColor: '#FF3B30'} : undefined}
        />
        <Button title="Lap" onPress={handleLap} />
        <Button title="Reset" onPress={handleReset} />
      </View>
      <LapList laps={laps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    paddingHorizontal: '3%',
  },
  timerText: {
    fontSize: size.timer,
    fontFamily: font.bold,
    color: color.black,
    marginBottom: '8%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: '5%',
  },
});

export default StopwatchScreen;
