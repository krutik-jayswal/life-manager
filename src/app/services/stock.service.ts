import { Router, Routes } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './lm-utility.service';
import { AuthenticationService } from './authentication.service';
import { ExpenseCategory } from '../entity/expense-category';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { map } from "rxjs/operators";
import { Account } from '../entity/account';
import { Income } from '../entity/income';
import { Stock } from '../entity/stock';
import { ExpenseOperationComponent } from '../expense-operation/expense-operation.component';
import { StockOperationComponent } from '../stock-operation/stock-operation.component';
import { MatDialogRef } from '@angular/material';

@Injectable()
export class StockService {

    results: Observable<Stock>;

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }
    saveStock(stock:Stock,dialogRef: MatDialogRef<StockOperationComponent>)  {
        this.http.post('/api/stock/add',this.utilityService.getFormUrlEncoded(stock), this.auth.getToken()).subscribe
        ((res: Response) => {
            alert("Saved");
            dialogRef.close();
        }
        );

    }
    getStock(stockId:number) : Observable<Stock>{
        return this.http.get('/api/stock/get?id='+stockId, this.auth.getToken()).pipe(
                map((res: any) => {
                    return new Stock(
                        res.stockId,
                        res.name,
                        res.code,
                        res.totalAmount,
                        res.numberOfShare,
                        res.amount,
                        res.purchaseDate,
                        res.fromAccount?res.fromAccount.name:undefined,
                        res.fromAccount?res.fromAccount.accountId:undefined
                        );
                })
        );
    }


    getStocks() : Observable<Stock[]>{
        return this.http.get('/api/stock/listAll', this.auth.getToken()).pipe(
            map((res: any) => {
              return res.map(item => {
                  return new Stock(
                    item.stockId,
                    item.name,
                    item.code,
                    item.totalAmount,
                    item.numberOfShare,
                    item.amount,
                    item.purchaseDate,
                    item.fromAccount?item.fromAccount.name:undefined,
                    item.fromAccount?item.fromAccount.accountId:undefined
                );
              });
            })
          );
    }

    deleteStock(stockId:number){
        return this.http.delete('/api/stock/delete?id='+stockId, this.auth.getToken());
    }
    sellStock(stockId:number,value:number){
        return this.http.get('/api/stock/sell?id='+stockId+'&sellingAmount='+value, this.auth.getToken());
    }
    updateStock(stock:Stock,dialogRef: MatDialogRef<StockOperationComponent>)  {
        this.http.put('/api/stock/update',this.utilityService.getFormUrlEncoded(stock), this.auth.getToken()).subscribe
        ((res: Response) => {
            dialogRef.close();
            alert("Updated");
        }
        );
    }
}



