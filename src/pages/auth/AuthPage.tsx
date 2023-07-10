import { Google } from "react-bootstrap-icons";
import { handleAuthClick } from "../../utils/firebase/firebase";
import Divider from "../../components/Divider";
import { ReactElement } from "react";

export default function AuthPage(props: {isLoggedIn: boolean, isRegistered: boolean}){
  if(!props.isLoggedIn){
    return(
      <Login/>
    )
  }else if(!props.isRegistered){
    return(
      <Register/>
    )
  }
}

function Register(){
  return(
    <div className="w-full h-full">Register your account</div>
  )
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