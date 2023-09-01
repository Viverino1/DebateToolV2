import { useQuery, useQueryClient } from "react-query";
import { getUserByUID } from "../../../utils/firebase/firestore/firestore";

export default function TeamMemberSelector(props: {onChange: (uid: string) => void, placeholder?: string}){
  const team = useQueryClient().getQueryData("team") as Team;

  return(
    <select 
    defaultValue={""}
    onChange={(e) => props.onChange(e.target.value)}
    className="input">
      {props.placeholder? <option disabled hidden value="">{props.placeholder}</option> : null}
      {Object.keys(team.members).map(uid => {
        const {data: user, isLoading} = useQuery(uid, () => getUserByUID(uid));
        return !isLoading? <option key={uid} value={uid}>{user?.firstName} {user?.lastName}</option> : null;
      })}
    </select>
  )
}