function contsub(c: Contention, s: Subpoint){
  switch(c){
    case null: return null;
    case "intro": return "Intro"
    case "conclusion": return "Conclusion"
    default: switch(s){
      case null: return `C${c}`
      default: return `C${c}, S${s}`
    }
  }
}

export {
  contsub,
}