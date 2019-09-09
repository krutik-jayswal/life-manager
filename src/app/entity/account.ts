export class Account{
    accountId:string;
    name:string;
    balance:number;
    type:string;

    constructor(accountId:string,name:string,balance:number,type:string){
        this.name=name;
        this.accountId=accountId;
        this.balance=balance;
        this.type=type;
    }
}