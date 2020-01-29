import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UtilityService {
    public  httpHeaders = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa('temp:temp')
        })
    };
    
    constructor() { }

    getFormUrlEncoded(toConvert) {
        const formBody = [];
        for (const property in toConvert) {
            const encodedKey = encodeURIComponent(property);
            let encodedValue;
            if(property.indexOf("date")>=0 || property.indexOf("Date")>=0){
                encodedValue = Date.parse(toConvert[property]);
            }else{
                encodedValue = encodeURIComponent(toConvert[property]);
            }            
            formBody.push(encodedKey + '=' + encodedValue);
        }
        return formBody.join('&');
    }

    getCurrentFiscalYear() {
        var today = new Date();
         
        //get current month
        var curMonth = today.getMonth();
         
        var fiscalYr = "";
        if (curMonth > 3) { 
            fiscalYr= "1/04/"+today.getFullYear()+"#"+"31/03/"+(today.getFullYear()+1);
        } else {
            fiscalYr= "1/04/"+(today.getFullYear()-1)+"#"+"31/03/"+today.getFullYear();
        }
         
        return encodeURIComponent(fiscalYr);
     }
}

