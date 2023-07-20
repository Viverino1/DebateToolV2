import { useQueryClient } from "react-query";
import { saveContentions } from "../../../utils/firebase/firestore/team.firestore";
import { CaretDown, CaretUp, ThreeDotsVertical, Trash3 } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { getUniqueKey } from "../../../utils/helpers";

export default function CaseSettings(){
  const conts = (useQueryClient().getQueryData("team") as Team).contentions;

  useEffect(() => {console.log(conts)}, [conts]);

  const [contentions, setContentions] = useState(conts);
  
  useEffect(() => {setContentions(conts)}, [conts]);

  return(
    <div className="background w-full p-4 flex flex-col space-y-4">
      <h1 className="text-primary text-4xl">Case Settings</h1>
      {contentions.map((contention) => (
        contention.contentionID === "intro"? null: 
        contention.contentionID === "conclusion"? null : 
        <ContentionEditor 
        key={contention.contentionID} 
        contention={contention}
        setContentions={setContentions}
        />
      ))}

      <button 
      className="input !w-48"
      onClick={() => {
        setContentions((prev) => {
          const newContentions = [...prev];
          newContentions[prev.length - 1] = {
            name: "",
            index: prev.length - 1,
            subpoints: [],
            contentionID: getUniqueKey(),
          }

          newContentions[prev.length] = {
            name: "Conclusion",
            index: prev.length,
            subpoints: [],
            contentionID: "conclusion"
          }

          return newContentions;
        });
      }}
      >Add Contention</button>

      <button 
      className="!w-32 text-text-light !h-10 button-primary"
      onClick={() => {
        saveContentions(contentions);
      }}
      >Save</button>
    </div>
  )
}

function ContentionEditor(props: {contention: Contention, setContentions: React.Dispatch<React.SetStateAction<Contention[]>>}){
  const {contention, setContentions} = props;

  return(
    <div key={contention.contentionID}>
      <h2 className="text-xl text-text-light">Contention {contention.index}</h2>
      <div className="flex mt-1">
        <input 
        type="text" 
        className="input"
        placeholder={`Title of Contention ${contention.index}`}
        value={contention.name}
        onChange={(e) => {
          setContentions(prev => {
            const newContentions = [...prev];
            newContentions[contention.index].name = e.target.value;
            return newContentions;
          })
        }}
        />
        <div className="group flex ml-4">
          <div className="input !w-12 flex justify-center items-center">
            <ThreeDotsVertical size={30}/>
          </div>
          <div className="flex space-x-2 overflow-clip w-0 group-hover:w-40 transition group-hover:ml-2">
            <button className="input !w-12 flex justify-center items-center"
              onClick={() => {
                if(contention.index <= 1){return}
              
                setContentions(prev => {
                  const newContentions = [...prev];
                  newContentions[contention.index].index--;
                  newContentions[contention.index].index++;
                  newContentions.sort((a, b) => a.index - b.index);
                  return newContentions;
                })
              }}>
              <CaretUp size={30}/>
            </button>
            <button className="input !w-12 flex justify-center items-center"
            onClick={() => {
              setContentions(prev => {
                if(contention.index >= prev.length - 2){return prev}
                const newContentions = [...prev];
                newContentions[contention.index].index++;
                newContentions[contention.index].index--;
                newContentions.sort((a, b) => a.index - b.index);
                return newContentions;
              })
            }}>
              <CaretDown size={30}/>
            </button>
            <button className="input !w-12 flex justify-center items-center"
              onClick={() => {
                setContentions(prev => {
                  const newContentions = prev.filter(prevCont => prevCont.contentionID !== contention.contentionID);
                  newContentions.forEach((contention, i) => {
                    contention.index = i;
                  })
                  return newContentions;
                });
              }}>
              <Trash3 size={30}/>
            </button>
          </div>
        </div>
      </div>
      {contention.subpoints.map((subpoint, i) => (
        <div key={subpoint.subpointID} className="ml-20 mt-2">
          <h2 className="text-xl text-text-light">Subpoint {i + 1}</h2>
          <div className="flex mt-1">
            <input 
            type="text" 
            className="input"
            placeholder={`Title of Subpoint ${i + 1}`}
            value={subpoint.name}
            onChange={(e) => {
              setContentions(prev => {
                const newContentions = [...prev];
                newContentions[contention.index].subpoints[i].name = e.target.value;
                return newContentions;
              })
            }}
            />
            <div className="group flex ml-4">
              <div className="input !w-12 flex justify-center items-center">
                <ThreeDotsVertical size={30}/>
              </div>
              <div className="flex space-x-2 overflow-clip w-0 group-hover:w-40 transition group-hover:ml-2">
                <button className="input !w-12 flex justify-center items-center"
                  onClick={() => {
                    if(i <= 0) return;

                    setContentions(prev => {
                      const newContentions = [...prev];

                      [newContentions[contention.index].subpoints[i], newContentions[contention.index].subpoints[i-1]] = [newContentions[contention.index].subpoints[i-1], newContentions[contention.index].subpoints[i]];
                      console.table(newContentions[contention.index].subpoints)
                      return newContentions;
                    })
                  }}>
                  <CaretUp size={30}/>
                </button>
                <button className="input !w-12 flex justify-center items-center"
                onClick={() => {
                  setContentions(prev => {
                    if(i >= prev[contention.index].subpoints.length - 1) return prev;
                    const newContentions = [...prev];
                    [newContentions[contention.index].subpoints[i], newContentions[contention.index].subpoints[i+1]] = [newContentions[contention.index].subpoints[i+1], newContentions[contention.index].subpoints[i]];
                    console.table(newContentions[contention.index].subpoints)
                    return newContentions;
                  })
                }}>
                  <CaretDown size={30}/>
                </button>
                <button className="input !w-12 flex justify-center items-center"
                  onClick={() => {
                    setContentions(prev => {
                      var newContentions = [...prev];
                      newContentions[contention.index].subpoints = prev[contention.index].subpoints.filter(prevSub => prevSub.subpointID !== subpoint.subpointID)
                      return newContentions
                    });
                  }}>
                  <Trash3 size={30}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="ml-20 mt-4 input !w-48"
      onClick={() => {
        console.log("hi");
        setContentions(prev => {
          const newContentions = [...prev]
          newContentions[contention.index].subpoints[contention.subpoints.length] = {
            name: "",
            subpointID: getUniqueKey(),
          }
          return newContentions;
        })
      }}>Add Subpoint</button>
    </div>
  )
}