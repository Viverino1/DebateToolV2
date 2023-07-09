import { ReactElement } from "react";
import { BootstrapReboot, CardHeading, FileEarmarkText } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar(){
  const navigate = useNavigate();
  const sideBarIconSize = 30;
  return(
    <div className={"relative group z-10 h-full w-26 hover:w-90 bg-background transition overflow-clip text-text-light text-xl"}>
      <button className="relative items-center w-full h-20 p-4 flex space-x-4 outline-none" onClick={() => navigate("/home")}>
        <img src="/DebateToolLogo.svg" 
        className="absolute rounded-full h-16"/>
        <div className="pl-16 w-full h-full flex items-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition">Debate Tool</div>
      </button>

      <NavBarDivider/>
      
      <div className="p-4 flex flex-col space-y-4">
        {/* <SidebarElement
        link="settings"
        text="Vivek Maddineni"
        icon={<img src="https://lh3.googleusercontent.com/ogw/AGvuzYaRgljT5O44UcHXi1x9scf5MYnlB30pKu_V1YrITg=s64-c-mo" className="w-12 rounded-full"/>}
        /> */}
        <SidebarElement
        link="cards"
        text="Cards"
        icon={<CardHeading size={sideBarIconSize}/>}
        />
        <SidebarElement
        link="case"
        text="Case"
        icon={<FileEarmarkText size={sideBarIconSize}/>}
        />
        <SidebarElement
        link="rounds"
        text="Rounds"
        icon={<BootstrapReboot size={sideBarIconSize}/>}
        />
      </div>
      <NavBarDivider/>

      <div className="w-full h-fit">
        
      </div>

      <div className="absolute bottom-0 w-full">
        <NavBarDivider/>
        <div className=" w-full h-24 p-4 flex space-x-4">
          <img src="https://lh3.googleusercontent.com/ogw/AGvuzYaRgljT5O44UcHXi1x9scf5MYnlB30pKu_V1YrITg=s64-c-mo" 
          className="!rounded-full border h-16"/>
          <div className="w-full h-full flex items-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition">Vivek Maddineni</div>
        </div>
      </div>
    </div>
  )
}

function SidebarElement(props: {link: string, text: string, icon: ReactElement}){
  const {link, text, icon} = props;

  const navigate = useNavigate();

  const doesIncludeLink = useLocation().pathname.includes(link);

  return(
    <button className={`flex h-16 borderless transition outline-none w-full overflow-clip ${doesIncludeLink? "bg-primary glow" : "group-hover:border"}`}
    onClick={() => navigate(link)}>
      <div className="h-full aspect-square center">{icon}</div>
      <div className="flex h-full items-center group-hover:opacity-100 opacity-0 transition whitespace-nowrap">{text}</div>
    </button>
  )
}

function NavBarDivider(){
  return <div className="w-full h-0.5 bg-transparent group-hover:bg-background-light transition"/>
}