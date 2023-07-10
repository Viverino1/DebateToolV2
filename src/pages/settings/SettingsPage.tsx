import { handleSignOutClick } from "../../utils/firebase/firebase";

export default function SettingsPage(){
  return(
    <button className="w-32 h-10 background m-4" onClick={handleSignOutClick}>Sign Out</button>
  )
}