import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Sidebar from "./components/Sidebar";

export default function App(){
  return(
    <BrowserRouter>
      <div className="relative flex w-full h-full bg-background-dark text-text">
        <Sidebar/>
        <div className="z-10 backdrop-blur-[200px] w-full h-full">
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}