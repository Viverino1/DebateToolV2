import { useQuery } from "react-query";
import { createTeam, getTeam } from "../../../utils/firebase/firestore/team.firestore";
import { getValue } from "../../../utils/helpers";
import { useState } from "react";
import { ExclamationCircle } from "react-bootstrap-icons";

export default function CreateTeam(){
  const [msg, setErr] = useState<"" | "Team name is invalid." | "Team member must register with Debate Tool.">("");
  const [showInviteLink, setShowInviteLink] = useState(true);

  return(
    <>
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <div className="w-full h-full bg-primary"></div>
    </div>
    <div className="background w-full p-4 flex flex-col space-y-4">

      <h1 className="text-primary text-4xl">Create Team</h1>

      <div>
        <h2 className="text-xl text-text-light">Team Name</h2>
        <input 
        type="text" 
        className="input mt-1"
        placeholder="Team Name"
        id="teamName"
        onChange={() => setErr("")}
        />
      </div>

      <div>
        <h2 className="text-xl text-text-light">Team Member</h2>
        <input 
        type="text" 
        className="input mt-1"
        placeholder="Team Member Email"
        id="teamMember"
        onChange={() => setErr("")}
        />
      </div>

      <div className="flex">
        <button 
        className="!w-36 text-text-light !h-10 button-primary"
        onClick={() => {
          createTeam(getValue("teamName"), getValue("teamMember")).then(result => {
            if(result === null){
              setErr(getValue("teamName")? "Team member must register with Debate Tool." : "Team name is invalid.");
            }else{
              console.log(result);
            }
          });
        }}
        >Create</button>
        <div className={`text-lg text-primary flex space-x-1 items-center ml-4 ${msg? "opacity-100" : "opacity-0"} transition`}>
          <ExclamationCircle size={25}/>
          <div>{msg}</div>
        </div>
      </div>
    </div>
    </>
  )
}