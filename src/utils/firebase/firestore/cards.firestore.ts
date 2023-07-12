import { and, collection, doc, getDoc, getDocs, or, query, setDoc, where } from "firebase/firestore";
import db, { getCurrentUser } from "./firestore";
import store from "../../redux/store";
import { queryClient } from "../../../main";

async function saveCard(card: AnyCard){
  const {side, topic} = store.getState().app;
  const colRef = collection(db, "cards", topic, side);

  if(!card.cardID){
    const docRef = doc(colRef);
    card.cardID = docRef.id;
    await setDoc(docRef, card);
  }else{
    const docRef = doc(colRef, card.cardID);
    await setDoc(docRef, card);
  }

  queryClient.setQueryData("cards", (old: any) => ({...old, [card.cardID]: card}));
  
  return card;
}

async function getCards(){
  const {side, topic} = store.getState().app;
  const cardsRef = collection(db, "cards", topic, side);

  const user = await queryClient.fetchQuery('currentUser', getCurrentUser);

  const q = query(cardsRef, or(
    where("ownerUID", "==", user?.uid),
    where("teamID", "==", user?.teamID),
    and(
      where("school", "==", user?.school),
      where("isPublic", "==", true),
    ),
  ));

  const querySnapshot = await getDocs(q);

  const cards: {[key: string]: AnyCard} = {};

  querySnapshot.forEach((doc) => {
    const card = doc.data() as AnyCard;

    switch(card.type){
      case "evidence": cards[card.cardID] = card as Evidence; break;
      case "quote": cards[card.cardID] = card as Quote; break;
      case "rebuttal": cards[card.cardID] = card as Rebuttal; break;
      case "statistic": cards[card.cardID] = card as Statistic; break;
    }
  });

  console.log("%cCards: ", 'color: green;', cards);

  return cards;
}

// async function getCard(id: string){
//   console.log("Getting Card: ", id);
//   const {side, topic} = store.getState().app;
//   const docRef = doc(db, "cards", topic, side, id);
//   const card = (await getDoc(docRef)).data() as Card;
//   switch(card.type){
//     case "evidence": return card as Evidence;
//     case "rebuttal": return card as Rebuttal;
//     case "quote": return card as Quote;
//     case "statistic": return card as Statistic;
//   }
// }

export{
  saveCard,
  getCards,
}