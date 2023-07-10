type Side = "AFF" | "NEG";

type User = {
  uid: string,
  teamID: string,
  email: string,
  photoURL: string,
  displayName: string,
  firstName: string,
  lastName: string,
  school: string,
  speaker: number,
}

type School = {
  district: string,
  name: string,
}