import { useState } from "react"

export default function PublicPrivateSelector(props: {onChange: (isPublic: boolean) => void, default?: boolean}){
  const [isPublic, setIsPublic] = useState(props.default !== undefined? props.default : false);
  return(
    <button
    className="input !w-32"
    onClick={() => {setIsPublic(old => !old); props.onChange(!isPublic)}}
    >
      {isPublic? "Public" : "Private"}
    </button>
  )
}