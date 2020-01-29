export class ExpenseReport{

    categoryName:string;
    amount:number;
    count:number;
        
    constructor(count:number,amount:number,categoryName:string) {
        this.categoryName=categoryName;
        this.amount=amount;
        this.count=count;
    }
}