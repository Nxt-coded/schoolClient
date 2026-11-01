import { useState, useEffect } from "react";

export const Countdown: React.FC<{ style1?: string; style2?: string }> = ({
  style1,
  style2,
}) => {
  const targetDate = new Date("2025-04-03T00:00:00"); // Fixed date: March 28, 2025

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft) return;

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div>
      {/* <h1 className={`leading-[1.2] mb-2 text-[${style2}]`}>
        Countdown to Start <br />
        2nd Term
      </h1>
      <h2 className={`text-red-500 text-[${style1}] uppercase font-semibold`}>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
        {timeLeft.seconds}s
      </h2> */}
    </div>
  );
};
