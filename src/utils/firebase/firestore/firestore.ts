import { CollectionReference, DocumentData, collection, doc, getDoc, getFirestore } from "firebase/firestore";
import app, { auth } from "../firebase";

const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

async function getSchools(){
  const schools = ((await getDoc(doc(db, "public", "static"))).data() as any).schools;
  console.log("Schools: ", schools);
  return schools as School[];
}

async function getTopics(){
  const topics = ((await getDoc(doc(db, "public", "static"))).data() as any).topics;
  console.log("Topics: ", topics);
  return topics as string[];
}

async function getCurrentUser(){
  const uid = auth.currentUser?.uid;

  if(uid){
    const user = (await getDoc(doc(db, "users", uid))).data();
    console.log("Current User: ", user);
    return user as User;
  }else{
    return undefined;
  }
}

export{
  getSchools,
  getTopics,
  getCurrentUser,
}