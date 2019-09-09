import { Router, Routes } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LifeStyle } from '../entity/lifestyle';
import { Response } from '@angular/http';
import { UtilityService } from './lm-utility.service';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";

@Injectable()
export class LifeStyleService {

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }

    saveLifeStyle(lifestyle: LifeStyle) {
        this.http.post('/api/lifestyle/add', this.utilityService.getFormUrlEncoded(lifestyle), this.auth.getToken()).subscribe
            ((res: Response) => {
                alert("Saved");
            }
            );

    }

    updateLifeStyle(lifestyle: LifeStyle) {
        this.http.put('/api/lifestyle/update', this.utilityService.getFormUrlEncoded(lifestyle), this.auth.getToken()).subscribe
            ((res: Response) => {
                alert("Updated");
            }
            );
    }


    getLifeStyles(): Observable<LifeStyle[]> {
        return this.http.get('/api/lifestyle/listAll', this.auth.getToken()).pipe(
            map((res: any) => {
                return res.map(item => {
                    return new LifeStyle(
                        item.lifeStyleId,
                        item.date,
                        item.text
                    );
                });
            })
        );
    }
    getLifeStyle(lifestyleId: number): Observable<LifeStyle> {
        return this.http.get('/api/lifestyle/get?id=' + lifestyleId, this.auth.getToken()).pipe(
            map((res: any) => {
                return new LifeStyle(
                    res.lifeStyleId,
                    res.date,
                    res.text
                );
            })
        );
    }

    deleteLifeStyle(lifestyleId: number) {
        return this.http.delete('/api/lifestyle/delete?id=' + lifestyleId, this.auth.getToken());
    }



}

