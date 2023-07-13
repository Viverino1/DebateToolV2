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
    case "evidence": return {bg: "bg-evidence", text: "text-evidence", glow: "glow-evidence", button: "button-evidence"};
    case "rebuttal": return {bg: "bg-rebuttal", text: "text-rebuttal", glow: "glow-rebuttal", button: "button-rebuttal"};
    case "quote": return {bg: "bg-quote", text: "text-quote", glow: "glow-quote", button: "button-quote"};
    case "statistic": return {bg: "bg-statistic", text: "text-statistic", glow: "glow-statistic", button: "button-statistic"};
    default: return {bg: "bg-primary", text: "text-primary", glow: "glow-primary", button: "button-primary"}
  }
}

const dummyEvidenceCard: Evidence = {
  type: "evidence",
  cardID: "DUMMY-EVIDENCE-CARD",
  ownerUID: "DUMMY-USER",
  teamID: null,
  school: "DUMMY-SCHOOL",
  isPublic: true,
  createTime: 23250,
  lastEditTime: 90210,
  title: "The earth is warming at an exponential rate.",
  sourceName: "NASA",
  sourceLink: "https://climate.nasa.gov/evidence/#:~:text=Ice%20cores%20drawn%20from%20Greenland,and%20layers%20of%20sedimentary%20rocks.",
  data: "Ice cores drawn from Greenland, Antarctica, and tropical mountain glaciers show that Earth’s climate responds to changes in greenhouse gas levels. Ancient evidence can also be found in tree rings, ocean sediments, coral reefs, and layers of sedimentary rocks. This ancient, or paleoclimate, evidence reveals that current warming is occurring roughly 10 times faster than the average rate of warming after an ice age. Carbon dioxide from human activities is increasing about 250 times faster than it did from natural sources after the last Ice Age.",
  warrant: "This piece of evidence from NASA proves just how harmfull climate change has become over time. The seemingly miniscule effects of this phenomena compound quickly over time. This leaves our world vulnerable to climate disasters and worse problems.",
  contention: 3,
  subpoint: 1,
}

const dummyRebuttalCard: Rebuttal = {
  type: "rebuttal",
  cardID: "DUMMY-REBUTTAL-CARD",
  ownerUID: "DUMMY-USER",
  teamID: null,
  school: "DUMMY-SCHOOL",
  isPublic: true,
  createTime: 23250,
  lastEditTime: 90210,
  title: "Money against climate change.",
  accusation: "Action against climate change is a pricey endeavor.",
  counterClaim: "Action against climate change must be taken despite the cost associated with it.",
  data: "by 2100, global GDP could be 37% lower than it would be without the impacts of warming, when taking the effects of climate change on economic growth into account. Without accounting for lasting damages - excluded from most estimates - GDP would be around 6% lower, meaning the impacts on growth may increase the economic costs of climate change by a factor of six. Yet, there is still considerable uncertainty about how much climate damages continue to affect long-term growth and how far societies can adapt to reduce these damages; depending on how much growth is affected, the economic costs of warming this century could be up to 51% of global GDP.",
  warrant: "These numbers show that climate inaction could be even worse than active action against climate change. If we do nothing, the economy, the climate, and the people of our world will continue to suffer. Not only this, but from an economic standpoint, it is more beneficial to invest in saving our planet because if we do not, the economy will only suffer. The costs for climate change are a small price to pay for the disasters it avoids.",
  sourceName: "University College London",
  sourceLink: "https://www.ucl.ac.uk/news/2021/sep/economic-cost-climate-change-could-be-six-times-higher-previously-thought",
}

const dummyQuoteCard: Quote = {
  type: "quote",
  cardID: "DUMMY-QUOTE-CARD",
  ownerUID: "DUMMY-USER",
  teamID: null,
  school: "DUMMY-SCHOOL",
  isPublic: true,
  createTime: 23250,
  lastEditTime: 90210,
  title: "Gandhi Quote",
  data: "Earth provides enough to satisfy every man's needs, but not every man's greed.",
  quotee: "Mahatma Gandhi",
  contention: "intro",
  subpoint: null,
  sourceName: "A-Z Quotes",
  sourceLink: "https://www.azquotes.com/author/5308-Mahatma_Gandhi/tag/environment",
  warrant: "These words from Mahatma Gandhi represent our stance on this topic. The earth does not provide, nor can it withstand, the greed of mankind."
}

const dummyStatisticCard: Statistic = {
  type: "statistic",
  cardID: "DUMMY-STATISTIC-CARD",
  ownerUID: "DUMMY-USER",
  teamID: null,
  school: "DUMMY-SCHOOL",
  isPublic: true,
  createTime: 23250,
  lastEditTime: 90210,
  title: "Human impact on climate change",
  data: "Carbon dioxide from human activities is increasing about 250 times faster than it did from natural sources after the last Ice Age.",
  contention: 2,
  subpoint: 3,
  warrant: "Human activities are the primary drivers for climate change. History has not seen anything as harmfull as humans since the last ice age. Humans must slow and stop their harm to the planet before we trigger climate disasters.",
  sourceName: "NASA",
  sourceLink: "https://climate.nasa.gov/evidence/",
}

export {
  contsub,
  capitalize,
  colorFromType,
  dummyEvidenceCard,
  dummyRebuttalCard,
  dummyQuoteCard,
  dummyStatisticCard,
}