import SpeakerSelector from "../../components/UI/selectors/SpeakerSelector";
import { queryClient } from "../../main";
import { handleSignOutClick } from "../../utils/firebase/firebase";

export default function UserSettings(){
  const user = queryClient.getQueryData('currentUser') as User;

  return(
    <div className="background w-full p-4 flex flex-col space-y-4">
      <h1 className="text-primary text-4xl">User Settings</h1>

      <div>
        <h2 className="text-xl text-text-light">Display Name</h2>
        <input 
        type="text" 
        className="input mt-1"
        placeholder="Display Name"
        defaultValue={user.displayName}
        />
      </div>

      <div>
        <h2 className="text-xl text-text-light">Name</h2>
        <div className="flex space-x-4">
          <input 
          type="text" 
          className="input mt-1"
          placeholder="First Name"
          defaultValue={user.firstName}
          />
          <input 
          type="text" 
          className="input mt-1"
          placeholder="Last Name"
          defaultValue={user.lastName}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl text-text-light">Speaker</h2>
        <div className="w-32 mt-1">
          <SpeakerSelector
          default={user.speaker}
          onChange={() => {}}
          />
        </div>
      </div>
      <button className="!w-32 text-text-light !h-10 button-primary" onClick={handleSignOutClick}>Sign Out</button>
    </div>
  )
}