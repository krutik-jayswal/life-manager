import { Account } from './account'
export class Income {
  id: number;
  name: string;
  amount: number;
  date:Date;
  account: string;
  accountId: number;
  category: string;
  categoryId: number;
  constructor(id: number, name: string, amount: number,date:Date, account: string, accountId: number, category: string, categoryId: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.account = account;
    this.accountId = accountId;
    this.category=category;
    this.categoryId=categoryId;
    this.date=date;
  }
}