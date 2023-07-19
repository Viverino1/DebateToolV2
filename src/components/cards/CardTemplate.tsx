import { ReactNode } from "react";
import { capitalize, colorFromType, contSubToString, getContSub } from "../../utils/helpers";
import { ArrowsAngleExpand, StarFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function CardTemplate(props: {children: ReactNode, card: AnyCard}){
  const navigate = useNavigate();

  const {card, children} = props;

  const {
    type,
    isPublic,
    cardID,
    title,
    sourceName,
    sourceLink,
    contSub,
  } = card;

  const color = colorFromType(type);

  const {contention, subpoint} = getContSub(contSub);

  return(
    <div className="relative full rounded overflow-clip">
      <div className="absolute z-0 full overflow-clip">
        <div className={`half rounded-full -translate-x-1/2 -translate-y-1/2 ${color.bg}`}></div>
      </div>
      <div className="relative background full z-10 !backdrop-blur-3xl text-text-extraLight">
        <div className="absolute top-0 left-0 right-0 flex h-12">
          <div className="w-full h-full flex space-x-2 items-center px-2 overflow-auto">
            <Tag color={color.bg} text={capitalize(type)}/>
            <Tag text={isPublic? "Public": "Private"}/>
          </div>
          <div className="h-full flex p-2 space-x-2 items-center">
            <button className="h-full aspect-square center !rounded-full background-light"><StarFill size={15}/></button>
            <button onClick={() => navigate(cardID)} className="h-full aspect-square center !rounded-full background-light"><ArrowsAngleExpand size={15}/></button>
          </div>
        </div>
        <div className="absolute top-12 left-0 right-0 bottom-0 px-2 pb-2 flex flex-col text-text text-base">
          <div className="text-text-light">
            <div className="line-clamp-1 text-text">{contSub? contSubToString(contention, subpoint) : null}</div>
            <div className="text-xl line-clamp-2 break-words">{title}</div>
            <a href={sourceLink} target="_blank" className={`underline ${color.text}`}>{sourceName}</a>
          </div>
          <div className="h-0.5 bg-secondary mt-2 mb-1 w-full"/>
          {children}
        </div>
      </div>
    </div>
  )
}

function Tag(props: {color?: string, text: string}){
  return(
    <div className={`py-1 px-2 text-sm w-fit h-fit rounded select-none ${props.color? props.color : "background-light"}`}>{props.text}</div>
  )
}