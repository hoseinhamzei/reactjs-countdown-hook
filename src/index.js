import React, { useState, useEffect } from "react";

export const useTimer = (count, onFinish) => {
  const [isActive, setIsActive] = useState(true);
  const [counter, setCounter] = useState(count);
  const [seconds, setSeconds] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (counter >= 1) {
          setCounter((counter) => counter - 1);
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

        setSeconds(computedSecond);
        setMinutes(computedMinute);
        setHours(computedHour);
        setDays(computedDay);
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
    setCounter(count);
    setSeconds("00");
    setMinutes("00");
    setHours("00");
    setDays("00");
    setIsActive(true);
  }

  return {
    isActive,
    counter,
    seconds,
    minutes,
    hours,
    days,
    pause,
    resume,
    reset,
  };
};
