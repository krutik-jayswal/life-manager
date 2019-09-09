import { Saving } from "./saving";

export class SIP{

    sipId:string;
    name:string;
    startDate:Date;
    endDate:Date;
    amount:number;
    recurringType:string;
    saving:Saving;
    savingId:number;
        
    constructor(id:string,amount:number,name:string,startDate:Date,endDate:Date,recurringType:string,saving:Saving,savingId:number) {
        this.sipId=id;
        this.amount=amount;
        this.name=name;        
        this.startDate=startDate;
        this.endDate=endDate;
        this.recurringType=recurringType;
        this.saving=saving;
        this.savingId=savingId;
    }
}