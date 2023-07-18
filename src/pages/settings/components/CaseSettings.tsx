import { useQueryClient } from "react-query";
import { saveContentions } from "../../../utils/firebase/firestore/team.firestore";
import { CaretDown, CaretUp, Trash3 } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useForceUpdate } from "../../../utils/hooks";

export default function CaseSettings(){
  const conts = (useQueryClient().getQueryData("team") as Team).contentions;

  const [contentions, setContentions] = useState(conts);
  
  useEffect(() => {setContentions(conts)}, [conts]);

  return(
    <div className="background w-full p-4 flex flex-col space-y-4">
      <h1 className="text-primary text-4xl">Case Settings</h1>
      {contentions.map((contention) => (
        contention.contentionID === "intro"? null: 
        contention.contentionID === "conclusion"? null : 
        <ContentionEditor 
        key={contention.contentionID} 
        contention={contention}
        onChange={(name) => {
          const newContentions = [...contentions];
          newContentions[contention.index].name = name;
          setContentions(newContentions);
        }}
        />
      ))}

      <button className="input !w-48">Add Contention</button>

      <button 
      className="!w-32 text-text-light !h-10 button-primary"
      onClick={() => {
        saveContentions(contentions);
      }}
      >Save</button>
    </div>
  )
}

function ContentionEditor(props: {contention: Contention, onChange: (name: string) => void}){
  const {contention, onChange} = props;

  return(
    <div key={contention.contentionID}>
          <h2 className="text-xl text-text-light">Contention {contention.index}</h2>
          <div className="flex md:flex-row flex-col mt-1">
            <input 
            type="text" 
            className="input"
            placeholder={`Title of Contention ${contention.index}`}
            value={contention.name}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            />
            <div className="flex space-x-2 mt-2 md:mt-0 md:ml-2">
              <button className="input !w-12 flex justify-center items-center">
                <CaretUp size={30}/>
              </button>
              <button className="input !w-12 flex justify-center items-center">
                <CaretDown size={30}/>
              </button>
              <button className="input !w-12 flex justify-center items-center"
              onClick={() => deleteContention(contention)}>
                <Trash3 size={30}/>
              </button>
            </div>
          </div>
        </div>
  )
}