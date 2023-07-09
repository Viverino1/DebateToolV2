export default function Background(){
  return(
    <div className="absolute z-10 w-full h-full flex justify-center items-center">
      <div className="opacity-50
      w-[50vh] aspect-square animate-background rounded-full
      bg-gradient-to-r from-primary from-20% to-amber-500
      "></div>
    </div>
  )
}