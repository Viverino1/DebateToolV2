import { Search } from "react-bootstrap-icons";

export default function Searchbar(props: {onChange: (query: string) => void}){
  return(
    <div className="z-20 absolute top-4 right-4 left-4 text-text-light">
      <div className="background h-16 flex overflow-clip">
        <i className="center w-16 h-16 bg-inherit"><Search size={30}/></i>
        <input type="text" placeholder="Search" onChange={e => props.onChange(e.target.value)} className=" w-full h-full bg-inherit pl-0 p-2 text-xl text-text-light placeholder:text-text-dark outline-none"/>
      </div>
    </div>
  )
}