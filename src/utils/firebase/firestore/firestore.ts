import { CollectionReference, DocumentData, collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import app, { auth } from "../firebase";
import store from "../../redux/store";
import { setTopic } from "../../redux/reducers/appSlice";

const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

async function getSchools(){
  const schools = ((await getDoc(doc(db, "public", "static"))).data() as any).schools;
  console.log("%cSchools: ", 'color: green;', schools);
  return schools as School[];
}

async function getTopics(){
  const topics = ((await getDoc(doc(db, "public", "static"))).data() as any).topics as string[];
  console.log("%cTopics: ", 'color: green;', topics);
  store.dispatch(setTopic(topics[topics.length - 1]));
  return topics;
}

const usersCol = createCollection<User>('users');

async function getCurrentUser(){
  const uid = auth.currentUser?.uid;

  if(uid){
    const user = (await getDoc(doc(usersCol, uid))).data();
    console.log("%cCurrent User: ", 'color: green;', user);
    return user as User;
  }else{
    return undefined;
  }
}

async function registerUser(user: User){
  const docRef = doc(usersCol, user.uid);
  await setDoc(docRef, user);
}

export{
  getSchools,
  getTopics,
  getCurrentUser,
  registerUser
}

export default db;