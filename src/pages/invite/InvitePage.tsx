import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom"
import { acceptTeamInvite, getTeamByID, getTeamInvite } from "../../utils/firebase/firestore/team.firestore";
import Loading from "../../components/Loading";

export default function InvitePage(){
  const path = useLocation().pathname;

  if(path == "/invite/" || path == "/invite") return <Redirect/>
  
  const inviteTeamID = path.replace("/invite/", "");
  const {data: invite, isLoading: isInviteLoading} = useQuery(`invite${inviteTeamID}`, () => getTeamInvite(inviteTeamID));
  const {data: team, isLoading: isTeamLoading} = useQuery(inviteTeamID, () => getTeamByID('2zE2Byc1L5aT9LDhewYl'), {enabled: !!invite});

  if(isInviteLoading) return <Loading/>
  if(!invite) return <Redirect/>
  if(isTeamLoading) return <Loading/>
  if(!team) return <Redirect/>

  return(
    <div className="w-full h-full p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl text-text-light">You're Invited!</h1>
      <div className="w-96 text-center flex flex-col items-center mt-2 background p-4">
        <h1 className="text-xl text-text-light">Join {team.teamName}</h1>
        <h2 className="text-base text-text font-normal mt-1">In a Debate Tool team, you can configure contentions, create cases, launch live sync rounds, and more.</h2>
        <button id="accept" disabled={false} className="button-primary !w-48 font-bold text-text-light mt-4" 
        onClick={() => {
          (document.getElementById("accept") as HTMLInputElement).disabled = true;

          acceptTeamInvite(team.teamID, invite.permission)
          .then(() => location.reload());
        }}>Join Team</button>
      </div>
    </div>
  )
}

function Redirect(){
  const navigate = useNavigate();

  useEffect(() => navigate("/cards"), []);

  return null;
}