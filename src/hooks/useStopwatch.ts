import { useState, useRef, useCallback } from 'react';

export const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [previousLapTime, setPreviousLapTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }
  }, [isRunning]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setTime(0);
    setLaps([]);
    setPreviousLapTime(0);
  }, [stop]);

  const lap = useCallback(() => {
    const lapTime = time - previousLapTime;
    setLaps(prevLaps => [...prevLaps, lapTime]);
    setPreviousLapTime(time);
  }, [time, previousLapTime]);

  return { time, isRunning, laps, start, stop, reset, lap };
};
