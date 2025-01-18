import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../components/common/Button';
import { color, size, font } from '../components/common/typography';

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;

const TimerScreen = () => {
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [selectedHours, setSelectedHours] = React.useState(0);
  const [selectedMinutes, setSelectedMinutes] = React.useState(0);
  const [selectedSeconds, setSelectedSeconds] = React.useState(0);

  const hoursRef = React.useRef<ScrollView>(null);
  const minutesRef = React.useRef<ScrollView>(null);
  const secondsRef = React.useRef<ScrollView>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    const totalSeconds = (selectedHours * 3600) + (selectedMinutes * 60) + selectedSeconds;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsActive(true);
    }
  };

  const handleScroll = (event: any, type: 'hours' | 'minutes' | 'seconds') => {
    const y = event.nativeEvent.contentOffset.y;
    const selectedIndex = Math.round(y / ITEM_HEIGHT);
    if (type === 'hours') {
      setSelectedHours(hours[selectedIndex] || 0);
    } else if (type === 'minutes') {
      setSelectedMinutes(minutes[selectedIndex] || 0);
    } else {
      setSelectedSeconds(seconds[selectedIndex] || 0);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimeLeft(0);
    setIsActive(false);
    setSelectedHours(0);
    setSelectedMinutes(0);
    setSelectedSeconds(0);
    hoursRef.current?.scrollTo({ y: 0, animated: true });
    minutesRef.current?.scrollTo({ y: 0, animated: true });
    secondsRef.current?.scrollTo({ y: 0, animated: true });
  };

  const renderPickerItems = (items: number[]) => {
    return (
      <>
        <View style={styles.pickerSpacer} />
        {items.map((item) => (
          <View key={item} style={styles.pickerItem}>
            <Text style={styles.pickerText}>{item.toString().padStart(2, '0')}</Text>
          </View>
        ))}
        <View style={styles.pickerSpacer} />
      </>
    );
  };

  return (
    <View style={styles.container}>
      {!isActive && timeLeft === 0 ? (
        <View style={styles.pickerContainer}>
          <View style={styles.pickerRow}>
            <View style={styles.picker}>
              <Text style={styles.pickerLabel}>Hours</Text>
              <View style={styles.pickerWrapper}>
                <View style={styles.pickerHighlight} />
                <ScrollView
                  ref={hoursRef}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  onMomentumScrollEnd={(e) => handleScroll(e, 'hours')}
                  decelerationRate="fast"
                >
                  {renderPickerItems(hours)}
                </ScrollView>
              </View>
            </View>

            <Text style={styles.timeSeparator}>:</Text>

            <View style={styles.picker}>
              <Text style={styles.pickerLabel}>Minutes</Text>
              <View style={styles.pickerWrapper}>
                <View style={styles.pickerHighlight} />
                <ScrollView
                  ref={minutesRef}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  onMomentumScrollEnd={(e) => handleScroll(e, 'minutes')}
                  decelerationRate="fast"
                >
                  {renderPickerItems(minutes)}
                </ScrollView>
              </View>
            </View>

            <Text style={styles.timeSeparator}>:</Text>

            <View style={styles.picker}>
              <Text style={styles.pickerLabel}>Seconds</Text>
              <View style={styles.pickerWrapper}>
                <View style={styles.pickerHighlight} />
                <ScrollView
                  ref={secondsRef}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  onMomentumScrollEnd={(e) => handleScroll(e, 'seconds')}
                  decelerationRate="fast"
                >
                  {renderPickerItems(seconds)}
                </ScrollView>
              </View>
            </View>
          </View>

          <View style={styles.startButtonContainer}>
            <Button title="Start Timer" onPress={startTimer} />
          </View>
        </View>
      ) : (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          <View style={styles.buttonContainer}>
            <Button 
              title={isActive ? 'Pause' : 'Resume'}
              onPress={() => setIsActive(!isActive)}
            />
            <Button 
              title="Reset"
              onPress={resetTimer}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    alignItems: 'center',
    width: '90%',
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8%',
  },
  picker: {
    alignItems: 'center',
  },
  pickerWrapper: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    width: 80,
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: 'rgba(50, 50, 50, 0.1)',
    position: 'relative',
  },
  pickerHighlight: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(50, 50, 50, 0.2)',
    zIndex: 1,
  },
  pickerSpacer: {
    height: ITEM_HEIGHT * 2,
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerText: {
    fontSize: size.xlarge,
    fontFamily: font.bold,
    color: color.black,
  },
  pickerLabel: {
    fontSize: size.medium,
    fontFamily: font.regular,
    color: '#666',
    marginBottom: '5%',
  },
  timeSeparator: {
    fontSize: size.xxlarge,
    fontFamily: font.bold,
    marginHorizontal: '3%',
    color: color.black,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: size.timer,
    fontFamily: font.bold,
    color: color.black,
    marginBottom: '5%',  // Reduced from 8% to bring buttons closer
  },
  startButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: '5%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '60%',  // Reduced from 100% to bring buttons closer
    justifyContent: 'space-between',  // Changed from space-evenly
  },
});

export default TimerScreen;
