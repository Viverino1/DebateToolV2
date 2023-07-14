import { useState } from "react"

export default function SpeakerSelector(props: {onChange: (speaker: Speaker) => void, default?: Speaker, disabled?: boolean}){
  const [speaker, setSpeaker] = useState<Speaker>(props.default as Speaker);

  return(
    <button 
    disabled={props.disabled} 
    className="input" 
    onClick={() => {
      setSpeaker(prev => (prev == 1? 2 : 1));
      props.onChange(speaker == 1? 2 : 1);
    }}>
      Speaker {speaker}
    </button>
  )
}