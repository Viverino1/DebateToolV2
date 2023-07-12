function contsub(c: Contention, s: Subpoint){
  switch(c){
    case null: return null;
    case "intro": return "Intro"
    case "conclusion": return "Conclusion"
    default: switch(s){
      case null: return `Contention ${c}`
      default: return `Contention ${c} Subpoint ${s}`
    }
  }
}

export {
  contsub,
}