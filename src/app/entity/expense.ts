export class Expense{

    id:string;
    name:string;
    date:Date;
    amount:number;
    category:string;
    categoryId:number;
    fromAccount:string;
    accountId:number;
    isNecessary:boolean;
        
    constructor(id:string,name:string,date:Date,amount:number,fromAccount:string,accountId:number,category:string,categoryId:number,isNecessary:boolean) {
        this.id=id;
        this.amount=amount;
        this.name=name;
        this.date=date;
        this.fromAccount=fromAccount;
        this.category=category;
        this.isNecessary=isNecessary;
        this.categoryId=categoryId;
        this.accountId=accountId;
    }
}