import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Sidebar from "./components/Sidebar";
import { auth } from "./utils/firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import CardsPage from "./pages/cards/CardsPage";
import { getCurrentUser } from "./utils/firebase/firestore/firestore";
import { useQuery } from "react-query";
import Loading from "./components/Loading";
import SettingsPage from "./pages/settings/SettingsPage";
import AuthPage from "./pages/auth/AuthPage";
import CasePage from "./pages/case/CasePage";
import RoundsPage from "./pages/rounds/RoundsPage";
import Redirect from "./pages/404/Redirect";

export default function App(){
  const location = useLocation().pathname;

  const [user, isAuthLoading] = useAuthState(auth);

  const {isLoading: isCurrentUserLoading, data: currentUser} = useQuery('currentUser', getCurrentUser, {enabled: user? true : false});
  if(isAuthLoading || isCurrentUserLoading){return <Loading/>}

  if(user && currentUser){
    return(
      <div className="flex">
        <Sidebar/>
        <div className="fixed top-0 right-0 left-22 bottom-0 h-screen">
          <Routes>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/cards" element={<CardsPage/>}/>
            <Route path="/case" element={<CasePage/>}/>
            <Route path="/rounds" element={<RoundsPage/>}/>

            <Route path="/settings" element={<SettingsPage/>}/>
            
            <Route path="/*" element={<Redirect to="/cards"/>}/>
          </Routes>
        </div>
      </div>
    )
  }else{
    if(location != "/auth"){window.history.replaceState(null, "", "/auth")}
    return(
      <Routes>
        <Route path="/*" element={<AuthPage/>}/>
      </Routes>
    )
  }
}