import React from "react";
import { useTimer } from "reactjs-countdown-hook";

const App = () => {
  const {
    isActive,
    counter,
    seconds,
    minutes,
    hours,
    days,
    pause,
    resume,
    reset,
  } = useTimer(10, handleTimerFinish);

  function handleTimerFinish() {
    alert("times up!");
  }
  return (
    <div>
      {counter}
      <div>{`${days} : ${hours} : ${minutes} : ${seconds}`}</div>
      <button onClick={() => (isActive ? pause() : resume())}>
        {isActive ? "Pause" : "Resume"}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default App;
