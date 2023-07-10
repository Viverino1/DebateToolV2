import { useQuery } from "react-query";
import { getCurrentUser } from "../../utils/firebase/firestore/firestore";
import { useEffect } from "react";

export default function CardsPage(){
  const {isLoading: isCurrentUserLoading, data: currentUser} = useQuery('currentUser', getCurrentUser);

  return(
    <div>{currentUser?.email}</div>
  )
}