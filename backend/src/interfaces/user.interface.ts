export interface User {
  name: string;
  email: string;
}

export interface UnitUser extends User {
  entityId: string;
}

//ToDo: need to find it's purpose
// export interface Users {
//   [key: string]: UnitUser;
// }
