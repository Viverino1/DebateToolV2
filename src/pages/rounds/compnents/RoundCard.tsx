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
    <button className="w-full h-fit background flex flex-col p-2 text-left" onClick={() => navigate(roundID)}>
      <h1 className="text-text-light text-xl font-bold">{title}</h1>
      <p className="line-clamp-3">Against {opp.speaker1} as first speaker and {opp.speaker2} as second speaker from {opp.school}</p>
      <p className="mt-2">{info}</p>
    </button>
  )
}