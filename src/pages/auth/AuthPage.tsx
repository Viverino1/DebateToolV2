import { handleAuthClick, handleSignOutClick } from "../../utils/firebase/firebase";

export default function Auth(){
  return(
    <><button onClick={handleSignOutClick}>logout</button><button onClick={handleAuthClick}>login</button></>
  )
}