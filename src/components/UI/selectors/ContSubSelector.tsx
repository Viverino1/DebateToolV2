import { useEffect, useState } from "react";
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom";

export default function ContSubSelector(props: {onChange: (contSub: {contentionID: string | null, subpointID: string | null}) => void, default?: {contentionID: string | null, subpointID: string | null}}){
  const navigate = useNavigate();

  const team = useQueryClient().getQueryData('team') as Team;
  const contentions = team?.contentions;

  const [activeCont, setActiveCont] = useState(props.default?.contentionID?? null);
  const [activeSub, setActiveSub] = useState(props.default?.subpointID?? null);

  useEffect(() => {props.onChange({contentionID: activeCont?? null, subpointID: activeSub?? null})}, [activeCont, activeSub]);

  return(
    <div className="relative w-full h-fit flex space-x-4">
      <select className="input select"
      value={activeCont?? ""}
      onChange={e => {
        setActiveCont(e.target.value)
      }}>
        <option value="">No Contention</option>
        {contentions?.map(contention => (
          <option key={contention.contentionID} value={contention.contentionID}>{
            contention.contentionID == "intro"? "Intro" :
            contention.contentionID == "conclusion"? "Conclusion" :
            `Contention ${contention.index}`
          }</option>
        ))}
      </select>
      <select className="input"
      value={activeSub?? ""}
      onChange={e => {
        setActiveSub(e.target.value)
      }}>
        <option value="">No Subpoint</option>
        {contentions? (contentions[contentions.filter(contention => contention.contentionID == activeCont)[0]?.index?? 0].subpoints).map((subpoint, index) => (
          <option key={subpoint.subpointID} value={subpoint.subpointID}>Subpoint {index+1}</option>
        )) : null}
      </select>

      <div className="absolute right-0 rounded !backdrop-blur-[2px] z-30 w-full h-full background-light text-lg flex justify-center items-center overflow-clip">Create a <span onClick={() => navigate("/settings")}>team</span> to manage Contentions and Subpoints</div>
    </div>
  )
}