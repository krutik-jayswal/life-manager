export class Stock {
  stockId: number;
  name: string;
  code: string;
  totalAmount:number;
  numberOfShare:number;
  amount:number;
  purchaseDate:Date;
  accountId:number;
  account:string;

  constructor(stockId:number,name:string,code:string,totalAmount:number,numberOfShare:number,amount:number,purchaseDate:Date,account:string,accountId:number) {
    this.stockId=stockId;
    this.name=name;
    this.code=code;
    this.totalAmount=totalAmount;
    this.numberOfShare=numberOfShare;
    this.amount=amount;  
    this.purchaseDate=purchaseDate;
    this.account=account;
    this.accountId=accountId;
  }
  toString(){
    return this.name;
  }
}