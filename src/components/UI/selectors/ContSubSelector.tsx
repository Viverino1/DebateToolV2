import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contsub } from "../../../utils/helpers";
import { useQueryClient } from "react-query";

export default function ContSubSelector(props: {onChange: (contSub: ContSub) => void, default?: ContSub}){
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('currentUser') as User;

  const [contSub, setContSub] = useState<ContSub>(props.default?? {contention: null, subpoint: null});

  useEffect(() => {
    props.onChange(contSub);
  }, [contsub]);
  
  return(
    <div className="relative center">
      <button onClick={() => navigate("/settings")} hidden={!!user.teamID} className="absolute z-10 text-xl underline">Create or join a team to configure contentions.</button>
      <div className={`flex space-x-4 w-full ${!user.teamID? "opacity-70": "opacity-100"}`}>
        <select 
        disabled={!user.teamID} 
        className="input" 
        defaultValue={contSub.contention === null? "" : contSub.contention}
        onChange={e => {
          setContSub(old => ({...old, contention: e.target.value == ""? null : (typeof e.target.value) === "number"? Number(e.target.value) : e.target.value as Contention}))
        }}
        >
          <option value="">No Contention</option>
          <option value="intro">Intro</option>
          <option value="conclusion">Conclusion</option>
        </select>
        <select 
        disabled={!user.teamID} 
        className="input" 
        defaultValue={contSub.subpoint === null? "" : contSub.subpoint}
        onChange={e => {
          setContSub(old => ({...old, subpoint: e.target.value == ""? null : Number(e.target.value)}))
        }}
        >
          <option value="">No Subpoint</option>
        </select>
      </div>
    </div>
  )
}