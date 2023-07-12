import { ArrowsAngleExpand, Star, StarFill } from "react-bootstrap-icons";
import { contsub } from "../../utils/helpers";

export default function EvidenceCard(props: {card: Evidence}){
  const {
    isPublic,
    contention,
    subpoint,
    title,
    warrant,
    data,
  } = props.card;

  const contentionSubpointString = contsub(contention, subpoint);

  return(
    <div className="relative w-full h-full overflow-clip rounded clip">
      <div className="absolute w-full h-full">
        <div className="h-1/2 aspect-square bg-evidence -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
      </div>
      <div className="flex flex-col space-y-2 z-10 w-full h-full !backdrop-blur-3xl background p-4"> 
        <div className="flex justify-between w-full h-fit text-text-extraLight">
          <div className="flex space-x-4 text-xs sm:text-sm">
            <Tag text="Evidence" class="!bg-evidence !border-transparent"/>
            <Tag text={isPublic? "Public": "Private"} class="bg-secondary"/>
            {contentionSubpointString? <Tag text={contentionSubpointString} class="bg-secondary"/> : null}
          </div>
          <div className="w-fit flex space-x-4">
            <button className="h-8 aspect-square background-light !rounded-full center"><StarFill size={15}/></button>
            <button className="h-8 aspect-square background-light !rounded-full center"><ArrowsAngleExpand size={15}/></button>
          </div>
        </div>
        <div className="w-full h-full">
          <h1 className="text-xl text-text-light">{title}</h1>
        </div>
      </div>
    </div>
  )
}

function Tag(props: {text: string, class:string}){
  return(
    <div className={`w-fit h-full center px-2 py-1 rounded-full background-light whitespace-nowrap ${props.class}`}>{props.text}</div>
  )
}