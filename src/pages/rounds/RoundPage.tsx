import TextBox from "../../utils/tiptap/TextBox";
import Timer from "./compnents/Timer";

export default function RoundPage(){
  const speeches: {name: string, duration: string}[] = [
    {name: "AFF Opening", duration: "04:08"},
    {name: "NEG Opening", duration: "04:12"},
    {name: "First Crossfire", duration: "03:04"},
    {name: "AFF Rebuttal", duration: "03:59"},
    {name: "NEG Rebuttal", duration: "current"},
    {name: "Second Crossfire", duration: ""},
    {name: "AFF Summary", duration: ""},
    {name: "NEG Summary", duration: ""},
    {name: "Grand Crossfire", duration: ""},
    {name: "AFF Final Focus", duration: ""},
    {name: "NEG Final Focus", duration: ""},
  ]
  
  return(
    <div className="w-full h-full flex p-4 space-x-4">
      <div className="h-full w-[calc(100vw-472px)]">
        <TextBox/>
      </div>
      <div className="flex flex-col space-y-4 w-96 h-full">
        <div className="w-full h-fit background p-4 text-center">
          <div className="text-text text-base ">Pattonville Round 3</div>
          <div className="text-text-light text-3xl font-bold">NEG Rebuttal</div>
        </div>
        <Timer time={1000*60*4}/>
        <div>
          <div className="w-full h-52 overflow-auto p-4 background flex flex-col space-y-4 snap-y pr-2">
            {speeches.map((speech, index) => (
              <button 
              id={`speech${index}`} key={speech.name} 
              className="w-full input flex justify-between snap-center"
              onClick={() => handleScroll(`speech${index}`)}
              >
                <span>{speech.name}</span>
                <span>{speech.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function handleScroll(id: string){
  const element = document.getElementById(id);
  if (element) {
    // 👇 Will scroll smoothly to the top of the next section
    element.scrollIntoView({ behavior: 'smooth' });
  }
}