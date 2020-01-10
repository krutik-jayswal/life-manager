import { Router, Routes } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../entity/expense';
import { Response } from '@angular/http';
import { UtilityService } from './lm-utility.service';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";
import { ExpenseOperationComponent } from '../expense-operation/expense-operation.component';
import { MatDialogRef } from '@angular/material';

@Injectable()
export class ExpenseService {

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }

    saveExpense(expense:Expense,dialogRef: MatDialogRef<ExpenseOperationComponent>)  {
        this.http.post('/api/expense/add',this.utilityService.getFormUrlEncoded(expense), this.auth.getToken()).subscribe
        ((res: Response) => {
            dialogRef.close();
            alert("Saved");
        }
        );

    }

    moveToSavings(expense:Expense,toAccount:string,dialogRef: MatDialogRef<ExpenseOperationComponent>)  {
        this.http.post('/api/expense/moveToSavingAccount',this.utilityService.getFormUrlEncoded(expense)+'&toAccountId='+toAccount, this.auth.getToken()).subscribe
        ((res: Response) => {
            dialogRef.close();
            alert("Saved");
        }
        );

    }

    updateExpense(expense:Expense,dialogRef: MatDialogRef<ExpenseOperationComponent>)  {
        this.http.put('/api/expense/update',this.utilityService.getFormUrlEncoded(expense), this.auth.getToken()).subscribe
        ((res: Response) => {
            dialogRef.close();
            alert("Updated");
        }
        );
    }
    
    
    getExpenses(month:number,year:number,accountId:number) : Observable<Expense[]>{
        return this.http.get('/api/expense/listAll?accountId='+accountId+'&month='+month+'&year='+year, this.auth.getToken()).pipe(
                map((res: any) => {
                  return res.map(item => {
                    return new Expense(
                        item.eId,
                        item.name,
                        item.date,
                        item.amount,
                        item.fromAccount?item.fromAccount.name:undefined,
                        item.fromAccount?item.fromAccount.accountId:undefined,
                        item.category?item.category.name:undefined,
                        item.category?item.category.expenseCategoryId:undefined,                        
                        item.necessary
                    );
                  });
                })
        );
    }

    getExpensesByCategory(month:number,year:number,accountId:number,categoryId:number) : Observable<Expense[]>{
        return this.http.get('/api/expense/listByCategory?accountId='+accountId+'&month='+month+'&year='+year+'&categoryId='+categoryId, this.auth.getToken()).pipe(
                map((res: any) => {
                  return res.map(item => {
                    return new Expense(
                        item.eId,
                        item.name,
                        item.date,
                        item.amount,
                        item.fromAccount?item.fromAccount.name:undefined,
                        item.fromAccount?item.fromAccount.accountId:undefined,
                        item.category?item.category.name:undefined,
                        item.category?item.category.expenseCategoryId:undefined,                        
                        item.necessary
                    );
                  });
                })
        );
    }

    getExpense(expenseId:number) : Observable<Expense>{
        return this.http.get('/api/expense/get?id='+expenseId, this.auth.getToken()).pipe(
                map((res: any) => {
                    return new Expense(
                        res.eId,
                        res.name,
                        res.date,
                        res.amount,
                        res.fromAccount.name,
                        res.fromAccount.accountId,                        
                        res.category.name,
                        res.category.expenseCategoryId,                        
                        res.necessary
                    );
                })
        );
    }

    deleteExpense(expenseId:number){
        return this.http.delete('/api/expense/delete?id='+expenseId, this.auth.getToken());
    }

    updateCategoryOfExpense(expenseId:number,expenseCategory:any):Observable<any>{
        return this.http.put('/api/expense/update-category','categoryId='+expenseCategory+'&id='+expenseId, this.auth.getToken());
    }

    getUncategorisedExpenses() : Observable<Expense[]>{
        return this.http.get('/api/expense/listUncategorisedExpenses', this.auth.getToken()).pipe(
                map((res: any) => {
                  return res.map(item => {
                    return new Expense(
                        item.eId,
                        item.name,
                        item.date,
                        item.amount,
                        item.fromAccount?item.fromAccount.name:undefined,
                        item.fromAccount?item.fromAccount.accountId:undefined,
                        item.category?item.category.name:undefined,
                        item.category?item.category.expenseCategoryId:undefined,                        
                        item.necessary
                    );
                  });
                })
        );
    }

    getYearlyExpenses(year:number) : Observable<Expense[]>{
        return this.http.get('/api/expense/listYearlyExpense?year='+year, this.auth.getToken()).pipe(
                map((res: any) => {
                  return res.map(item => {
                    return new Expense(
                        item.eId,
                        item.name,
                        item.date,
                        item.amount,
                        item.fromAccount?item.fromAccount.name:undefined,
                        item.fromAccount?item.fromAccount.accountId:undefined,
                        item.category?item.category.name:undefined,
                        item.category?item.category.expenseCategoryId:undefined,                        
                        item.necessary
                    );
                  });
                })
        );
    }
    
    

}

