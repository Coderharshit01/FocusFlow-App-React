import { useRef, useState, useEffect } from 'react';
import Top from './components/top';
import Timer from './components/Timer';
import SettingsModal from './components/settingsModal';
import Goal from './components/goals';
import Quote_Comp from './components/quotes';

function App() {
  // State to store the custom timer duration (default: 25 minutes)
  const [timer, setTimer] = useState(25);
  // Ref to hold latest timer value for use inside setInterval
  const timerRef = useRef(timer);

  // Theme state: true for light, false for dark
  const [isLightTheme, setLightTheme] = useState(false);

  // Auto-timer toggle (if true, timer restarts automatically)
  const [isAutoTimer, setAutoTimer] = useState(false);
  const isAutoTimerRef = useRef(isAutoTimer); // ref to use current auto-timer value in interval

  // Current countdown time state (min and sec)
  const [time, setTime] = useState({ min: 25, sec: 0 });

  // Whether the settings modal is open
  const [isSetting, setSetting] = useState(false);

  // Ref to store the interval ID so we can clear it
  const intervalRef = useRef(null);

  // Update auto-timer ref whenever isAutoTimer state changes
  useEffect(() => {
    isAutoTimerRef.current = isAutoTimer;
  }, [isAutoTimer]);

  // Update timerRef whenever timer state changes
  useEffect(() => {
    timerRef.current = timer;
  }, [timer]);

  // Function to apply a custom timer value from SettingsModal
  const applyCustomTimer = (newTime) => {
    setTimer(newTime); // update timer state
    setTime({ min: newTime, sec: 0 }); // reset countdown to new time
  };

  // Start the countdown timer
  const StartTimer = () => {
    // If timer is already running, do nothing
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        let { min, sec } = prevTime;

        // Timer finished
        if (min === 0 && sec === 0) {
          if (!isAutoTimerRef.current) {
            // Stop timer if auto-timer is off
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return { min: 0, sec: 0 };
          } else {
            // Restart timer with current timerRef value
            return { min: timerRef.current, sec: 0 };
          }
        }

        // Handle countdown logic
        if (sec === 0) {
          return { min: min - 1, sec: 59 };
        } else {
          return { min, sec: sec - 1 };
        }
      });
    }, 1000); // run every 1 second
  };

  // Stop the timer and reset to initial timer value
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime({ min: timer, sec: 0 }); // reset to current timer value
  };

  // Clear interval when component unmounts (cleanup)
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className={`h-screen transition-all duration-200 ${isLightTheme ? "bg-slate-300" : "bg-black"}`}>
      {/* Header with theme toggle */}
      <Top setLightTheme={setLightTheme} />

      <div className="justify-center flex flex-col items-center">
        {/* Timer display and controls */}
        <Timer
          time={time}
          setTime={setTime}
          setSetting={setSetting}
          StartTimer={StartTimer}
          resetTimer={resetTimer}
        />

        {/* Settings modal for timer customization and auto-timer toggle */}
        {isSetting && (
          <SettingsModal
            setSetting={setSetting}
            isLightTheme={isLightTheme}
            isAutoTimer={isAutoTimer}
            setAutoTimer={setAutoTimer}
            timer={timer}
            applyCustomTimer={applyCustomTimer}
          />
        )}

        {/* Optional components */}
        <Goal isLightTheme={isLightTheme} />
        <Quote_Comp isLightTheme={isLightTheme} />
      </div>
    </div>
  );
}

export default App;
