import { useEffect, useState } from "react";
import EvidenceCard from "../../../../components/cards/EvidenceCard";
import { saveCard } from "../../../../utils/firebase/firestore/cards.firestore";
import { useNavigate } from "react-router-dom";
import PublicPrivateSelector from "../../../../components/UI/selectors/PublicPrivateSelector";
import { ExclamationCircle } from "react-bootstrap-icons";
import { useQueryClient } from "react-query";
import ContSubSelector from "../../../../components/UI/selectors/ContSubSelector";

export default function CreateEvidencePage(props: { editCard?: Evidence }) {
  const navigate = useNavigate();
  const user = useQueryClient().getQueryData("currentUser") as User;

  const [errMsg, setErrMsg] = useState<"" | "Please fill all fields.">("");

  const [isSaving, setIsSaving] = useState(false);

  const [card, setCard] = useState<Evidence>(
    props.editCard ?? {
      type: "evidence",
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
      contSub: {
        contentionID: null,
        subpointID: null,
      },
    }
  );

  useEffect(() => {
    setErrMsg("");
  }, [card]);

  return (
    <div className="flex relative w-full h-full">
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 w-full h-full backdrop-blur-sm z-20 transition opacity-0 flex justify-center items-center ${
          isSaving ? "opacity-100" : "pointer-events-none"
        }`}
      >
        <div className="!backdrop-blur-3xl flex flex-col justify-center items-center animate-pulse">
          <img src="/DebateToolLogo.svg" className="w-48 aspect-square" />
          <div className="text-2xl">Saving Card...</div>
        </div>
      </div>

      <div className="h-screen w-full flex flex-col p-4 space-y-4">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            className="input text-text-light"
            placeholder="Title"
            value={card.title}
            onChange={(e) => {
              setCard((old) => ({ ...old, title: e.target.value }));
            }}
          />

          <ContSubSelector
            default={card.contSub}
            onChange={(contSub) => {
              setCard((old) => ({
                ...old,
                contSub: {
                  contentionID: contSub.contentionID,
                  subpointID: contSub.subpointID,
                },
              }));
            }}
          />

          <input
            value={card.sourceName}
            type="text"
            className="input !text-lg"
            placeholder="Source Name"
            onChange={(e) => {
              setCard((old) => ({ ...old, sourceName: e.target.value }));
            }}
          />

          <input
            value={card.sourceLink}
            type="text"
            className="input !text-lg text-evidence"
            placeholder="Source Link"
            onChange={(e) => {
              setCard((old) => ({ ...old, sourceLink: e.target.value }));
            }}
          />
        </div>

        <div className="h-full w-full space-y-4 pb-4">
          <textarea
            value={card.data}
            className="input flex !h-1/2 !text-lg resize-none"
            placeholder="Data (text evidence)"
            onChange={(e) => {
              setCard((old) => ({ ...old, data: e.target.value }));
            }}
          />

          <textarea
            value={card.warrant}
            className="input flex !h-1/2 !text-lg resize-none"
            placeholder="Warrant (logical reasoning)"
            onChange={(e) => {
              setCard((old) => ({ ...old, warrant: e.target.value }));
            }}
          />
        </div>

        <div className="w-full flex md:hidden justify-center space-x-4">
          <PublicPrivateSelector
            default={card.isPublic}
            onChange={(e) => {
              setCard((old) => ({ ...old, isPublic: e }));
            }}
          />
          <button className="button-evidence !w-32 text-text-light">
            Save Card
          </button>
        </div>
      </div>

      <div className="relative opacity-0 md:opacity-100 w-0 md:w-[600px] flex flex-col items-center justify-center h-full p-4 pl-0">
        <h1 className="text-2xl text-evidence">Preview</h1>
        <div className="text-xl text-primary pb-2 flex space-x-2">
          <ExclamationCircle
            size={errMsg ? 25 : 0}
            opacity={errMsg ? 100 : 0}
          />
          <div>{errMsg}</div>
        </div>
        <div className="h-1/2 w-full">
          <EvidenceCard card={card} />
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <PublicPrivateSelector
            default={card.isPublic}
            onChange={(e) => {
              setCard((old) => ({ ...old, isPublic: e }));
            }}
          />
          <button
            className="button-evidence !w-32 text-text-light"
            onClick={() => {
              if (
                !card.data ||
                !card.title ||
                !card.sourceName ||
                !card.sourceLink ||
                !card.warrant
              ) {
                setErrMsg("Please fill all fields.");
                return;
              }
              setIsSaving(true);
              saveCard(card).then(() => {
                navigate("/cards");
              });
            }}
          >
            Save Card
          </button>
        </div>
      </div>
    </div>
  );
}
