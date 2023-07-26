import { useNavigate } from "react-router-dom";

export default function RoundCard(props: {round: Round}){
  const navigate = useNavigate();
  const {
    roundID,
    title,
    info,
    self,
    opp,
  } = props.round;
  return(
    <button className="w-full h-full background flex" onClick={() => navigate(roundID)}>
      <div className="text-text-light text-xl font-bold">{title}</div>
    </button>
  )
}