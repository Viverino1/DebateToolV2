import { useNavigate } from "react-router-dom"
import { dummyRound } from "../../utils/helpers";
import RoundCard from "./compnents/RoundCard";
import Searchbar from "../../components/Searchbar";
import { useState } from "react";
import { PlusLg } from "react-bootstrap-icons";

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
      <button className="absolute z-30 bottom-4 right-4 !rounded-full !w-14 !h-14 center button-primary text-text-light" onClick={() => navigate("")}>
        <PlusLg size={40}/>
      </button>
      <div className="flex flex-wrap w-full h-full pt-20">
        {Object.keys(rounds).map(roundID => (
          <div key={roundID} className="p-2 h-1/2 xl:w-1/2 w-full">
            <RoundCard round={rounds[roundID]}/>
          </div>
        ))}
      </div>
    </div>
  )
}