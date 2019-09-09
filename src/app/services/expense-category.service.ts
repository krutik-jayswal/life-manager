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

@Injectable()
export class ExpenseCategoryService {

    results: Observable<ExpenseCategory>;

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }

    getCategory() : Observable<ExpenseCategory[]>{
        return this.http.get('/api/expense-category/listAll', this.auth.getToken()).pipe(
            map((res: any) => {
              return res.map(item => {
                return new ExpenseCategory(
                    item.name,
                    item.expenseCategoryId
                );
              });
            })
          );
    }
}



