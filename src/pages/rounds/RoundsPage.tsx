import { useNavigate } from "react-router-dom"
import { dummyRound } from "../../utils/helpers";
import RoundCard from "./compnents/RoundCard";
import Searchbar from "../../components/Searchbar";
import { useState } from "react";
import { RocketTakeoff } from "react-bootstrap-icons";
import Divider from "../../components/Divider";
import { useQueryClient } from "react-query";

export default function RoundsPage(){
  const navigate = useNavigate();

  const team = useQueryClient().getQueryData("team") as Team;

  const [searchQuery, setSearchQuery] = useState("");

  const [isNewMenuActive, setIsNewMenuActive] = useState(false);

  const rounds: {[key: string]: Round} = {
    "ID1": dummyRound,
    // "ID2": dummyRound,
    // "ID3": dummyRound,
    // "ID4": dummyRound,
    // "ID5": dummyRound,
    // "ID6": dummyRound,
    // "ID7": dummyRound,
    // "ID8": dummyRound,
    // "ID9": dummyRound,
  }

  return(
    <div className="w-full h-full p-4 overflow-auto">
      <div className={`absolute top-0 bottom-0 left-0 right-0 w-full h-full backdrop-blur-sm z-30 transition opacity-0 flex justify-center items-center ${isNewMenuActive? "opacity-100" : "pointer-events-none"}`}>
        <div className="!backdrop-blur-3xl flex flex-col justify-center items-center  w-full">
          <div className="w-3/5 h-fit text-center flex flex-col items-center">
            <h1 className="text-4xl text-text-light pb-2">Launch New Round</h1>
            <input type="text" className="input" placeholder="Title"/>
            <input type="text" className="input mt-4" placeholder="Team Code"/>
            <input type="text" className="input mt-4" placeholder="Details"/>

            <h2 className="text-xl mb-1 mt-4 w-full text-left">Opposition</h2>
            <div className="flex space-x-4 w-full">
              <input type="text" className="input" placeholder="School"/>
              <input type="text" className="input !w-1/3" placeholder="Team Code"/>
            </div>
            <div className="flex space-x-4 pt-4 w-full">
              <input type="text" className="input" placeholder="First Speaker Name"/>
              <input type="text" className="input" placeholder="Second Speaker Name"/>
            </div>
            <button className="button-primary text-text-light font-bold !w-48 mt-4"
            onClick={() => setIsNewMenuActive(false)}
            >Launch Round</button>
          </div>
        </div>
      </div>

      <Searchbar 
      onChange={(query) => setSearchQuery(query)}
      />
      <div className="w-full h-full flex space-x-4">
        <div className="w-full h-full pt-20 pr-72 flex flex-col space-y-4">
          {Object.keys(rounds).map(roundID => (
            <RoundCard key={roundID} round={rounds[roundID]}/>
          ))}
        </div>
        <div>
          <div className="absolute top-4 right-4 bottom-4 w-72 pt-20 text-center">
            <div className="text-text-light text-xl font-bold mb-2">Active Rounds</div>
            <div className="flex space-y-4 flex-col h-full">
              <div className="w-full max-h-full flex flex-col space-y-4 overflow-auto">
                {[0, 1].map(round => (
                  <button key={round} className="relative w-full !h-16 input text-text-light !text-xl font-bold center">
                    <div className="truncate w-full">Pattonville Round 3</div>
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