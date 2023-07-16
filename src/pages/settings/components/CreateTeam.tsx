import { useQuery, useQueryClient } from "react-query";
import { createTeam, getTeam } from "../../../utils/firebase/firestore/team.firestore";
import { getValue } from "../../../utils/helpers";
import { useState } from "react";
import { ExclamationCircle } from "react-bootstrap-icons";

export default function CreateTeam(){
  const [msg, setErr] = useState<"" | "Team name is invalid." | "Team member must register with Debate Tool.">("");
  const [teamMember, setTeamMember] = useState<User>();
  const queryClient = useQueryClient();
  const team = queryClient.getQueryData("team") as Team;

  return(
    <div>
    <div className={`absolute z-10 top-0 left-0 right-0 bottom-0 backdrop-blur overflow-clip transition center ${teamMember? "opacity-100 scale-1" : "opacity-0 scale-0"}`}>
      <div className="w-96 h-96 background p-4 flex flex-col space-y-4">
        <div className="h-full w-full flex flex-col items-center text-center space-y-4">
          <h1 className="text-xl text-text-light">Team Created</h1>
          <p>You have invited {teamMember?.displayName} to join your team. send them the following invite link so they can join.</p>
          <div className="break-all text-primary underline">https://debatetoolv1.web.app/invite/{team?.teamID}</div>
          <button onClick={() => {navigator.clipboard.writeText(`https://debatetoolv1.web.app/invite/${team?.teamID}`); setTeamMember(undefined)}} className="input text-text-light !w-24">Copy</button>
        </div>
        <button onClick={() => setTeamMember(undefined)} className="button-primary text-text-light">Close</button>
      </div>
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
              setTeamMember(result.teamMember);
              queryClient.refetchQueries("currentUser");
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
    </div>
  )
}