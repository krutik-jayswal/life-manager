import { Saving } from "./saving";
import { Stock } from "./stock";

export class FutureFund {
  id: number;
  name: string;
  amount: number;
  createdDate:Date;
  desiredFundDate: Date;
  savings:Saving[];
  stocks:Stock[];
  sumOfSaving:number;
  sumOfStocks:number;
  constructor(id: number, name: string, amount: number,createdDate:Date,desiredFundDate:Date, savings:Saving[],stocks:Stock[]) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.createdDate=createdDate;
    this.desiredFundDate=desiredFundDate;
    this.savings=savings;
    this.stocks=stocks;
  }
}