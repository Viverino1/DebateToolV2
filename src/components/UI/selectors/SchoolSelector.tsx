import { useQuery } from "react-query"
import { getSchools } from "../../../utils/firebase/firestore/firestore";

export default function SchoolSelector(props: {onChange: (school: string) => void, default?: string}){
  const {data: schools, isLoading} = useQuery("schools", getSchools);

  if(isLoading){return <div className="input animate-pulse">Loading Schools...</div>}

  return(
    <select className="input" defaultValue={props.default?? ""} onChange={(e) => props.onChange(e.target.value)}>
      <option value="" disabled hidden>Select Your School</option>
      {schools?.map(school => (
        <option key={school.name} value={school.name}>{school.name} - {school.district}</option>
      ))}
    </select>
  )
}