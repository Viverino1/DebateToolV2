import { doc, onSnapshot } from "firebase/firestore";
import TextBox from "../../utils/tiptap/TextBox";
import Timer from "./compnents/Timer";
import db from "../../utils/firebase/firestore/firestore";
import { useQueryClient } from "react-query";
import { useAppSelector } from "../../utils/redux/hooks";
import { useEffect, useState } from "react";
import { emptyRound, mapper } from "../../utils/helpers";
export default function RoundPage(props: {roundID: string}){
  const team = useQueryClient().getQueryData('team') as Team;
  const {topic, side} = useAppSelector(state => state.app);

  const docRef = doc(db, "teams", team.teamID, "rounds", topic, side, props.roundID);

  const [round, setRound] = useState(emptyRound);

  const sideOfTeam = (team: "opp" | "self") => team == "self"? side : side == "AFF"? "NEG" : "AFF";

  const [currentSpeech] = useState<{team: "self" | "opp", key: string}>({
    key: "intro",
    team: round.firstTeam,
  });

  useEffect(() => {
    const unsub = onSnapshot(docRef, (doc) => {
      setRound(doc.data() as Round);
    });
    return () => {
      unsub();
    }
  }, []);
  
  return(
    <div className="w-full h-full flex p-4 space-x-4">
      <div className="h-full w-[calc(100vw-theme(space.96))]">
        <TextBox/>
      </div>
      <div className="flex flex-col space-y-4 w-96 h-full">
        <div className="w-full h-fit background p-4 text-center">
          <div className="text-text text-base ">{round.title}</div>
          <div className="text-text-light text-3xl font-bold">{sideOfTeam(currentSpeech.team)} {mapper(currentSpeech.key)}</div>
        </div>

        <Timer/>

        <div className="w-full h-full background"></div>
      </div>
    </div>
  )
}