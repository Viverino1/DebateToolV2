import CardTemplate from "./CardTemplate";

export default function EvidenceCard(props: {card: Evidence}){
  return(
    <CardTemplate card={props.card} type={"evidence"}>
      <div>Hello</div>
    </CardTemplate>
  )
}