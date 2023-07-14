import { useQueryClient } from "react-query";
import UserSettings from "./components/UserSettings";
import CreateTeam from "./components/CreateTeam";

export default function SettingsPage(){
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("currentUser") as User;

  return(
    <div className="w-full h-full p-4 flex flex-col space-y-4 overflow-auto">
      <CreateTeam/>
      <UserSettings/>
    </div>
  )
}