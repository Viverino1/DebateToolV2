import EvidenceCard from "../../../../components/cards/EvidenceCard";
import { dummyEvidenceCard } from "../../../../utils/helpers";

export default function CreateEvidencePage(){
  return(
    <div className="w-full h-full flex">
      <div className="bg-primary w-full sm:w-2/3 h-full"></div>
      <div className="bg-secondary w-1/3 h-full"></div>
    </div>
  )
}