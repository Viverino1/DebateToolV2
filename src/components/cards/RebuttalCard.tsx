import CardTemplate from "./CardTemplate";

export default function RebuttalCard(props: {card: Rebuttal}){
  return(
    <CardTemplate card={props.card}>
      <div>
        <h1 className="text-md overflow-auto line-clamp-2"><span className="text-rebuttal">Accusation: </span>{props.card.accusation}</h1>
        <h1 className="text-md overflow-auto pt-2 line-clamp-2"><span className="text-rebuttal">Counterclaim: </span>{props.card.counterClaim}</h1>
      </div>
      <p className="text-md h-full overflow-auto pt-2"><span className="text-rebuttal">Data: </span>{props.card.data}</p>
    </CardTemplate>
  )
}