import CardTemplate from "./CardTemplate";

export default function EvidenceCard(props: {card: Evidence}){
  return(
    <CardTemplate card={props.card}>
      <div className="text-md h-full overflow-auto"><span className="text-evidence">Data: </span>{props.card.data}</div>
    </CardTemplate>
  )
}