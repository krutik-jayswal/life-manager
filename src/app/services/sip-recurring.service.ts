import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../entity/expense';
import { Response } from '@angular/http';
import { UtilityService } from './lm-utility.service';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";
import { MatDialogRef } from '@angular/material';
import { SIP } from '../entity/sip';
import { SipRecurringOperationComponent } from '../sip-recurring-operation/sip-recurring-operation.component';
import { Saving } from '../entity/saving';

@Injectable()
export class SIPService {

    constructor(private http: HttpClient, private utilityService: UtilityService, private auth: AuthenticationService) {

    }

    saveSip(sip:SIP,dialogRef: MatDialogRef<SipRecurringOperationComponent>)  {
        this.http.post('/api/sip/add',this.utilityService.getFormUrlEncoded(sip), this.auth.getToken()).subscribe
            ((res: Response) => {
                dialogRef.close();
                alert("Saved");
            }
        );

    }

    updateSIP(sip:SIP,dialogRef: MatDialogRef<SipRecurringOperationComponent>)  {
        this.http.put('/api/sip/update',this.utilityService.getFormUrlEncoded(sip), this.auth.getToken()).subscribe
        ((res: Response) => {
            dialogRef.close();
            alert("Saved");
        }
        );

    }
    
    
    getSIPs() : Observable<SIP[]>{
        return this.http.get('/api/sip/listAll', this.auth.getToken()).pipe(
                map((res: any) => {
                  return res.map(item => 
                    {
                        return new SIP(
                            item.sipId,
                            item.amount,
                            item.name,
                            item.startDate,
                            item.endDate,
                            item.recurringType,
                            new Saving(
                                item.saving.savingId,
                                item.saving.name,
                                item.saving.amount,
                                item.saving.type,
                                item.saving.accountNumber,
                                item.saving.returnOfInterest,
                                item.saving.account,
                                item.saving.accountId,
                                item.saving.createdDate,
                                item.saving.maturityDate,
                                item.saving.maturityAmount
                            ),
                            item.saving.id
                        );
                  
                    });
                })
        );
    }

   
    getSIP(sipId:number) : Observable<SIP>{
        return this.http.get('/api/sip/get?id='+sipId, this.auth.getToken()).pipe(
                map((res: any) => {
                    return new SIP(
                        res.sipId,
                        res.amount,
                        res.name,
                        res.startDate,
                        res.endDate,
                        res.recurringType,
                            new Saving(
                                res.saving.savingId,
                                res.saving.name,
                                res.saving.amount,
                                res.saving.type,
                                res.saving.accountNumber,
                                res.saving.returnOfInterest,
                                res.saving.account,
                                res.saving.accountId,
                                res.saving.createdDate,
                                res.saving.maturityDate,
                                res.saving.maturityAmount
                            ),
                            res.saving.id
                    );
                })
        );
    }

    deleteSIP(sipId:number){
        return this.http.delete('/api/sip/delete?id='+sipId, this.auth.getToken());
    }
    
    

}

