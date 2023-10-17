import { useNavigate } from "react-router-dom"
import RoundCard from "./compnents/RoundCard";
import Searchbar from "../../components/Searchbar";
import { useState } from "react";
import { ExclamationCircle, RocketTakeoff } from "react-bootstrap-icons";
import Divider from "../../components/Divider";
import { useQueryClient } from "react-query";
import { emptyRound, getValue } from "../../utils/helpers";
import { launchRound } from "../../utils/firebase/firestore/team.firestore";
import TeamMemberSelector from "../../components/UI/selectors/TeamMemberSelector";

export default function RoundsPage(){
  const navigate = useNavigate();

  const team = useQueryClient().getQueryData("team") as Team;

  //const [searchQuery, setSearchQuery] = useState("");

  const [isNewMenuActive, setIsNewMenuActive] = useState(false);

  const round: Round = {...emptyRound};

  const [errMsg, setErrMsg] = useState("");

  return(
    <div className="w-full h-full p-4 overflow-auto">
      <div className={`absolute top-0 bottom-0 left-0 right-0 w-full h-full backdrop-blur-sm z-30 transition opacity-0 flex justify-center items-center ${isNewMenuActive? "opacity-100" : "pointer-events-none"}`}>
        <div className="!backdrop-blur-3xl flex flex-col justify-center items-center  w-full">
          <div className="w-3/5 h-fit text-center flex flex-col items-center">
            <h1 className="text-4xl text-text-light pb-2">Launch New Round</h1>
            <input type="text" className="input" placeholder="Title" id="title" onChange={() => setErrMsg("")}/>
            <input type="text" className="input mt-4" placeholder="Details" id="info" onChange={() => setErrMsg("")}/>

            <h2 className="text-xl mb-1 mt-4 w-full text-left">Self</h2>
            <input type="text" className="input" placeholder="Team Code" id="oppTeamCode" onChange={() => setErrMsg("")}/>
            <div className="flex space-x-4 pt-4 w-full">
              <TeamMemberSelector placeholder="First Speaker" onChange={uid => {round.self.speaker1 = uid; setErrMsg("")}}/>
              <TeamMemberSelector placeholder="Second Speaker" onChange={uid => {round.self.speaker2 = uid; setErrMsg("")}}/>
            </div>

            <h2 className="text-xl mb-1 mt-4 w-full text-left">Opposition</h2>
            <div className="flex space-x-4 w-full">
              <input type="text" className="input" placeholder="School" id="oppSchool" onChange={() => setErrMsg("")}/>
              <input type="text" className="input !w-1/3" placeholder="Team Code" id="oppTeamCode" onChange={() => setErrMsg("")}/>
            </div>
            <div className="flex space-x-4 pt-4 w-full">
              <input type="text" className="input" placeholder="First Speaker Name" id="oppSpeaker1" onChange={() => setErrMsg("")}/>
              <input type="text" className="input" placeholder="Second Speaker Name" id="oppSpeaker2" onChange={() => setErrMsg("")}/>
            </div>
            <button className="button-primary text-text-light font-bold !w-48 mt-4"
            onClick={() => {
              setErrMsg("");
              round.info = getValue("info");
              round.title = getValue("title");
              round.self.teamCode = getValue("teamCode");
              round.opp.speaker1 = getValue("oppSpeaker1");
              round.opp.speaker2 = getValue("oppSpeaker2");
              round.opp.school = getValue("oppSchool");
              round.opp.teamCode = getValue("oppTeamCode");

              if(
                !round.title ||
                !round.opp.school ||
                !round.opp.speaker1 ||
                !round.opp.speaker2 ||
                !round.self.speaker1 ||
                !round.self.speaker2
              ){
                setErrMsg("Please fill all fields.");
                return;
              }

              if(round.self.speaker1 == round.self.speaker2){
                setErrMsg("First and second speakers cannot be the same user.");
                return;
              }

              launchRound(round).then((r) => {navigate(r.roundID)});
            }}
            >Launch Round</button>
            <div className={`text-primary font-bold text-2xl pt-4 h-12 flex items-center space-x-2 transition ${errMsg? "opacity-100" : "opacity-0"}`}>
              <ExclamationCircle size={25}/>
              <div>{errMsg}</div>
            </div>
          </div>
        </div>
      </div>

      <Searchbar 
      onChange={(
        //query
        ) => {
        //setSearchQuery(query)
      }}
      />
      <div className="w-full h-full flex space-x-4">
        <div className="w-full h-full pt-20 pr-72 flex flex-col space-y-4">
          {Object.keys(team.rounds).filter(roundID => {
            return !team.rounds[roundID].isActive;
          }).map(roundID => (
            <RoundCard key={roundID} round={team.rounds[roundID]}/>
          ))}
        </div>
        <div>
          <div className="absolute top-4 right-4 bottom-4 w-72 pt-20 text-center">
            <div className="text-text-light text-xl font-bold mb-2">Active Rounds</div>
            <div className="flex space-y-4 flex-col h-full">
              <div className="w-full max-h-full flex flex-col space-y-4 overflow-auto">
                {Object.keys(team.rounds).filter(roundID => {
                  return team.rounds[roundID].isActive;
                }).map(roundID => (
                  <button onClick={() => navigate(roundID)} key={roundID} className="relative w-full !h-16 input text-text-light !text-xl font-bold center">
                    <div className="truncate w-full">{team.rounds[roundID].title}</div>
                  </button>
                ))}
              </div>

              <Divider/>

              <button 
              onClick={() => setIsNewMenuActive(true)}
              className="relative w-full !h-16 button-primary text-text-light font-bold !text-basecenter">
                <i className="absolute aspect-square top-2 left-2 bottom-2 center"><RocketTakeoff size={30}/></i>
                Launch New Round
              </button>

              <div>
                <p className="h-28">All members of your team will be able to join active rounds. Launch a round by clicking above.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}