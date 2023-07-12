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

function capitalize(text: string){
  return text[0].toUpperCase() + text.slice(1);
}

function colorFromType(type: string){
  switch(type){
    case "evidence": return {bg: "bg-evidence", text: "text-evidence"};
    case "rebuttal": return {bg: "bg-rebuttal", text: "text-rebuttal"};
    case "quote": return {bg: "bg-quote", text: "text-quote"};
    case "statistic": return {bg: "bg-statistic", text: "text-statistic"};
    default: return {bg: "bg-primary", text: "text-primary"}
  }
}

export {
  contsub,
  capitalize,
  colorFromType,
}