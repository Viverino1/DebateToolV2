import { useQuery } from "react-query";
import { getCards } from "../../utils/firebase/firestore/cards.firestore"
import { useLayoutEffect, useState } from "react";
import Searchbar from "../../components/Searchbar";
import EvidenceCard from "../../components/cards/EvidenceCard";
import { PlusLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import RebuttalCard from "../../components/cards/RebuttalCard";
import StatisticCard from "../../components/cards/StatisticCard";
import QuoteCard from "../../components/cards/QuoteCard";

export default function CardsPage(){
  const navigate = useNavigate();

  const cardsObject = useQuery("cards", getCards).data;

  const [cards, setCards] = useState<AnyCard[]>([]);

  useLayoutEffect(() => {
    var newCards: AnyCard[] = [];
    if(!cardsObject){return}

    Object.keys(cardsObject as object).forEach(key => {
      newCards.push(cardsObject[key]);
    });

    newCards.sort(function(a, b){return b.lastEditTime-a.lastEditTime});
    setCards(newCards);

    console.log("%cFiltered Cards: ", 'color: yellow;', newCards);
  }, [cardsObject]);

  return(
    <div className="w-full h-full p-2 overflow-auto">
      <Searchbar/>
      <button className="absolute z-30 bottom-4 right-4 !rounded-full !w-14 !h-14 center button-primary text-text-light" onClick={() => navigate("create")}>
        <PlusLg size={40}/>
      </button>
      <div className="flex flex-wrap w-full h-full pt-20">
        {cards.map(card => (
          <div key={card.cardID} className="p-2 h-1/2 xl:w-1/3 lg:w-1/2 w-full">
            <RenderCorrectCard card={card as Evidence}/>
          </div>
        ))}
      </div>
    </div>
  )
}

function RenderCorrectCard(props: {card: AnyCard}){
  switch(props.card.type){
    case "evidence": return <EvidenceCard card={props.card}/>
    case "rebuttal": return <RebuttalCard card={props.card}/>
    case "statistic": return <StatisticCard card={props.card}/>
    case "quote": return <QuoteCard card={props.card}/>
  }
}