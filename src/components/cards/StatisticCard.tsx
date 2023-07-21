import CardTemplate from "./CardTemplate";

export default function StatisticCard(props: {card: Statistic}){
  return(
    <CardTemplate card={props.card}>
      <div>
        <div className="text-MD line-clamp-3 "><span className="text-statistic">Data: </span>{props.card.data}</div>
      </div>
      <div className="text-md h-full overflow-auto mt-4"><span className="text-statistic">Warrant: </span>{props.card.warrant}</div>
    </CardTemplate>
  )
}