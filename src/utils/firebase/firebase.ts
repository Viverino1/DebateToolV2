import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC93C9sYJFtGGjA0X79bIpb3vhg_gleZKg",
  authDomain: "debatetoolv1.firebaseapp.com",
  projectId: "debatetoolv1",
  storageBucket: "debatetoolv1.appspot.com",
  messagingSenderId: "148505189347",
  appId: "1:148505189347:web:9c9519b8488ef96cd51ed6",
  measurementId: "G-EGVRCJKLY9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

async function handleAuthClick(){
  const fbu = (await signInWithPopup(auth, provider)).user;
  
  return fbu;
}

async function handleSignOutClick(){
  return auth.signOut();
}

export default app;

export {
  handleAuthClick,
  handleSignOutClick,
  auth,
}