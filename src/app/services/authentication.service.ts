import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../entity/user';
import { Response } from '@angular/http';
import { UtilityService } from './lm-utility.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

    public static ACCESS_TOKEN: string = 'accessToken';
    public static USERNAME: string = 'userName';
    public static USER_ID: string = 'userId';

    constructor(private http: HttpClient, private router: Router, private utilityService: UtilityService) { }

    getToken(): {} {        
        if (this.getUserName() != "null" && this.getUserName() != null && this.getUserName() != undefined) {
            let httpHeaders = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + sessionStorage.getItem(AuthenticationService.ACCESS_TOKEN)
                })
            }
            return httpHeaders;
        } else {
            this.router.navigateByUrl("/login")
        }
    }

    login(user: User) :Observable<any>{
        let body = this.utilityService.getFormUrlEncoded(user);
        return this.http.post('/oauth/token?grant_type=password', body, this.utilityService.httpHeaders).map((res:any)=>{
           res['user']=user.username; 
           return res;
        });
    }
    getFormUrlEncoded(toConvert) {
        const formBody = [];
        for (const property in toConvert) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(toConvert[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        return formBody.join('&');
    }
    logout() {
        sessionStorage.setItem(AuthenticationService.ACCESS_TOKEN, null);
        sessionStorage.setItem(AuthenticationService.USERNAME, null);
        this.router.navigateByUrl("/login");
    }

    setDetails(userName:string,token:string) {
        sessionStorage.setItem(AuthenticationService.ACCESS_TOKEN, token);
        sessionStorage.setItem(AuthenticationService.USERNAME, userName);
    }

    getUserName() {
        return sessionStorage.getItem(AuthenticationService.USERNAME);
    }

    public isLoggedIn(): boolean {
        if (sessionStorage.getItem(AuthenticationService.ACCESS_TOKEN) != "null" && sessionStorage.getItem(AuthenticationService.ACCESS_TOKEN) != null) {
            return true;
        } else {
            return false;
        }
    }



}

