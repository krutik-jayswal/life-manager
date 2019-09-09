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
import { MatDialogRef } from '@angular/material';
import { AccountOperationComponent } from '../account-operation/account-operation.component';

@Injectable()
export class AccountService {

    results: Observable<Account>;

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }
    saveAccount(account: Account,dialogRef: MatDialogRef<AccountOperationComponent>) {
        this.http.post('/api/account/add', this.utilityService.getFormUrlEncoded(account), this.auth.getToken()).subscribe
            ((res: Response) => {
                alert("Saved");
                dialogRef.close();
            }
            );

    }
    getAccounts(): Observable<Account[]> {
        return this.http.get('/api/account/listAll', this.auth.getToken()).pipe(
            map((res: any) => {
                return res.map(item => {
                    return new Account(
                        item.accountId,
                        item.name,
                        item.balance,
                        item.type
                    );
                });
            })
        );
    }
    deleteAccount(accountId: number) {
        return this.http.delete('/api/account/delete?id=' + accountId, this.auth.getToken());
    }
    updateAccount(account: Account,dialogRef: MatDialogRef<AccountOperationComponent>) {
        this.http.put('/api/account/update', this.utilityService.getFormUrlEncoded(account), this.auth.getToken()).subscribe
            ((res: Response) => {
                alert("Updated");
                dialogRef.close();
            }
            );
    }
    getAccount(accountId: number): Observable<Account> {
        return this.http.get('/api/account/get?id=' + accountId, this.auth.getToken()).pipe(
            map((res: any) => {

                return new Account(
                    res.accountId,
                    res.name,
                    res.balance,
                    res.type
                );

            }));
    }

    transferAmount(fromAccountId: number,toAccountId: number,balance: number): Observable<Object>{
        return this.http.get('/api/account/transfer?fromAccountId=' + fromAccountId+'&toAccountId='+toAccountId+'&balance='+balance, this.auth.getToken());
    }


}



