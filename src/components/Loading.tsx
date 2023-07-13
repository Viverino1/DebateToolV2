export default function Loading(){
  return (
    <div className="w-full h-full bg-background-dark center flex-col animate-pulse">
      <img src="/DebateToolLogo.svg" className="h-1/2 aspect-square" alt="Debate Tool logo"/>
      <h1 className="text-6xl">Debate Tool</h1>
      <div className="text-3xl">Loading...</div>
    </div>
  )
}