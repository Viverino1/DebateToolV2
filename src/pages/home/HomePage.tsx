import { getCurrentUser, getTopics } from "../../utils/firebase/firestore/firestore";
import { useQuery } from "react-query";

export default function Home(){
  const {isLoading: isCurrentUserLoading, data: currentUser} = useQuery('currentUser', getCurrentUser);

  return(
    <div>Home Page. Welcome, {currentUser?.email}</div>
  )
}