import { useQueryClient } from "react-query";

export default function TeamMemberSelector(){
  const team = useQueryClient().getQueryData("team") as Team;

  return(
    <select className="input">
      {Object.keys(team.members).map(uid => (
        <option value={uid}>{uid}</option>
      ))}
    </select>
  )
}