import { useEffect } from "react";
let targetTime = Math.floor((Date.now()+(1000*5))/1000) * 1000;
export default function(){
  const overtime = false;
  
  //const [minutes, setMinutes] = useState(0);
  //const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      var distance = targetTime - Date.now();
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      console.log(minutes, ':', seconds)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return(
    <div className="background p-4 pt-2 flex flex-col items-center">
      <h1 className={`${!overtime? "text-base text-text font-normal" : "text-xl text-text-light font-bold"} transition`}>{!overtime? "Time Remaining" : "Overtime"}</h1>
      <div className={`h-full ${!overtime? "text-text-light" : "text-primary"} text-6xl flex justify-center font-bold`}>
        <span className="countdown">
          <span style={{"--value":(0)} as React.CSSProperties}></span>
        </span>
        <span className="-translate-y-1 transition">:</span>
        <span className="countdown">
          <span style={{"--value":(0)} as React.CSSProperties}></span>
        </span>
      </div>
      <button
      className="p-1 w-full hover:bg-background background-light transition !text-text-light mt-2">{
        'Start'
      }</button>
    </div>
  )
}