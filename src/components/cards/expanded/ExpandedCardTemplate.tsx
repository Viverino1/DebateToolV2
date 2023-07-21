import { ReactNode, useEffect } from "react";
import { capitalize, colorFromType, contSubToString, getContSub } from "../../../utils/helpers";
import { possiblyNullifyContSub } from "../../../utils/firebase/firestore/team.firestore";
import { Pencil, Star, Trash3 } from "react-bootstrap-icons";
import UserProfile from "../../UserProfile";
import { useNavigate } from "react-router-dom";
import { deleteCard } from "../../../utils/firebase/firestore/cards.firestore";

export default function ExpandedCardTemplate(props: {children: ReactNode, card: AnyCard}){
  const navigate = useNavigate();

  const {
    type,
    title,
    contSub,
    data,
    warrant,
    sourceName,
    sourceLink,
    cardID,
    ownerUID,
    createTime: create,
    lastEditTime: lastEdit,
  } = props.card;

  const createTime = new Date(create);
  const lastEditTime = new Date(lastEdit);

  const color = colorFromType(type);

  const {contention, subpoint} = getContSub(contSub);

  useEffect(() => {possiblyNullifyContSub(cardID, contention, subpoint)}, []);

  return(
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 z-10 w-full h-full">
        <div className={`w-[100vh] h-[100vh] rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2 ${color.bg}`}></div>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 z-20 backdrop-blur-[250px] p-4 overflow-auto">
        <h3 className={`text-base mb-2 py-1 px-2 w-fit h-fit text-text-light rounded ${color.bg} `}>{capitalize(type)} Card</h3>
        <h3 className="text-base">{contSub? contSubToString(contention, subpoint) : null}</h3>
        <h1 className="text-3xl text-text-light">{title}</h1>
        <a className={`text-xl underline ${color.text}`} href={sourceLink} target="_blank">{sourceName}</a>

        <div className="mt-8">{props.children}</div>

        <h2 className="text-xl text-text-light mt-8">{capitalize(type)}</h2>
        <p className="w-3/4">{data}</p>

        <h2 className="text-xl text-text-light mt-8">Warrant</h2>
        <p className="w-3/4">{warrant}</p>

        <h2 className="text-xl text-text-light mt-8">Details</h2>
        <p className="w-3/4">This card was created on {createTime.toDateString()} at {createTime.toLocaleTimeString()}{create === lastEdit? 
        (`, and it has not been edited since.`) : 
        (`. It was last edited on ${lastEditTime.toDateString()} at ${lastEditTime.toLocaleTimeString()}`)}</p>

        <h2 className="text-xl text-text-light mt-8">Options</h2>
        <div className="flex space-x-2 mt-2">
          <button onClick={() => navigate("edit")} className="input !w-12 flex justify-center items-center"><Pencil size={30}/></button>
          <button onClick={() => deleteCard(cardID)} className="input !w-12 flex justify-center items-center"><Trash3 size={30}/></button>
          <button className="input !w-12 flex justify-center items-center"><Star size={30}/></button>
        </div>

        <h2 className="text-xl text-text-light mt-8 mb-2">Creator</h2>
        <UserProfile uid={ownerUID}/>
      </div>
    </div>
  )
}