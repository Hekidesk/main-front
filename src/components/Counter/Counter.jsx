import React from 'react'
import { useEffect, useState} from "react";
import { CountDownNumber } from './style/CSS';
const Counter = ({startCountDown}) => {
    const [counter, setCounter] = useState(5);

    useEffect(() => {
      const timer =
        startCountDown && counter >= 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter, startCountDown]);

  return (
    <div>
        <CountDownNumber>{startCountDown ? counter : ""}</CountDownNumber>
    </div>
  )
}

export default Counter
