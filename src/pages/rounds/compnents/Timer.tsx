import { useRef, useState } from "react";
import Countdown from "react-countdown";

function Timer(props: {minutes: number, seconds: number, completed: boolean}){
  const {minutes, seconds, completed} = props;
  return(
    <>
      <h1 className={`${!completed? "text-base text-text font-normal" : "text-xl text-text-light font-bold"} transition`}>{!completed? "Time Remaining" : "Overtime"}</h1>
      <div className={`h-full ${!completed? "text-text-light" : "text-primary"} text-6xl flex justify-center font-bold`}>
        <span className="countdown">
          <span style={{"--value":(minutes)} as React.CSSProperties}></span>
        </span>
        <span className="-translate-y-1 transition">:</span>
        <span className="countdown">
          <span style={{"--value":(seconds)} as React.CSSProperties}></span>
        </span>
      </div>
    </>
  )
}

export default function(){
  const ref = useRef(null);

  return(
      <div className="background p-4 pt-2 flex flex-col items-center">
        <Countdown 
        date={Date.now() + 2000}
        renderer={Timer}
        overtime
        autoStart={false}
        ref={ref}
      />
      <button 
      onClick={() => {
        (ref.current as any).start();
      }}
      className="p-1 w-full background-light !text-text-light mt-2">{
        'Start'
      }</button>
    </div>
  )
}