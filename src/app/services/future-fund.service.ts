import { Router, Routes } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { UtilityService } from './lm-utility.service';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";
import { FutureFund } from '../entity/future-fund';
import { Saving } from '../entity/saving';
import { Stock } from '../entity/stock';
import { FutureFundOperationComponent } from '../future-fund-operation/future-fund-operation.component';
import { MatDialogRef } from '@angular/material';

@Injectable()
export class FutureFundService {

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }

    saveFund(futureFund:FutureFund,dialogRef: MatDialogRef<FutureFundOperationComponent>){
        this.http.post('/api/future-fund/add',this.utilityService.getFormUrlEncoded(futureFund), this.auth.getToken()).subscribe
        ((res: Response) => {
            alert("Saved");
            dialogRef.close();
        }
        );

    }

    updateFund(futureFund:FutureFund,dialogRef: MatDialogRef<FutureFundOperationComponent>){
        this.http.put('/api/future-fund/update',this.utilityService.getFormUrlEncoded(futureFund), this.auth.getToken()).subscribe
        ((res: Response) => {
            alert("Updated");
            dialogRef.close();
        }
        );
    }

    addStockInFund(fId:number,stockId:number) : Observable<string>{
       return this.http.put('/api/future-fund/add-stock-fund?fundId='+fId+'&stockId='+stockId,"", this.auth.getToken()).map(
          (res:any) => {
              return "Inserted";     
          }      
        );
    }
    removeStockInFund(fId:number,stockId:number){
        return this.http.put('/api/future-fund/remove-stock-fund?fundId='+fId+'&stockId='+stockId,"", this.auth.getToken());
    }

    addSavingInFund(fId:number,savingId:number) : Observable<string>{
        return this.http.put('/api/future-fund/add-saving-fund?fundId='+fId+'&savingId='+savingId,"", this.auth.getToken()).map(
           (res:any) => {
               return "Inserted";     
           }      
         );
     }
     removeSavingInFund(fId:number,savingId:number){
         return this.http.put('/api/future-fund/remove-saving-fund?fundId='+fId+'&savingId='+savingId,"", this.auth.getToken());
     }
     
    
    
    getFunds() : Observable<FutureFund[]>{
        return this.http.get('/api/future-fund/listAll', this.auth.getToken()).pipe(
                map((res: any) => {
                  return res.map(item => {
                     let savings:Saving[]=Array<Saving>(); 
                     let stocks:Stock[]=Array<Stock>();
                     let totalSavingAmount=0;
                     let totalStockAmount=0;
                     
                     for(let i=0;i<item.stocks.length;i++){
                         totalStockAmount+=item.stocks[i].totalAmount;
                         stocks.push(new Stock(
                            item.stocks[i].stockId,
                            item.stocks[i].name,
                            item.stocks[i].code,
                            item.stocks[i].totalAmount,
                            item.stocks[i].numberOfShare,
                            item.stocks[i].amount,
                            item.stocks[i].purchaseDate,
                            item.stocks[i].fromAccount?item.stocks[i].fromAccount.name:undefined,
                            item.stocks[i].fromAccount?item.stocks[i].fromAccount.accountId:undefined
                            ));
                     }
                     for(let j=0;j<item.savings.length;j++){
                        totalSavingAmount+=item.savings[j].amount;
                        savings.push(new Saving(
                            item.savings[j].savingId,
                            item.savings[j].name,
                            item.savings[j].amount,
                            item.savings[j].type,
                            item.savings[j].accountNumber,
                            item.savings[j].returnOfInterest,
                            item.savings[j].fromAccount.name,
                            item.savings[j].fromAccount.accountId,
                            item.savings[j].createdDate,
                            item.savings[j].maturityDate,
                            item.savings[j].maturityAmount));
                     }
                     let futureFund = new FutureFund(
                        item.futureFundId,
                        item.name,
                        item.amount,
                        item.createdDate,
                        item.desiredFundDate,
                        savings,
                        stocks
                    );
                    futureFund.sumOfSaving=totalSavingAmount;
                    futureFund.sumOfStocks=totalStockAmount;
                    return futureFund;
                  });
                })
        );
    }
    getFund(id:number) : Observable<FutureFund>{
        return this.http.get('/api/future-fund/get?id='+id, this.auth.getToken()).pipe(
                map((res: any) => {
                   

                     let savings:Saving[]=Array<Saving>(); 
                     let stocks:Stock[]=Array<Stock>();
                     let totalSavingAmount=0;
                     let totalStockAmount=0;
                     
                     for(let i=0;i<res.stocks.length;i++){
                         totalStockAmount+=res.stocks[i].totalAmount;
                         stocks.push(new Stock(
                            res.stocks[i].stockId,
                            res.stocks[i].name,
                            res.stocks[i].code,
                            res.stocks[i].totalAmount,
                            res.stocks[i].numberOfShare,
                            res.stocks[i].amount,
                            res.stocks[i].purchaseDate,
                            res.stocks[i].fromAccount?res.stocks[i].fromAccount.name:undefined,
                            res.stocks[i].fromAccount?res.stocks[i].fromAccount.accountId:undefined
                            ));
                     }
                     for(let j=0;j<res.savings.length;j++){
                        totalSavingAmount+=res.savings[j].amount;
                        savings.push(new Saving(
                            res.savings[j].savingId,
                            res.savings[j].name,
                            res.savings[j].amount,
                            res.savings[j].type,
                            res.savings[j].accountNumber,
                            res.savings[j].returnOfInterest,
                            res.savings[j].fromAccount.name,
                            res.savings[j].fromAccount.accountId,
                            res.savings[j].createdDate,
                            res.savings[j].maturityDate,
                            res.savings[j].maturityAmount));
                     }

                    return new FutureFund(
                       res.futureFundId,
                       res.name,
                       res.amount,
                       res.createdDate,
                       res.desiredFundDate,
                       savings,
                       stocks
                   );                })
        );
    }

    deleteFund(id:number){
        return this.http.delete('/api/future-fund/delete?id='+id, this.auth.getToken());
    }
    
    

}
