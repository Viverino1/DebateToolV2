import CardTemplate from "./CardTemplate";

export default function EvidenceCard(props: {card: Evidence}){
  return(
    <CardTemplate card={props.card} type={"evidence"}>
      <div className="text-md h-full overflow-auto">{props.card.data.repeat(30)}</div>
    </CardTemplate>
  )
}