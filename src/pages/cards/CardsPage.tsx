import { useQuery } from "react-query";
import { getCards } from "../../utils/firebase/firestore/cards.firestore"
import { useLayoutEffect, useState } from "react";
import Searchbar from "../../components/Searchbar";
import EvidenceCard from "../../components/cards/EvidenceCard";

export default function CardsPage(){
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
      <div className="flex flex-wrap w-full h-full pt-20">
        {cards.map(card => (
          <div key={card.cardID} className="p-2 h-1/2 xl:w-1/3 lg:w-1/2 w-full">
            <EvidenceCard card={card as Evidence}/>
          </div>
        ))}
      </div>
    </div>
  )
}