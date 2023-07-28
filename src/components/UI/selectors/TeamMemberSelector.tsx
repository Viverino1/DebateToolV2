import { useQuery, useQueryClient } from "react-query";
import { getUserByUID } from "../../../utils/firebase/firestore/firestore";

export default function TeamMemberSelector(){
  const team = useQueryClient().getQueryData("team") as Team;

  return(
    <select className="input">
      {Object.keys(team.members).map(uid => {
        const {data: user, isLoading} = useQuery(uid, () => getUserByUID(uid));
        return !isLoading? <option key={uid} value={uid}>{user?.firstName} {user?.lastName}</option> : null;
      })}
    </select>
  )
}