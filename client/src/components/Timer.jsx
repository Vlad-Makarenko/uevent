/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';

const Timer = ({ endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  function getTimeRemaining() {
    const total = Date.parse(endDate) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  return (
    <div className='animate-pulse hover:animate-none text-green-400 lg:text-xl text-xs'>
      <span>{timeRemaining.days}d </span>
      <span>{timeRemaining.hours}h </span>
      <span>{timeRemaining.minutes}m </span>
      <span>{timeRemaining.seconds} s</span>
    </div>
  );
};

export default Timer;
