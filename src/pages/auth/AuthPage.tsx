import { Google } from "react-bootstrap-icons";
import { auth, handleAuthClick } from "../../utils/firebase/firebase";
import Divider from "../../components/Divider";
import { ReactElement, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { User as FBU } from "firebase/auth";
import SchoolSelector from "../../components/UI/selectors/SchoolSelector";
import SpeakerSelector from "../../components/UI/selectors/SpeakerSelector";

export default function AuthPage(props: {isRegistered: boolean}){
  const [fbu, isLoading] = useAuthState(auth);
  if(!fbu){
    return(
      <Login/>
    )
  }else if(!props.isRegistered){
    return(
      <Register fbu={fbu}/>
    )
  }
}

function Login(){
  return(
    <div className="flex w-full h-screen">
      <div className="relative w-2/3 h-full center flex-col p-8 bg-background overflow-clip">
        <img src="/DebateToolLogo.svg" alt="Debate Tool Logo" className="glow-primary w-32 aspect-square rounded-full bg-primary"/>
        <div className="text-7xl text-primary">Debate Tool</div>
        <div className="text-3xl text-text-light mt-2">From Vivek Maddineni</div>
        <div className="text-xl w-3/4 text-center mt-8">This tool was made to unify your public forum debate experience all under one app. That includes cases, cards, contentions, evidence, rebuttals, quotes, rounds, and much more.</div>
      </div>

      <div className="w-1/3 h-full center p-8">
        <div className="w-full h-fit background p-4 flex flex-col space-y-4">
          <div className="w-full text-center">
            <div className="text-3xl text-text-light">Login to your account.</div>
            <div className="text-xl">New here? Click below to sign up!</div>
          </div>
          <Divider/>
          <Provider icon={<Google size={30}/>} providerName="Google" onClick={handleAuthClick}/>
        </div>
      </div>
    </div>
  )
}

function Provider(props: {icon: ReactElement, providerName: string, onClick: () => void}){
  return(
    <button 
    onClick={props.onClick}
    className="background p-4 flex items-center space-x-4 h-fit w-full text-text-light">
      <i className="aspect-square h-fit p-2 center rounded-full bg-primary">
        {props.icon}
      </i>
      <div className="text-2xl">Login with {props.providerName}</div>
    </button>
  )
}

function Register(props: {fbu: FBU}){
  const {fbu} = props;

  const [user, setUser] = useState<User>({
    uid: fbu.uid,
    teamID: null,
    email: fbu.email?? "",
    photoURL: fbu.photoURL?? "",
    displayName: fbu.displayName?? "",
    firstName: "",
    lastName: "",
    school: "",
    speaker: 1,
  });
  
  const [registrationStatus, setRegistrationStatus] = useState<"inProgress" | "error" | "loading">("inProgress")

  return(
    <div className="w-full h-full center flex-col space-y-4">
      <div className="relative">
        <img src={user.photoURL} className="w-32 aspect-square background !rounded-full"/>
        <div className={`absolute top-0 -z-10 w-32 aspect-square rounded-full blur-3xl animate-pulse
         ${registrationStatus == "inProgress"? "" : registrationStatus == "loading"? "bg-green-500" : "bg-red-500"}`}></div>
      </div>

      <div className="flex items-center flex-col space-y-4 w-1/2 text-text-light">
        <div className="flex space-x-4 w-full">
          <input 
          type="text" 
          className="input input-focus"
          placeholder="First Name" 
          value={user.firstName}
          onChange={(e) => {
            setUser(u => ({...u, firstName: e.target.value}));
          }}
          />
          
          <input 
          type="text" 
          className="input input-focus"
          placeholder="Last Name" 
          value={user.lastName}
          onChange={(e) => {
            setUser(u => ({...u, lastName: e.target.value}));
          }}
          />
        </div>

        <input 
        type="text" 
        className="input input-focus"
        placeholder="Email" 
        value={user.email}
        onChange={(e) => {
          setUser(u => ({...u, email: e.target.value}));
        }}
        />

        <div className="flex space-x-4 w-full">
          <input 
          type="text" 
          className="input input-focus"
          placeholder="Display Name" 
          value={user.displayName}
          onChange={(e) => {
            setUser(u => ({...u, displayName: e.target.value}));
          }}
          />

          <div className="w-48">
            <SpeakerSelector default={user.speaker} onChange={(e) => {
              setUser(u => ({...u, speaker: e}));
            }}/>
          </div>
        </div>

        <SchoolSelector onChange={(e) => {
          setUser(u => ({...u, school: e}));
        }}/>
        
        <button className="input !w-48 !bg-primary">Register</button>
      </div>
    </div>
  )
}