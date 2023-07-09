import { getTopics } from "../../utils/firebase/firestore/firestore";
import { useAppSelector } from "../../utils/redux/hooks"
import { useQuery } from "react-query";

export default function Home(){
  const {isLoading, error, data: topics} = useQuery('topics', getTopics)

  return(
    <div>{topics?.map((t) => (<div key={t}>{t}</div>))}</div>
  )
}