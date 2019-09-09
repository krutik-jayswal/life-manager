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
import { Password } from '../entity/password';

@Injectable()
export class PasswordService {

    results: Observable<Password>;

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }

    savePassword(password:Password){
        this.http.post('/api/password/add',this.utilityService.getFormUrlEncoded(password), this.auth.getToken()).subscribe
        ((res: Response) => {
            alert("Saved");
        }
        );

    }
    getPasswords() : Observable<Password[]>{
        return this.http.get('/api/password/listAll', this.auth.getToken()).pipe(
            map((res: any) => {
              return res.map(item => {
                  return new Password(
                    item.passwordId,
                    item.name,
                    item.description,
                    "********",
                    undefined
                );
              });
            })
          );
    }

    getPassword(passwordId:number,key:string) : Observable<Password>{
        return this.http.get('/api/password/get?id='+passwordId+'&key='+key, this.auth.getToken()).pipe(
                map((res: any) => {
                    return new Password(
                        res.passwordId,
                        res.name,
                        res.description,
                        res.password,
                        undefined
                    );
                })
        );
    }
    deletePassword(passwordId:number){
        return this.http.delete('/api/password/delete?id='+passwordId, this.auth.getToken());
    }
    updatePassword(password:Password){
        this.http.put('/api/password/update',this.utilityService.getFormUrlEncoded(password), this.auth.getToken()).subscribe
        ((res: Response) => {
            alert("Updated");
        }
        );
    }
}



