import ExpandedCardTemplate from "./ExpandedCardTemplate";

export default function QuoteCardExpanded(props: {card: Quote}){
  const {
    quotee,
  } = props.card
  return(
    <ExpandedCardTemplate card={props.card}>
      <h2 className="text-xl text-text-light mt-8">Quotee</h2>
      <p className="w-3/4">{quotee}</p>
    </ExpandedCardTemplate>
  )
}