import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Sidebar from "./components/Sidebar";
import { auth } from "./utils/firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import Auth from "./pages/auth/AuthPage";
import CardsPage from "./pages/cards/CardsPage";
import { getCurrentUser } from "./utils/firebase/firestore/firestore";
import { useQuery } from "react-query";
import Loading from "./components/Loading";

export default function App(){
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
            <Route path="/auth" element={<Auth/>}/>
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