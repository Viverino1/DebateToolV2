import CardTemplate from "./CardTemplate";

export default function QuoteCard(props: {card: Quote}){
  const {
    data,
    quotee,
  } = props.card;
  return(
    <CardTemplate card={props.card}>
      <div>
        <div className="text-2xl line-clamp-3 text-center text-text-light"> {data? "\"": null}{data}{data? "\"": null} {quotee? "-" : null} <span className="text-quote">{quotee}</span></div>
      </div>
      <div className="text-md h-full overflow-auto mt-4"><span className="text-quote">Warrant: </span>{props.card.warrant}</div>
    </CardTemplate>
  )
}