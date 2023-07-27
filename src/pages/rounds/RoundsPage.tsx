import { useNavigate } from "react-router-dom"
import { dummyRound } from "../../utils/helpers";
import RoundCard from "./compnents/RoundCard";
import Searchbar from "../../components/Searchbar";
import { useState } from "react";
import { RocketTakeoff } from "react-bootstrap-icons";
import Divider from "../../components/Divider";

export default function RoundsPage(){
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const rounds: {[key: string]: Round} = {
    "ID1": dummyRound,
    "ID2": dummyRound,
    "ID3": dummyRound,
  }

  return(
    <div className="w-full h-full p-2 overflow-auto">
      <Searchbar 
      onChange={(query) => setSearchQuery(query)}
      />
      <div className="w-full h-full flex space-x-2">
        <div className="flex flex-wrap w-full h-full pt-20 pr-72">
          {Object.keys(rounds).map(roundID => (
            <div key={roundID} className="p-2 h-1/2 xl:w-1/2 w-full">
              <RoundCard round={rounds[roundID]}/>
            </div>
          ))}
        </div>
        <div>
          <div className="absolute top-2 right-2 bottom-2 w-72 pt-22 pb-2 pr-2 text-center">
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

              <button className="relative w-full button-primary text-text-light font-bold !text-basecenter">
                <i className="absolute aspect-square top-2 left-3 bottom-2 center"><RocketTakeoff size={30}/></i>
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