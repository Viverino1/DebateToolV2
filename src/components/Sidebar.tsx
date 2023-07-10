import { ReactElement } from "react"
import { BootstrapReboot, CardHeading, FileEarmarkText } from "react-bootstrap-icons"
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/redux/hooks";
import { setSide, setTopic } from "../utils/redux/reducers/appSlice";
import { getTopics } from "../utils/firebase/firestore/firestore";
import { useQuery } from "react-query";
import Divider from "./Divider";

export default function Sidebar(){
  const iconSize = 30;
  return(
    <div className="fixed top-0 left-0 bottom-0 z-50 w-22 h-screen p-4 bg-background text-text-light flex flex-col justify-between">
      <div className="flex flex-col space-y-4">
        <Icon 
        icon={<img src="/DebateToolLogo.svg" className="w-12"/>}
        text="Debate Tool"
        link="/home"
        />

        <Divider/>

        <Icon 
        icon={<CardHeading size={iconSize}/>}
        text="Cards"
        link="cards"
        />

        <Icon 
        icon={<FileEarmarkText size={iconSize}/>}
        text="Case"
        link="case"
        />

        <Icon 
        icon={<BootstrapReboot size={iconSize}/>}
        text="Rounds"
        link="rounds"
        />

        <Divider/>

        <SideSelector/>

        <TopicSelector/>
      </div>
      <div className="flex flex-col space-y-4">
        <Divider/>

        <Icon 
        icon={<img src="https://lh3.googleusercontent.com/ogw/AGvuzYb8Az9mueXWBCrZlm6FogE9a6D-WAWivPYEKrkB7g=s32-c-mo" className="w-10 rounded-full"/>}
        text="Vivek Maddineni"
        link="settings"
        />
      </div>
    </div>
  )
}

function Icon(props: {icon: ReactElement, text: string, link: string}){
  const {icon, text, link} = props;
  const navigate = useNavigate();

  const isActive = useLocation().pathname.includes(link);
  
  return(
    <div className="center">
      <button
      onClick={() => {
        navigate(link);
      }}
      className={`peer w-full aspect-square center rounded-[32px] border-2 transition border-transparent ${isActive? "bg-primary rounded glow-primary" : "hover:rounded hover:border-secondary hover:bg-background-light"}`}>
        {icon}
      </button>
      <Tooltip text={text}/>
    </div>
  )
}

function Tooltip(props: {text: string}){
  return(
    <span className="absolute bg-background-light/50 backdrop-blur-sm border-2 border-secondary peer-hover:opacity-100 opacity-0 transition px-2 py-1 left-24 rounded scale-0 peer-hover:scale-100 whitespace-nowrap">
      {props.text}
    </span>
  )
}

function SideSelector(){
  const dispatch = useAppDispatch();
  const side = useAppSelector(state => state.app.side);

  return(
    <div className="center">
      <select className="peer w-full group bg-background hover:bg-background-light border-transparent hover:border-secondary rounded-3xl hover:rounded
      border-2 h-10 transition outline-none text-center appearance-none"
      onChange={(e) => dispatch(setSide(e.target.value as Side))}
      value={side}>
        <option value="AFF">AFF</option>
        <option value="NEG">NEG</option>
      </select>
      <Tooltip text="Side"/>
    </div>
  )
}

function TopicSelector(){
  const dispatch = useAppDispatch();
  const topic = useAppSelector(state => state.app.topic);

  const {isLoading, data: topics} = useQuery('topics', getTopics);

  return(
    <div className="center">
      <select className={`peer w-full group bg-background hover:bg-background-light border-transparent hover:border-secondary rounded-3xl hover:rounded
      border-2 h-10 transition outline-none text-center appearance-none ${isLoading? "border-x-background-light rounded animate-pulse" : ""}`}
      onChange={(e) => dispatch(setTopic(e.target.value))}
      disabled={isLoading}
      value={topic}>
        {topics?.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <Tooltip text={`Side ${isLoading? "- Loading" : ""}`}/>
    </div>
  )
}