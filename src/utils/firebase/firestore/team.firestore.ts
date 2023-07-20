import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
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
  if(!teamID){return null}

  const team: Team = {
    teamID: teamID,
    teamName: "",
    contentions: [],
    members: {},
    invites: {},
  }

  const teamDocRef = doc(db, "teams", teamID);

  team.teamName = ((await getDoc(teamDocRef)).data() as any).teamName;
  team.contentions = await getContentions();

  const members = await (await getDocs(collection(teamDocRef, "members"))).docs;
  members.forEach(doc => team.members[doc.id] = doc.data() as any);

  const invites = await (await getDocs(collection(teamDocRef, "invites"))).docs;
  invites.forEach(doc => team.invites[doc.id] = doc.data() as any);
  
  console.log("%cTeam: ", 'color: green;', team);

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

async function getContentions(){
  const {topic, side} = store.getState().app;
  const user = queryClient.getQueryData("currentUser") as User;

  const docRef = doc(db, "teams", user.teamID as string, "contentions", topic);

  const contentionsObject = ((await getDoc(docRef)).data() as any)[side];

  if(!contentionsObject){
    setDoc(docRef, {AFF: {}}, {merge: true});
    return [] as Contention[];
  }

  var contentionsArray: Contention[] = [];
  Object.keys(contentionsObject).forEach(contentionID => {
    const contention = contentionsObject[contentionID] as Contention;
    contentionsArray[contention.index] = contention;
  });

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

  return contentionsArray;
}

async function possiblyNullifyContSub(cardID: string, contention: Contention | undefined, subpoint: Subpoint | undefined){
  const cards = queryClient.getQueryData('cards') as {[key: string]: AnyCard};

  const nullifyContention = contention == undefined? true : false;
  const nullifySubpoint = subpoint == undefined? true : false;

  const contSub = cards[cardID].contSub;
  

  queryClient.setQueryData('cards', cards);

  const {topic, side} = store.getState().app;
  const docRef = doc(db, "cards", topic, side, cardID);

  //await setDoc(docRef, cards[cardID]);
  console.log(`Nullified ${cardID}`);
}

export{
  createTeam,
  getTeam,
  saveContentions,
  possiblyNullifyContSub,
}