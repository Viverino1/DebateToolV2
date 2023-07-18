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

type Contention = {
  contentionID: string,
  index: number,
  name: string,
  subpoints: Subpoint[],
}

type Subpoint = {
  subpointID: string,
  name: string,
}

type ContSub = {
  contentionID: string | null,
  subpointID: string | null,
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
  contSub: ContSub,
}

type Quote = Card & {
  type: "quote",
  contSub: ContSub,
  quotee: string,
}

type Rebuttal = Card & {
  type: "rebuttal",
  accusation: string,
  counterClaim: string,
}

type Statistic = Card & {
  type: "statistic",
  contSub: ContSub,
}

type TeamPermission = "owner" | "member" | "viewer";

type Team = {
  teamID: string,
  teamName: string,
  contentions: Contention[];
  members: {[key: string]: {memberSince: number, permission: TeamPermission}}
  invites: {[key: string]: {inviteTime: number, permission: TeamPermission}}
}

type AnyCard = (Evidence | Rebuttal | Quote | Statistic) & {contention?: Contention, subpoint?: Subpoint};