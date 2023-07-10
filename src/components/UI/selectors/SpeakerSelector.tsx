import { useState } from "react"

export default function SpeakerSelector(props: {onChange: (speaker: Speaker) => void, default?: Speaker}){
  const [speaker, setSpeaker] = useState<Speaker>(props.default as Speaker);

  return(
    <button className="input" onClick={() => {
      setSpeaker(prev => (prev == 1? 2 : 1));
      props.onChange(speaker);
    }}>
      Speaker {speaker}
    </button>
  )
}