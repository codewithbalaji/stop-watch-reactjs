import React, { useState, useEffect } from 'react';
import './stopwatch.css';

const Stopwatch = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    const newIntervalId = setInterval(displayTimer, 10);
    setIntervalId(newIntervalId);
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  const displayTimer = () => {
    setMilliseconds(prevMilliseconds => {
      let newMilliseconds = prevMilliseconds + 10;
      if (newMilliseconds === 1000) {
        newMilliseconds = 0;
        setSeconds(prevSeconds => {
          let newSeconds = prevSeconds + 1;
          if (newSeconds === 60) {
            newSeconds = 0;
            setMinutes(prevMinutes => {
              let newMinutes = prevMinutes + 1;
              if (newMinutes === 60) {
                newMinutes = 0;
                setHours(prevHours => prevHours + 1);
              }
              return newMinutes;
            });
          }
          return newSeconds;
        });
      }
      return newMilliseconds;
    });
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div className="container">
      <h4 className="text-center">STOP CLOCK IN REACT</h4>
      <div className="timer-display">
        {`${hours < 10 ? '0' + hours : hours} : ${
          minutes < 10 ? '0' + minutes : minutes
        } : ${seconds < 10 ? '0' + seconds : seconds} : ${
          milliseconds < 10
            ? '00' + milliseconds
            : milliseconds < 100
            ? '0' + milliseconds
            : milliseconds
        }`}
      </div>
      <div className="buttons">
        <button className="btn1" onClick={startTimer}>
          START
        </button>
        <button className="btn2" onClick={pauseTimer}>
          STOP
        </button>
        <button className="btn3" onClick={resetTimer}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
