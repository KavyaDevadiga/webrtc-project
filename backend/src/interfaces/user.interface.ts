export interface User {
  name: string;
  age: number;
}

export interface UnitUser extends User {
  id: number;
}

// export interface Users {
//   [key: string]: UnitUser;
// }
