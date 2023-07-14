import { useQueryClient } from "react-query";
import SpeakerSelector from "../../../components/UI/selectors/SpeakerSelector";
import { handleSignOutClick } from "../../../utils/firebase/firebase";
import { saveUser } from "../../../utils/firebase/firestore/firestore";

export default function UserSettings(){
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('currentUser') as User;

  return(
    <div className="background w-full p-4 flex flex-col space-y-4">
      <div>
        <h1 className="text-primary text-4xl">User Settings</h1>
        <div className="text-lg text-text-light">{user.email}</div>
        <button className="!w-32 text-text-light !h-10 !p-0 input mt-1" onClick={handleSignOutClick}>Sign Out</button>
      </div>

      <div>
        <h2 className="text-xl text-text-light">Display Name</h2>
        <input 
        type="text" 
        className="input mt-1"
        placeholder="Display Name"
        defaultValue={user.displayName}
        onChange={e => user.displayName = e.target.value}
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
          onChange={e => user.firstName = e.target.value}
          />
          <input 
          type="text" 
          className="input mt-1"
          placeholder="Last Name"
          defaultValue={user.lastName}
          onChange={e => user.lastName = e.target.value}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl text-text-light">Speaker</h2>
        <div className="w-32 mt-1">
          <SpeakerSelector
          default={user.speaker}
          onChange={e => user.speaker = e}
          />
        </div>
      </div>
      <button 
      className="!w-32 text-text-light !h-10 button-primary"
      onClick={() => {
        queryClient.setQueryData("currentUser", user);
        saveUser(user);
      }}
      >Save</button>
    </div>
  )
}