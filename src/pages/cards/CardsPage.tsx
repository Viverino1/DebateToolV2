import { useQuery } from "react-query";
import { getCard, getCards, saveCard } from "../../utils/firebase/firestore/cards.firestore"
import { useAppSelector } from "../../utils/redux/hooks"
import { useEffect } from 'react';
import Loading from "../../components/Loading";

export default function CardsPage(){
  const {side, topic} = useAppSelector(state => state.app);

  const cards = useQuery("cards", getCards).data;

  const dummyCard: Evidence = {
    type: "evidence",
    cardID: "",
    ownerUID: "",
    teamID: null,
    school: "",
    isPublic: true,
    createTime: 90210,
    lastEditTime: 90210,
    title: "This is the dummy card.",
    sourceName: "Youtube",
    sourceLink: "https://youtube.com",
    warrant: "This is the warrant.",
    data: "This is the data.",
    contention: 1,
    subpoint: 2,
  }

  //if(!cards){return <Loading/>}
  return(
    <div className="center flex-col p-4 space-y-4">
      {side}{topic}
      <button className="button-primary text-text-light !w-48" onClick={() => saveCard(dummyCard)}>Save Card</button>

      {Object.keys(cards as object).map((id) => (
        <div key={id}>{cards? cards[id].title + id : ""}</div>
      ))}
    </div>
  )
}