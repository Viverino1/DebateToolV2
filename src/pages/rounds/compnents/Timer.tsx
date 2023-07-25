import { useStopwatch, useTimer } from "react-timer-hook";
import { useState } from "react";

export default function Timer(props: {time: number}){
  const [isOvertime, setIsOvertime] = useState(false);

  const { time: myTime } = props;

  const {
    minutes: stopwatchMin,
    seconds: stopwatchSec,
    start: stopwatchStart,
    pause: stopwatchPause,
    reset: stopwatchReset,
    isRunning: isStopwatchRunning,
  } = useStopwatch({autoStart: false});

  const { 
    minutes: timerMin,
    seconds: timerSec, 
    pause: timerPause, 
    restart: timerRestart, 
    resume: timerResume,
    isRunning: isTimerRunning,
  } = useTimer({
    expiryTimestamp: new Date(Date.now() + myTime),
    autoStart: false,
    onExpire: () => {
      console.log("timer expired");
      setIsOvertime(true);
      stopwatchStart();
    }
  });

  return(
    <div className="w-full h-fit background p-4 flex flex-col text-center">
      <div className={`transition ${!isOvertime? "text-base" : ""}`}>{!isOvertime? "Remaining Time" : "Overtime"}</div>
      
      <div className={`h-full ${isOvertime? "text-primary" : "text-text-light"} text-6xl flex justify-center font-bold`}>
        <span className="countdown">
          <span style={{"--value":(!isOvertime? timerMin: stopwatchMin)} as React.CSSProperties}></span>
        </span>
        <span className="-translate-y-1 transition">:</span>
        <span className="countdown">
          <span style={{"--value":(!isOvertime? timerSec: stopwatchSec)} as React.CSSProperties}></span>
        </span>
      </div>
      <div className="flex space-x-4 text-text-extraLight mt-4">
        <button className="button-primary !h-8" onClick={!isOvertime? (isTimerRunning? timerPause : timerResume) : (isStopwatchRunning? stopwatchPause : stopwatchStart)}>{(isStopwatchRunning || isTimerRunning)? "Stop" : "Start"}</button>
        <button className="button-primary !h-8" onClick={() => {
          timerRestart(new Date(Date.now() + myTime), false); 
          stopwatchReset(undefined, false);
          setIsOvertime(false);
          }}>Reset</button>
      </div>
    </div>
  )
}