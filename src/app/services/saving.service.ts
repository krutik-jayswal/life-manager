import { Router, Routes } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './lm-utility.service';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { map } from "rxjs/operators";
import { Saving } from '../entity/saving';
import { SavingOperationComponent } from '../saving-operation/saving-operation.component';
import { MatDialogRef } from '@angular/material';

@Injectable()
export class SavingService {

    results: Observable<Saving>;

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }
    saveSavings(saving: Saving,dialogRef: MatDialogRef<SavingOperationComponent>) {
        this.http.post('/api/saving/add', this.utilityService.getFormUrlEncoded(saving), this.auth.getToken()).subscribe
            ((res: Response) => {
                alert("Saved");
                dialogRef.close()
            }
            );

    }

    getSavings(): Observable<Saving[]> {
        return this.http.get('/api/saving/listAll', this.auth.getToken()).pipe(
            map((res: any) => {
                return res.map(item => {
                    return new Saving(
                        item.savingId,
                        item.name,
                        item.amount,
                        item.type,
                        item.accountNumber,
                        item.returnOfInterest,
                        item.fromAccount.name,
                        item.fromAccount.accountId,
                        item.createdDate,
                        item.maturityDate,
                        item.maturityAmount);
                });
            })
        );
    }

    getSaving(savingId: number): Observable<Saving> {
        return this.http.get('/api/saving/get?id=' + savingId, this.auth.getToken()).pipe(
            map((res: any) => {
                return new Saving(
                    res.savingId,
                    res.name,
                    res.amount,
                    res.type,
                    res.accountNumber,
                    res.returnOfInterest,
                    res.fromAccount.name,
                    res.fromAccount.accountId,
                    res.createdDate,
                    res.maturityDate,
                    res.maturityAmount
                );
            })
        );
    }
    deleteSaving(savingId: number) {
        return this.http.delete('/api/saving/delete?id=' + savingId, this.auth.getToken());
    }
    closeSaving(savingId: number) {
        return this.http.get('/api/saving/close?id=' + savingId, this.auth.getToken());
    }

    updateSaving(saving: Saving,dialogRef: MatDialogRef<SavingOperationComponent>) {
        this.http.put('/api/saving/update', this.utilityService.getFormUrlEncoded(saving), this.auth.getToken()).subscribe
            ((res: Response) => {
                dialogRef.close();
                alert("Updated");
            }
            );
    }
}



