import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import useTimer from '../hooks/useTimer.js';
import { formatTime } from '../utils';

const Timer = (props) => {

    const timerUtil = props.timerUtil

    return (
      <h1>{formatTime(timerUtil.timer)}</h1>
    );
}

export default Timer;