import { useNavigate } from "react-router-dom"

export default function RoundsPage(){
  const navigate = useNavigate();
  return(
    <button className="input !w-48" onClick={() => navigate("id")}>Rounds Page</button>
  )
}