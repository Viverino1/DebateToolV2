import { useQuery } from "react-query"
import { getUserByUID } from "../utils/firebase/firestore/firestore"
import { EnvelopeAt, Megaphone, Mortarboard } from "react-bootstrap-icons";

export default function UserProfile(props: {uid: string}){
  const {data: user, isLoading} = useQuery(props.uid, () => getUserByUID(props.uid));

  if(isLoading) return <div>Loading</div>

  return(
    <div className="background !w-fit p-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <img src={user?.photoURL} className="w-16 p-0.5 aspect-square rounded-full border-2 border-text/50"/>
        <div>
          <h1 className="text-2xl  text-text-light font-bold">{user?.displayName}</h1>
          <h2 className="text-base text-text">{user?.firstName} {user?.lastName}</h2>
        </div>
      </div>
    <div className="h-0.5 w-full flex">
    <div className="w-1/2 h-full bg-gradient-to-l from-50% from-background-light"></div>
      <div className="w-1/2 h-full bg-gradient-to-r from-50% from-background-light"></div>
    </div>
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-4 items-center">
          <i><Mortarboard size={30}/></i>
          <h3>{user?.school}</h3>
        </div>
        <div className="flex space-x-4 items-center">
          <i><Megaphone size={30}/></i>
          <h3>Speaker {user?.speaker}</h3>
        </div>

        <div className="flex space-x-4 items-center">
          <i><EnvelopeAt size={30}/></i>
          <h3>{user?.email}</h3>
        </div>
      </div>
    </div>
  )
}