import { CollectionReference, DocumentData, collection, doc, getDoc, getFirestore } from "firebase/firestore";
import app, { auth } from "../firebase";

const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

async function getSchools(){
  console.log("Gettings Schools");
  const schools = ((await getDoc(doc(db, "public", "static"))).data() as any).schools;
  return schools as School[];
}

async function getTopics(){
  console.log("Gettings Topics");
  const topics = ((await getDoc(doc(db, "public", "static"))).data() as any).topics;
  return topics as string[];
}

async function getCurrentUser(){
  const uid = auth.currentUser?.uid;

  if(uid){
    const user = await getDoc(doc(db, "users", uid));
    return user;
  }else{
    return undefined;
  }
}

export{
  getSchools,
  getTopics,
  getCurrentUser,
}