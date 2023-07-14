import { queryClient } from "../../../main";
import { getUserByEmail } from "./firestore"

async function newTeam(teamName: string, teamMemberEmail: string){
  const user = queryClient.getQueryData("currentUser") as User;

  const team: Team = {
    teamName: teamName,
    contentions: [],
    members: {},
    invites: {},
  }

  const teamMember = await getUserByEmail(teamMemberEmail);
  if(!teamMember){return null}

  const time = Date.now();
  team.invites[teamMember.uid] = {inviteTime: time, permission: "member"}
  team.members[user.uid] = {memberSince: time, permission: "owner"}
  return team;
}

export{
  newTeam
}