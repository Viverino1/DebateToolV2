import { CollectionReference, DocumentData, collection, doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../config";

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

export{
  getSchools,
  getTopics,
}