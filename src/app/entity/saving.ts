export class Saving {
  savingId: number;
  name: string;
  amount: number;
  type: string;
  accountNumber: string;
  returnOfInterest: number;
  accountId:number;
  account:string;
  createdDate:Date;
  maturityDate:Date;
  maturityAmount:number;
  
  constructor(id: number, name: string, amount: number, type: string, accountNumber: string, returnOfInterest: number,account:string,accountId:number,createdDate:Date,maturityDate:Date,maturityAmount:number) {
    this.amount = amount;
    this.savingId = id;
    this.name = name;
    this.type = type;
    this.accountNumber = accountNumber;
    this.returnOfInterest = returnOfInterest;
    this.account=account;
    this.accountId=accountId;
    this.createdDate=createdDate;
    this.maturityDate=maturityDate; 
    this.maturityAmount=maturityAmount;
  }

  toString(){
    return this.name;
  }
}