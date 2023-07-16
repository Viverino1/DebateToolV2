import { useQueryClient } from "react-query";

export default function TeamSettings(){
  const team = useQueryClient().getQueryData("team") as Team;

  return(
    <div className="flex flex-col space-y-4 p-4 background">
      <h1 className="text-primary text-4xl">Team Settings</h1>
      <div>
        <h2 className="text-xl text-text-light">Team Name</h2>
        <input
        type="text" 
        className="input mt-1"
        placeholder="Team Name"
        defaultValue={team.teamName}
        />
      </div>
    </div>
  )
}