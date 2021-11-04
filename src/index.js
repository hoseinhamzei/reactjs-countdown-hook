import React, { useState, useEffect } from "react";

export const useTimer = (count, onFinish) => {
  const [isActive, setIsActive] = useState(true);
  const [counter, setCounter] = useState({
    count: count,
    seconds: "",
    minutes: "",
    hours: "",
    days: "",
  });

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (counter >= 1) {
          setCounter((counter) => ({ ...counter, count: counter.count - 1 }));
        } else {
          setIsActive(false);
          if (onFinish) {
            onFinish();
          }
        }

        const secondCounter = counter % 60;
        const minuteCounter = Math.floor((counter % 3600) / 60);
        const hourCounter = Math.floor((counter % (3600 * 24)) / 3600);
        const daysCounter = Math.floor(counter / (3600 * 24));

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        const computedHour =
          String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;
        const computedDay =
          String(daysCounter).length === 1 ? `0${daysCounter}` : daysCounter;

        setCounter((counter) => ({
          ...counter,
          seconds: computedSecond,
          minutes: computedMinute,
          hours: computedHour,
          days: computedDay,
        }));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter, onFinish]);

  function pause() {
    setIsActive(false);
  }

  function resume() {
    setIsActive(true);
  }

  function reset() {
    setCounter({
      count,
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    });
    setIsActive(true);
  }

  return {
    isActive,
    counter: counter.count,
    seconds: counter.seconds,
    minutes: counter.minutes,
    hours: counter.hours,
    days: counter.days,
    pause,
    resume,
    reset,
  };
};
