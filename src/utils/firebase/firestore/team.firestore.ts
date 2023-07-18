import { collection, deleteDoc, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { queryClient } from "../../../main";
import db, { getUserByEmail, usersCol } from "./firestore"
import store from "../../redux/store";
import { getUniqueKey } from "../../helpers";

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

  await setDoc(docRef, {[side]: contentions}, {merge: true});
}

// async function saveContention(contention: Contention){
//   const {topic, side} = store.getState().app;
//   const team = queryClient.getQueryData('team') as Team;

//   const docRef = doc(db, "teams", team.teamID, "contentions", topic);

//   if(contention.contentionID === ""){
//     contention.contentionID = getUniqueKey();

//     contention.subpoints.forEach((subpoint, index) => {
//       if(subpoint.subpointID === ""){
//         contention.subpoints[index].subpointID = getUniqueKey();
//       }
//     });

//     if(contention.index === 0){
//       contention.index = await getNextContentionIndex();
//     }

//     const newContentions = team.contentions;
//     newContentions[contention.index] = contention;
//     queryClient.setQueryData('team', {...team, contentions: newContentions});

//     await setDoc(docRef, {
//       [side]: {
//         [contention.contentionID]: contention,
//       }
//     }, {merge: true});
//   }else{
//     const newContentions = team.contentions;
//     newContentions[contention.index] = contention;
//     queryClient.setQueryData('team', {...team, contentions: newContentions});

//     await setDoc(docRef, {
//       [side]: {
//         [contention.contentionID]: {
//           index: contention.index,
//           name: contention.name,
//         },
//       }
//     }, {merge: true});
//   }

//   return contention;
// }

// async function deleteContention(contentionToDelete: Contention){
//   const {topic, side} = store.getState().app;
//   const team = queryClient.getQueryData('team') as Team;
//   const docRef = doc(db, "teams", team.teamID, "contentions", topic);

//   var contentions = (await getContentions()).filter(contention => contention.contentionID !== contentionToDelete.contentionID);
  
//   contentions.forEach((contention, index) => {
//     if(contention.index > contentionToDelete.index){
//       contentions[index].index -= 1;
//     }
//   });

//   var shiftedContentions: Contention[] = [];
  
//   contentions.forEach((contention) => {
//     shiftedContentions[contention.index] = contention;
//   })

//   shiftedContentions[0] = {
//     name: "Intro",
//     index: 0,
//     subpoints: [],
//     contentionID: "intro",
//   }

//   console.table(shiftedContentions);

//   queryClient.setQueryData('team', {...team, contentions: shiftedContentions});
// }

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
    //console.log(contention.subpoints);
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

// async function getNextContentionIndex(){
//   const contentions = await getContentions();
//   const team = queryClient.getQueryData('team') as Team;
//   queryClient.setQueryData('team', {...team, contentions: contentions});
//   return contentions.length === 0? 1 : contentions.length - 1;
// }

export{
  createTeam,
  getTeam,
  saveContentions,
}