import { useState } from "react";
import EvidenceCard from "../../../../components/cards/EvidenceCard";
import { dummyEvidenceCard } from "../../../../utils/helpers";
import { getCurrentUser } from "../../../../utils/firebase/firestore/firestore";
import { useQuery } from "react-query";
import { queryCache, queryClient } from "../../../../main";

export default function CreateEvidencePage(){
  const user = queryClient.getQueryData('currentUser') as User;

  const [card, setCard] = useState<Evidence>({
    type: "evidence",
    cardID: "",
    ownerUID: user.uid,
    teamID: user.teamID,
    school: user.school,
    isPublic: false,
    createTime: 0,
    lastEditTime: 0,
    title: "",
    sourceName: "",
    sourceLink: "",
    data: "",
    warrant: "",
    contention: null,
    subpoint: null,
  });

  return(
    <div className="w-full h-full flex">
      <div className="w-full md:w-1/2 lg:w-2/3 h-full p-4 flex flex-col space-y-4">
        <input type="text" 
        className="input text-text-light" 
        placeholder="Title"
        onChange={e => {
          setCard(old => ({...old, title: e.target.value}))
        }}
        />

        <input 
        type="text" 
        className="input !text-lg" 
        placeholder="Source Name"
        onChange={e => {
          setCard(old => ({...old, sourceName: e.target.value}))
        }}
        />
        
      </div>
      <div className="hidden md:flex items-center md:w-1/2 lg:w-1/3 h-full p-4">
        <div className="h-1/2 w-full"><EvidenceCard card={card}/></div>
      </div>
    </div>
  )
}