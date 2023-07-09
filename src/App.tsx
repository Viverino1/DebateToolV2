import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/HomePage";
import Sidebar from "./components/Sidebar";
import { auth } from "./utils/firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import Auth from "./pages/auth/AuthPage";

export default function App(){
  const [user, isAuthLoading, error] = useAuthState(auth);

  if(isAuthLoading){return <div>Loading</div>}

  if(user){
    return(
      <div className="flex">
        <Sidebar/>
        <div className="fixed top-0 right-0 left-22 bottom-0 h-screen">
          <Routes>
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </div>
      </div>
    )
  }else{
    return(
      <Routes>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    )
  }
}