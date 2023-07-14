import { queryClient } from "../../../main";
import { newTeam } from "../../../utils/firebase/firestore/team.firestore";
import { getValue } from "../../../utils/helpers";

export default function CreateTeam(){
  const user = queryClient.getQueryData('currentUser') as User;

  return(
    <div className="background w-full p-4 flex flex-col space-y-4">
      <h1 className="text-primary text-4xl">Create Team</h1>

      <div>
        <h2 className="text-xl text-text-light">Team Name</h2>
        <input 
        type="text" 
        className="input mt-1"
        placeholder="Team Name"
        id="teamName"
        />
      </div>

      <div>
        <h2 className="text-xl text-text-light">Team Member</h2>
        <input 
        type="text" 
        className="input mt-1"
        placeholder="Team Member Email"
        id="teamMember"
        />
      </div>

      <button 
      className="!w-36 text-text-light !h-10 button-primary"
      onClick={() => newTeam(getValue("teamName"), getValue("teamMember")).then(e => {console.log(e)})}
      >Create</button>
    </div>
  )
}