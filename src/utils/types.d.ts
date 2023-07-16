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

type Contention = string | null;
type Subpoint = string | null;
type ContSub = {contention: Contention, subpoint: Subpoint}

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
  contention: Contention,
  subpoint: Subpoint,
}

type Quote = Card & {
  type: "quote",
  contention: Contention,
  subpoint: Subpoint,
  quotee: string,
}

type Rebuttal = Card & {
  type: "rebuttal",
  accusation: string,
  counterClaim: string,
}

type Statistic = Card & {
  type: "statistic",
  contention: Contention,
  subpoint: Subpoint,
}

type TeamPermission = "owner" | "member" | "viewer"

type Team = {
  teamID: string,
  teamName: string,
  contentions: [];
  members: {[key: string]: {memberSince: number, permission: TeamPermission}}
  invites: {[key: string]: {inviteTime: number, permission: TeamPermission}}
}

type AnyCard = (Evidence | Rebuttal | Quote | Statistic) & {contention?: Contention, subpoint?: Subpoint};