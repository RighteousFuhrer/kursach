// export default class Users {
//   email: string;
//   password: string;
//   username: string;
//   id: string = "";

//   constructor(email: string, password: string, username: string) {
//     this.email = email;
//     this.password = password;
//     this.username = username;
//   }
// }

export default class User {
  fname: string;
  sname: string;
  id: string = "";

  constructor(fname: string, sname: string) {
    this.fname = fname;
    this.sname = sname;
  }
}
