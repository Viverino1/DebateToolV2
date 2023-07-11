type Side = "AFF" | "NEG";
type Speaker = 1 | 2;

type User = {
  uid: string,
  teamID: string | null,
  email: string,
  photoURL: string,
  displayName: string,
  firstName: string,
  lastName: string,
  school: string,
  speaker: Speaker,
}

type School = {
  district: string,
  name: string,
}

type Card = {
  type: "evidence" | "quote" | "rebuttal" | "statistic",
  cardID: string,
  ownerUID: string,
  teamID: string | null,
  school: string,
  isPublic: boolean,
  createTime: number,
  lastEditTime: number,
  title: string,
  sourceName: string,
  sourceLink: string,
  warrant: string,
  data: string,
}

type Evidence = Card & {
  type: "evidence",
  contention: number,
  subpoint: number,
}

type Quote = Card & {
  type: "quote",
  contention: number,
  subpoint: number,
  quotee: string,
}

type Rebuttal = Card & {
  type: "rebuttal",
  accusation: string,
  counterClaim: string,
}

type Statistic = Card & {
  type: "statistic",
  contention: number,
  subpoint: number,
}

type AnyCard = Evidence | Rebuttal | Quote | Statistic