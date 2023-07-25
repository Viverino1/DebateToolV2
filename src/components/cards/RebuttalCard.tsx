import CardTemplate from "./CardTemplate";

export default function RebuttalCard(props: {card: Rebuttal}){
  const {data} = props.card
  return(
    <CardTemplate card={props.card}>
      <div>
        <p className="text-md overflow-auto line-clamp-2"><span className="text-rebuttal font-bold">Accusation: </span>{props.card.accusation}</p>
        <p className="text-md overflow-auto pt-2 line-clamp-2"><span className="text-rebuttal font-bold">Counterclaim: </span>{props.card.counterClaim}</p>
      </div>
      <p className="text-md h-full overflow-auto pt-2"><span className="text-rebuttal font-bold">Data: </span>{data? "\"": null}{data}{data? "\"": null}</p>
    </CardTemplate>
  )
}