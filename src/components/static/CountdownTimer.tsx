import React, { useState, useEffect, useRef } from "react";

interface CountdownTimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  storageKey?: string; // optional key to persist timer (useful for multiple timers)
  persistDeadline?: boolean;
  compact?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onTimeUp,
  storageKey,
  persistDeadline = false,
  compact = false,
}) => {
  const key = storageKey || "countdown";
  const onTimeUpRef = useRef(onTimeUp);
  const hasCalledTimeUp = useRef(false);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const [seconds, setSeconds] = useState<number>(() => {
    try {
      if (persistDeadline) {
        const deadline = Number(localStorage.getItem(`${key}-deadline`));
        if (deadline > 0) {
          return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        }
        localStorage.setItem(
          `${key}-deadline`,
          String(Date.now() + initialSeconds * 1000)
        );
        return initialSeconds;
      }
      const saved = localStorage.getItem(key);
      return saved ? Number(saved) : initialSeconds;
    } catch (error) {
      console.error("Unable to initialize the countdown:", error);
      return initialSeconds;
    }
  });

  // start stable interval once; use functional update to avoid depending on `seconds`
  useEffect(() => {
    if (persistDeadline) {
      const updateFromDeadline = () => {
        try {
          const deadline = Number(localStorage.getItem(`${key}-deadline`));
          if (deadline > 0) {
            setSeconds(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
          }
        } catch (error) {
          console.error("Unable to read the assessment deadline:", error);
        }
      };

      updateFromDeadline();
      const id = window.setInterval(updateFromDeadline, 1000);
      return () => clearInterval(id);
    }

    let stopped = false;

    const tick = () => {
      setSeconds((prev) => {
        const next = Math.max(prev - 1, 0);
        try {
          if (next > 0) localStorage.setItem(key, String(next));
          else localStorage.removeItem(key);
        } catch (error) {
          console.error("Unable to persist the countdown:", error);
        }
        return next;
      });
    };

    // if initial is already 0, trigger onTimeUp immediately
    if (seconds <= 0) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Unable to clear the completed countdown:", error);
      }
      if (!hasCalledTimeUp.current) {
        hasCalledTimeUp.current = true;
        onTimeUpRef.current();
      }
      return;
    }

    const id = window.setInterval(() => {
      if (!stopped) tick();
    }, 1000);

    return () => {
      stopped = true;
      clearInterval(id);
    };
    // We intentionally do not include `seconds` in deps so interval isn't recreated every tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, persistDeadline]);

  // watch for when seconds reaches 0 to call onTimeUp exactly once
  useEffect(() => {
    if (seconds === 0) {
      try {
        if (!persistDeadline) localStorage.removeItem(key);
      } catch (error) {
        console.error("Unable to clear the completed countdown:", error);
      }
      if (!hasCalledTimeUp.current) {
        hasCalledTimeUp.current = true;
        onTimeUpRef.current();
      }
    }
  }, [seconds, key, onTimeUp, persistDeadline]);

  const formatTime = (secs: number): string => {
    const totalSeconds = Math.floor(secs);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const getColor = () => {
    if (seconds > 30) return "text-green-500";
    if (seconds > 10) return "text-yellow-500";
    return "text-red-500 animate-pulse";
  };

  const getProgressBarColor = () => {
    if (seconds > 30) return "bg-green-500";
    if (seconds > 10) return "bg-yellow-500";
    return "bg-red-500 animate-pulse";
  };

  const progressPercent =
    initialSeconds > 0
      ? Math.min(100, Math.max(0, (seconds / initialSeconds) * 100))
      : 0;

  return (
    <div
      className={
        compact
          ? "flex flex-col items-end justify-center gap-1.5 min-w-[130px] sm:min-w-[160px]"
          : "flex flex-col justify-center items-center gap-2.5 w-full max-w-[220px]"
      }
    >
      <div
        className={`${compact ? "text-lg leading-none sm:text-2xl" : "text-[25px]"} font-bold tabular-nums ${getColor()}`}
      >
        {formatTime(seconds)}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor()}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
