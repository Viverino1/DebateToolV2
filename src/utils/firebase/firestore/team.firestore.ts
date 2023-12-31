import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { queryClient } from "../../../main";
import db, { getUserByEmail, usersCol } from "./firestore"
import store from "../../redux/store";

async function createTeam(teamName: string, teamMemberEmail: string){
  const user = queryClient.getQueryData("currentUser") as User;
  const {topic, side} = store.getState().app;

  const team: Team = {
    teamID: "",
    teamName: teamName,
    contentions: [],
    members: {},
    invites: {},
    rounds: {},
  }

  const teamMember = await getUserByEmail(teamMemberEmail);
  if(!teamMember || !team.teamName){return null}

  const time = Date.now();
  team.invites[teamMember.uid] = {inviteTime: time, permission: "member"}
  team.members[user.uid] = {memberSince: time, permission: "owner"}

  const teamDocRef = doc(collection(db, "teams"));
  team.teamID = teamDocRef.id;

  await setDoc(teamDocRef, {teamName: team.teamName, teamID: team.teamID});
  await setDoc(doc(teamDocRef, "members", user.uid), team.members[user.uid]);
  await setDoc(doc(teamDocRef, "invites", teamMember.uid), team.invites[teamMember.uid]);
  await setDoc(doc(teamDocRef, "contentions", topic), {[side]: team.contentions});

  await setDoc(doc(usersCol, user.uid), {teamID: team.teamID}, {merge: true});

  await queryClient.setQueryData("team", team);

  return {team: team, teamMember: teamMember};
}

async function getTeam(){
  const user = queryClient.getQueryData("currentUser") as User;
  const teamID = user.teamID;
  if(!teamID){console.log("Null Team ID"); return null}

  const team = await getTeamByID(teamID);

  return team;
}

async function getTeamByID(teamID: string){
  const {topic, side} = store.getState().app;

  const team: Team = {
    teamID: teamID,
    teamName: "",
    contentions: [],
    members: {},
    invites: {},
    rounds: {},
  }

  const teamDocRef = doc(db, "teams", teamID);

  team.teamName = ((await getDoc(teamDocRef)).data() as any).teamName;
  team.contentions = await getContentions(teamID);

  const members = await (await getDocs(collection(teamDocRef, "members"))).docs;
  members.forEach(doc => team.members[doc.id] = doc.data() as TeamMember);

  const invites = await (await getDocs(collection(teamDocRef, "invites"))).docs;
  invites.forEach(doc => team.invites[doc.id] = doc.data() as TeamInvite);

  const rounds = await (await getDocs(collection(teamDocRef, "rounds", topic, side,))).docs;
  rounds.forEach(doc => team.rounds[doc.id] = doc.data() as Round);

  console.log(`%cTeam ${teamID}: `, 'color: green;', team);

  return team;
}

async function saveContentions(contentions: Contention[]){
  const {topic, side} = store.getState().app;
  const team = queryClient.getQueryData('team') as Team;

  queryClient.setQueryData('team', {...team, contentions: contentions});

  const docRef = doc(db, "teams", team.teamID, "contentions", topic);

  const contentionsObject: {[key: string]: Contention} = {}
  contentions.forEach(contention => {
    if(contention.contentionID !== "intro" && contention.contentionID !== "conclusion"){
      contentionsObject[contention.contentionID] = contention;
    }
  })

  await updateDoc(docRef, {
    [side]: contentionsObject,
  })
}

async function getContentions(teamID: string){
  const {topic, side} = store.getState().app;

  const docRef = doc(db, "teams", teamID as string, "contentions", topic);

  const docData = ((await getDoc(docRef)).data() as any);
  const contentionsObject = docData && side in docData? docData[side] : undefined;

  var contentionsArray: Contention[] = [];

  contentionsArray[0] = {
    name: "Intro",
    index: 0,
    subpoints: [],
    contentionID: "intro",
  }

  contentionsArray[contentionsArray.length] = {
    name: "Conclusion",
    index: contentionsArray.length,
    subpoints: [],
    contentionID: "conclusion",
  }

  if(!contentionsObject){
    console.log("no contention object")
    setDoc(docRef, {[side]: {}}, {merge: true});
    return contentionsArray;
  }

  Object.keys(contentionsObject).forEach(contentionID => {
    const contention = contentionsObject[contentionID] as Contention;
    contentionsArray[contention.index] = contention;
  });

  contentionsArray[contentionsArray.length] = {
    name: "Conclusion",
    index: contentionsArray.length,
    subpoints: [],
    contentionID: "conclusion",
  }

  return contentionsArray;
}

async function possiblyNullifyContSub(cardID: string, contention: Contention | undefined, subpoint: Subpoint | undefined){
  if(queryClient.isFetching('team'))return;

  const cards = queryClient.getQueryData('cards') as {[key: string]: AnyCard};

  const contsub = cards[cardID]?.contSub;
  if(!contsub) return;

  const nullifyContention = contention === undefined && contsub.contentionID !== null? true : false;
  const nullifySubpoint = subpoint === undefined && contsub.subpointID !== null? true : false;

  if(!nullifyContention && !nullifySubpoint) return;

  if(nullifyContention){contsub.contentionID = null};
  if(nullifySubpoint){contsub.subpointID = null};
  queryClient.setQueryData('cards', cards);

  const {topic, side} = store.getState().app;
  const docRef = doc(db, "cards", topic, side, cardID);

  await setDoc(docRef, {
    contSub: cards[cardID].contSub,
  }, {merge: true});
  console.log(`Nullified ${cardID}`);
}

async function launchRound(round: Round){
  const team = queryClient.getQueryData('team') as Team;
  const {topic, side} = store.getState().app;

  const docRef = doc(collection(db, "teams", team.teamID, "rounds", topic, side));
  const roundWithID: Round = {...round, roundID: docRef.id};
  await setDoc(docRef, roundWithID);
  
  team.rounds[roundWithID.roundID] = roundWithID;
  queryClient.setQueryData("team", team);

  return roundWithID;
}

async function getTeamInvite(teamID: string){
  const user = queryClient.getQueryData("currentUser") as User;
  const docRef = doc(db, "teams", teamID, "invites", user.uid);
  const invite = (await getDoc(docRef)).data() as TeamInvite;
  console.log(`%cInvite to ${teamID}: `, 'color: green;', invite);
  return invite;
}

async function acceptTeamInvite(teamID: string, permission: TeamPermission){
  const user = queryClient.getQueryData("currentUser") as User;
  const memberDocRef = doc(db, "teams", teamID, "members", user.uid);
  await setDoc(memberDocRef, {permission: permission, memberSince: Date.now()} as TeamMember);

  const inviteDocRef = doc(db, "teams", teamID, "invites", user.uid);
  await deleteDoc(inviteDocRef);

  const userDocRef = doc(db, "users", user.uid);
  await setDoc(userDocRef, {
    teamID: teamID,
  }, {merge: true});
}

export{
  createTeam,
  getTeam,
  getTeamByID,
  saveContentions,
  possiblyNullifyContSub,
  launchRound,
  getTeamInvite,
  acceptTeamInvite,
}