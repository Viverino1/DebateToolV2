import { useQueryClient } from "react-query";

export default function CaseSettings(){
  const team = useQueryClient().getQueryData("team") as Team;

  return(
    <div className="background w-full p-4 flex flex-col space-y-4">
      <h1 className="text-primary text-4xl">Case Settings</h1>
      {[0, 1].map((contention, index) => (
        <div key={index}>
          <h2 className="text-xl text-text-light">Contention {index}</h2>
          <input 
          type="text" 
          className="input mt-1"
          placeholder={`Contention ${index}`}
          defaultValue={contention}
          />
        </div>
      ))}
      <button className="input !w-48">Add Contention</button>
    </div>
  )
}