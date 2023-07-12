import { ArrowsAngleExpand, StarFill } from "react-bootstrap-icons";
import { contsub } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import CardTemplate from "./CardTemplate";

export default function EvidenceCard(props: {card: Evidence}){
  const navigate = useNavigate();

  const {
    cardID,
    isPublic,
    contention,
    subpoint,
    title,
    data,
    sourceLink,
    sourceName
  } = props.card;

  const contentionSubpointString = contsub(contention, subpoint);

  return(
    // <div className="relative w-full h-full">
    //   <div className="absolute w-full h-full overflow-clip rounded">
    //     <div className="h-1/2 aspect-square bg-evidence -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
    //   </div>
    //   <div className="absolute flex flex-col z-10 w-full h-full !backdrop-blur-3xl background p-4"> 
    //   </div>
    // </div>
    <CardTemplate type="evidence">
      <div>Hello</div>
    </CardTemplate>
  )
}