import { useEffect, useState } from "react";
import EvidenceCard from "../../../../components/cards/EvidenceCard";
import ContSubSelector from "../../../../components/UI/selectors/ContSubSelector";
import { saveCard } from "../../../../utils/firebase/firestore/cards.firestore";
import { useNavigate } from "react-router-dom";
import PublicPrivateSelector from "../../../../components/UI/selectors/PublicPrivateSelector";
import { ExclamationCircle } from "react-bootstrap-icons";
import { useQueryClient } from "react-query";

export default function CreateEvidencePage(){
  const navigate = useNavigate();
  const user = useQueryClient().getQueryData("currentUser") as User;

  const [errMsg, setErrMsg] = useState<"" | "Please fill all fields.">("");

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

  useEffect(() => {
    setErrMsg("");
  }, [card])

  return(
    <div className="w-full h-full flex">
      <div className="w-full md:w-1/2 lg:w-2/3 h-full p-4 flex flex-col space-y-4">
        <div className="flex flex-col space-y-4">
          <input type="text" 
          className="input text-text-light" 
          placeholder="Title"
          onChange={e => {
            setCard(old => ({...old, title: e.target.value}))
          }}
          />

          <ContSubSelector
          default={{contention: card.contention, subpoint: card.subpoint}}
          onChange={contsub => {
            setCard(old => ({...old, contention: contsub.contention, subpoint: contsub.subpoint}))
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

          <input 
          type="text" 
          className="input !text-lg" 
          placeholder="Source Link"
          onChange={e => {
            setCard(old => ({...old, sourceLink: e.target.value}))
          }}
          />
        </div>

        <textarea 
        className="input !h-full !text-lg resize-none"
        placeholder="Data (text evidence)"
        onChange={e => {
          setCard(old => ({...old, data: e.target.value}))
        }}
        />

        <textarea 
        className="input !h-full !text-lg resize-none"
        placeholder="Warrant (logical reasoning)"
        onChange={e => {
          setCard(old => ({...old, warrant: e.target.value}))
        }}
        />

      </div>
      <div className="relative hidden md:flex flex-col items-center justify-center md:w-1/2 lg:w-1/3 h-full p-4 pl-0">
        <h1 className="text-2xl text-evidence">Preview</h1>
        <div className="text-xl text-primary pb-2 flex space-x-2">
          <ExclamationCircle size={errMsg? 25 : 0} opacity={errMsg? 100 : 0}/>
          <div>{errMsg}</div>
        </div>
        <div className="h-1/2 w-full"><EvidenceCard card={card}/></div>
        <div className="flex flex-col space-y-4 mt-4">
          <PublicPrivateSelector
            default={card.isPublic}
            onChange={e => {
              setCard(old => ({...old, isPublic: e}))
          }}
          />
          <button className="button-evidence !w-32 text-text-light" onClick={() => {
            if(!card.data || !card.title || !card.sourceName || !card.sourceLink || !card.warrant){
              setErrMsg("Please fill all fields.");
              return;
            }
            const time = Date.now();
            saveCard({...card, createTime: time, lastEditTime: time})
            .then(() => navigate("/cards"))
          }}>Save Card</button>
        </div>
      </div>
    </div>
  )
}