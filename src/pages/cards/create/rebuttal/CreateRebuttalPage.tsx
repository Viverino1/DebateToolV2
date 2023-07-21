import { useEffect, useState } from "react";
import { saveCard } from "../../../../utils/firebase/firestore/cards.firestore";
import { useNavigate } from "react-router-dom";
import PublicPrivateSelector from "../../../../components/UI/selectors/PublicPrivateSelector";
import { ExclamationCircle } from "react-bootstrap-icons";
import { useQueryClient } from "react-query";
import RebuttalCard from "../../../../components/cards/RebuttalCard";

export default function CreateRebuttal(props: {editCard?: Rebuttal}){
  const navigate = useNavigate();
  const user = useQueryClient().getQueryData("currentUser") as User;

  const [errMsg, setErrMsg] = useState<"" | "Please fill all fields.">("");

  const [isSaving, setIsSaving] = useState(false);

  const [card, setCard] = useState<Rebuttal>(props.editCard?? {
    type: "rebuttal",
    cardID: "",
    ownerUID: user.uid,
    school: user.school,
    isPublic: false,
    createTime: 0,
    lastEditTime: 0,
    title: "",
    sourceName: "",
    sourceLink: "",
    data: "",
    warrant: "",
    accusation: "",
    counterClaim: "",
  });

  useEffect(() => {
    setErrMsg("");
  }, [card])

  return(
    <div className="relative w-full h-full flex">
      <div className={`absolute top-0 bottom-0 left-0 right-0 w-full h-full backdrop-blur-sm z-20 transition opacity-0 flex justify-center items-center ${isSaving? "opacity-100" : "pointer-events-none"}`}>
        <div className="!backdrop-blur-3xl flex flex-col justify-center items-center animate-pulse">
          <img src="/DebateToolLogo.svg" className="w-48 aspect-square"/>
          <div className="text-2xl">Saving Card...</div>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-2/3 h-full p-4 flex flex-col space-y-4">
        <div className="flex flex-col space-y-4">
          <input type="text" 
          className="input text-text-light" 
          placeholder="Title"
          value={card.title}
          onChange={e => {
            setCard(old => ({...old, title: e.target.value}))
          }}
          />

          <input 
          value={card.sourceName}
          type="text" 
          className="input !text-lg" 
          placeholder="Source Name"
          onChange={e => {
            setCard(old => ({...old, sourceName: e.target.value}))
          }}
          />

          <input 
          value={card.sourceLink}
          type="text" 
          className="input !text-lg text-rebuttal" 
          placeholder="Source Link"
          onChange={e => {
            setCard(old => ({...old, sourceLink: e.target.value}))
          }}
          />

          <input 
          value={card.accusation}
          type="text" 
          className="input !text-lg" 
          placeholder="Accusation (opponents words)"
          onChange={e => {
            setCard(old => ({...old, accusation: e.target.value}))
          }}
          />
  
          <input 
          value={card.counterClaim}
          type="text" 
          className="input !text-lg" 
          placeholder="Counter Claim"
          onChange={e => {
            setCard(old => ({...old, counterClaim: e.target.value}))
          }}
        />
        </div>

        <textarea 
        value={card.data}
        className="input !h-full !text-lg resize-none"
        placeholder="Data (text evidence)"
        onChange={e => {
          setCard(old => ({...old, data: e.target.value}))
        }}
        />

        <textarea 
        value={card.warrant}
        className="input !h-full !text-lg resize-none"
        placeholder="Warrant (logical reasoning)"
        onChange={e => {
          setCard(old => ({...old, warrant: e.target.value}))
        }}
        />

        <div className="w-full flex md:hidden justify-center space-x-4">
          <PublicPrivateSelector
            default={card.isPublic}
            onChange={e => {
              setCard(old => ({...old, isPublic: e}))
          }}
          />
          <button className="button-rebuttal !w-32 text-text-light">Save Card</button>
          </div>
      </div>
      
      <div className="relative hidden md:flex flex-col items-center justify-center md:w-1/2 lg:w-1/3 h-full p-4 pl-0">
        <h1 className="text-2xl text-rebuttal">Preview</h1>
        <div className="text-xl text-primary pb-2 flex space-x-2">
          <ExclamationCircle size={errMsg? 25 : 0} opacity={errMsg? 100 : 0}/>
          <div>{errMsg}</div>
        </div>
        <div className="h-1/2 w-full"><RebuttalCard card={card}/></div>
        <div className="flex flex-col space-y-4 mt-4">
          <PublicPrivateSelector
            default={card.isPublic}
            onChange={e => {
              setCard(old => ({...old, isPublic: e}))
          }}
          />
          <button className="button-rebuttal !w-32 text-text-light" onClick={() => {
            if(!card.data || !card.title || !card.sourceName || !card.sourceLink || !card.warrant){
              setErrMsg("Please fill all fields.");
              return;
            }
            setIsSaving(true);
            saveCard(card)
            .then(() => {navigate("/cards")})
          }}>Save Card</button>
        </div>
      </div>
    </div>
  )
}