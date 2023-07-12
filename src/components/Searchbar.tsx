import { Search } from "react-bootstrap-icons";

export default function Searchbar(){
  return(
    <div className="z-20 absolute top-4 right-4 left-4 text-text-light">
      <div className="background h-16 flex overflow-clip">
        <i className="center w-16 h-16 bg-inherit"><Search size={30}/></i>
        <input type="text" placeholder="Search" className=" w-full h-full bg-inherit pl-0 p-2 text-xl text-text-light placeholder:text-text-dark outline-none"/>
      </div>
    </div>
  )
}