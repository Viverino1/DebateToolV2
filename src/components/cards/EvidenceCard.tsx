import CardTemplate from "./CardTemplate";

export default function EvidenceCard(props: {card: Evidence}){
  const {data} = props.card
  return(
    <CardTemplate card={props.card}>
      <div className="text-md h-full overflow-auto"><span className="text-evidence">Data: </span>{data? "\"": null}{props.card.data}{data? "\"": null}</div>
    </CardTemplate>
  )
}