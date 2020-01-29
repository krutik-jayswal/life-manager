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
import { MatDialogRef } from '@angular/material';
import { IncomeOperationComponent } from '../income-operation/income-operation.component';

@Injectable()
export class IncomeService {

    results: Observable<Income>;

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }

    saveIncome(income:Income,dialogRef: MatDialogRef<IncomeOperationComponent>,){
        this.http.post('/api/income/add',this.utilityService.getFormUrlEncoded(income), this.auth.getToken()).subscribe
        ((res: Response) => {
            dialogRef.close();
            alert("Saved");
        }
        );

    }
    getIncomes(month:number,year:number) : Observable<Income[]>{
        return this.http.get('/api/income/listAll?month='+month+'&year='+year, this.auth.getToken()).pipe(
            map((res: any) => {
              return res.map(item => {
                  return new Income(
                    item.incomeId,
                    item.name,
                    item.amount,
                    item.date,
                    item.toAccount?item.toAccount.name:"",
                    item.toAccount?item.toAccount.accountId:"",
                    item.category?item.category.incomeCategoryId:"",
                    item.category?item.category.name:""
                );
              });
            })
          );
    }

    getFinanceYearIncomes(financeYear:string) : Observable<Income[]>{
        return this.http.get('/api/income/getFinanceYearIncome?financeYear='+financeYear, this.auth.getToken()).pipe(
            map((res: any) => {
              return res.map(item => {
                  return new Income(
                    item.incomeId,
                    item.name,
                    item.amount,
                    item.date,
                    item.toAccount?item.toAccount.name:"",
                    item.toAccount?item.toAccount.accountId:"",
                    item.category?item.category.incomeCategoryId:"",
                    item.category?item.category.name:""
                );
              });
            })
          );
    }
    getIncome(incomeId:number) : Observable<Income>{
        return this.http.get('/api/income/get?id='+incomeId, this.auth.getToken()).pipe(
                map((res: any) => {
                    return new Income(
                        res.incomeId,
                        res.name,
                        res.amount,
                        res.date,
                        res.toAccount.name,
                        res.toAccount.accountId,                        
                        res.category.name,
                        res.category.incomeCategoryId                       
                    );
                })
        );
    }
    deleteIncome(incomeId:number){
        return this.http.delete('/api/income/delete?id='+incomeId, this.auth.getToken());
    }
    updateIncome(income:Income,dialogRef: MatDialogRef<IncomeOperationComponent>,){
        this.http.put('/api/income/update',this.utilityService.getFormUrlEncoded(income), this.auth.getToken()).subscribe
        ((res: Response) => {
            alert("Updated");
            dialogRef.close();
        }
        );
    }
}



