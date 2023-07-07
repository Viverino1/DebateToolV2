import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

export default function(){
  return(
    <BrowserRouter>
      <div className="w-full h-full">
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}