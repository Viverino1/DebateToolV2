import ExpandedCardTemplate from "./ExpandedCardTemplate";

export default function RebuttalCardExpanded(props: {card: Rebuttal}){
  const {
    accusation,
    counterClaim,
  } = props.card
  return(
    <ExpandedCardTemplate card={props.card}>
      <h2 className="text-xl text-text-light mt-8">Accusition</h2>
      <p className="w-3/4">"{accusation}"</p>

      <h2 className="text-xl text-text-light mt-8">Counterclaim</h2>
      <p className="w-3/4">{counterClaim}</p>
    </ExpandedCardTemplate>
  )
}