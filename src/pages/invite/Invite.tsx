import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom"
import { getTeamByID, getTeamInvite } from "../../utils/firebase/firestore/team.firestore";
import Loading from "../../components/Loading";

export default function Invite(){
  const navigate = useNavigate();
  const path = useLocation().pathname;

  if(path == "/invite/" || path == "/invite") return useEffect(() => navigate("/cards"));
  
  const inviteTeamID = path.replace("/invite/", "");
  const {data: invite, isLoading: isInviteLoading} = useQuery(`invite${inviteTeamID}`, () => getTeamInvite(inviteTeamID));
  const {data: team, isLoading: isTeamLoading} = useQuery(inviteTeamID, () => getTeamByID('2zE2Byc1L5aT9LDhewYl'), {enabled: !!invite});

  if(isInviteLoading || isTeamLoading) return <Loading/>
  if(!team) return useEffect(() => navigate("/cards"));

  return(
    <div className="w-full h-full p-4">
      <button className="button-primary !w-48 font-bold text-text-light">Join Team</button>
    </div>
  )
}