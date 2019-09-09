export class User{

    id:number;
    username:string;
    password:string;
    email:string;

    constructor(userName:string,password:string) {
            this.username=userName;
            this.password=password;
    }

}