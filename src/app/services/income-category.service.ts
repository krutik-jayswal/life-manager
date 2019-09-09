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
import { IncomeCategory } from '../entity/income-category';

@Injectable()
export class IncomeCategoryService {

    results: Observable<IncomeCategory>;

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }

    getCategory() : Observable<IncomeCategory[]>{
        return this.http.get('/api/income-category/listAll', this.auth.getToken()).pipe(
            map((res: any) => {
              return res.map(item => {
                return new IncomeCategory(
                    item.name,
                    item.incomeCategoryId
                );
              });
            })
          );
    }
}



