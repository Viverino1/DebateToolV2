import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Background from "./components/Background";

export default function(){
  return(
    <BrowserRouter>
      <div className="relative w-full h-full bg-background text-text">
        <Background/>
        <div className="absolute z-10">
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}