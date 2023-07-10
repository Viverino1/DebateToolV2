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