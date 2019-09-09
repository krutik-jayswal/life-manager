export class Password {
  passwordId: number;
  name: string;
  description: string;
  password:string;
  key:string;
  constructor(passwordId: number, name: string,description: string,password:string,key:string) {
    this.passwordId=passwordId;
    this.name = name;
    this.description=description;
    this.password = password;
    this.key=key;
  }
}