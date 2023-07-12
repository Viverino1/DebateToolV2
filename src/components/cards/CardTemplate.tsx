import { ReactNode } from "react";

export default function CardTemplate(props: {children: ReactNode, type: string}){
  const {type, children} = props

  return(
    <div className="relative full rounded overflow-clip">
      <div className="absolute z-0 full overflow-clip">
        <div className={`half rounded-full -translate-x-1/2 -translate-y-1/2 bg-${type}`}></div>
      </div>
      <div className="absolute background full z-10 !backdrop-blur-3xl">
        <div className="relative">
        </div>
      </div>
    </div>
  )
}