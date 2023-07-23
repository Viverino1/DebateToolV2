import { useState } from "react";
import { TypeBold, TypeItalic } from "react-bootstrap-icons";
import { useStopwatch, useTimer } from "react-timer-hook";
import Tiptap from "../../utils/tiptap/Tiptap";

export default function RoundPage(){
  const myTime = 1000*60*4;

  const [text, setText] = useState("");

  const speeches: {name: string, duration: string}[] = [
    {name: "AFF Opening", duration: "04:08"},
    {name: "NEG Opening", duration: "04:12"},
    {name: "First Crossfire", duration: "03:04"},
    {name: "AFF Rebuttal", duration: "03:59"},
    {name: "NEG Rebuttal", duration: "current"},
    {name: "Second Crossfire", duration: ""},
    {name: "AFF Summary", duration: ""},
    {name: "NEG Summary", duration: ""},
    {name: "Grand Crossfire", duration: ""},
    {name: "AFF Final Focus", duration: ""},
    {name: "NEG Final Focus", duration: ""},
  ]

  const [isOvertime, setIsOvertime] = useState(false);

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
    <div className="w-full h-full flex p-4 space-x-4">
      <div className="w-full h-full">
        <Tiptap />
      </div>
      <div><div className="flex flex-col space-y-4 w-96 h-full overflow-auto">
        <div className="w-full h-fit background p-4 text-center">
          <div className="text-text text-base ">Pattonville Round 3</div>
          <div className="text-text-light text-3xl font-bold">NEG Rebuttal</div>
        </div>

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

        <div>
          <div className="w-full h-52 overflow-auto p-4 background flex flex-col space-y-4 snap-y pr-2">
            {speeches.map(speech => (
              <button key={speech.name} className="w-full input flex justify-between snap-center">
                <span>{speech.name}</span>
                <span>{speech.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div></div>
    </div>
  )
}