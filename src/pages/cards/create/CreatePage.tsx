import { ReactNode } from "react";
import EvidenceCard from "../../../components/cards/EvidenceCard";
import { capitalize, colorFromType, dummyEvidenceCard, dummyQuoteCard, dummyRebuttalCard, dummyStatisticCard } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import RebuttalCard from "../../../components/cards/RebuttalCard";
import QuoteCard from "../../../components/cards/QuoteCard";
import StatisticCard from "../../../components/cards/StatisticCard";

export default function CreatePage(){
  return(
    <div className="w-full h-full p-4 flex flex-col space-y-4 overflow-auto">
      <NewCardSegment
      card={<EvidenceCard card={dummyEvidenceCard}/>}
      type="evidence"
      subtext="Evidence cards are best used to store data from reputable sources which strengthen some part of your claim. This data come from research, studies, professionals, educators, etc."
      />
      <NewCardSegment
      card={<RebuttalCard card={dummyRebuttalCard}/>}
      type="rebuttal"
      subtext="Evidence cards are best used to store data from reputable sources which strengthen some part of your claim. This data come from research, studies, professionals, educators, etc."
      />
      <NewCardSegment
      card={<QuoteCard card={dummyQuoteCard}/>}
      type="quote"
      subtext="Evidence cards are best used to store data from reputable sources which strengthen some part of your claim. This data come from research, studies, professionals, educators, etc."
      />
      <NewCardSegment
      card={<StatisticCard card={dummyStatisticCard}/>}
      type="statistic"
      subtext="Evidence cards are best used to store data from reputable sources which strengthen some part of your claim. This data come from research, studies, professionals, educators, etc."
      />
    </div>
  )
}

function NewCardSegment(props: {card: ReactNode, type: string, subtext: string}){
  const navigate = useNavigate();

  const {card, type, subtext} = props;
  const color = colorFromType(type);

  return(
    <div className="w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="w-full h-[50dvh]">{card}</div>
      <div className="flex flex-col space-y-4 w-full">
        <h1 className={`${color.text} text-2xl`}>Create new {type} card.</h1>
        <p className="text-text lg:w-3/4">{subtext}</p>
        <button 
        onClick={() => navigate(type)}
        className={`${color.button} text-text-extraLight !w-48 !h-10 !text-md`}
        >Create {capitalize(type)}</button>
      </div>
    </div>
  )
}