import { Component, OnInit, Inject } from '@angular/core';
import { SIPService } from '../services/sip-recurring.service';
import { Saving } from '../entity/saving';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SavingService } from '../services/saving.service';
import { SipRecurringOperationComponent } from '../sip-recurring-operation/sip-recurring-operation.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SIP } from '../entity/sip';

@Component({
  selector: 'app-sip-recurring',
  templateUrl: './sip-recurring.component.html',
  styleUrls: ['./sip-recurring.component.css'],
  providers: [SIPService,SavingService]

})
export class SipRecurringComponent implements OnInit {

  public isNewRecord: boolean = true;
  public savings: Saving[];
  public sips:SIP[]

  constructor(
    public dialog: MatDialog,
    public savingService:SavingService,
    private sipService:SIPService) { }

  ngOnInit() {
    this.listAll();
  }
  

  addSIP(event: any) {      
    let dialogRef=this.dialog.open(SipRecurringOperationComponent,
    {
          maxWidth: '50%',
          maxHeight: '70%',
          height:'50%',
          width:'70%',
          data : {
            title: 'New SIP',
            isNewRecord:true,
            startDate:new Date().toISOString().split('T')[0],
            endDate:new Date().toISOString().split('T')[0]
          }
    });
        
        dialogRef.afterClosed().subscribe(result => {
          this.savingService.getSavings().subscribe(s => this.savings = s);
        });
  }
  ediSIP(event:any){
    this.sipService.getSIP(event.toElement.parentElement.id).subscribe(sip =>{
      let dialogRef=this.dialog.open(SipRecurringOperationComponent,
        {
          maxWidth: '50%',
          maxHeight: '50%',
          width: '80%',
          height: '80%',
          data : {
            id:event.toElement.parentElement.id,
            title: 'Edit SIP',
            name : sip.name,
            amount :sip.amount,
            startDate : sip.startDate,
            endDate:sip.endDate,
            recurringType:sip.recurringType,
            savingId:sip.savingId,
            saving:sip.saving,
            isNewRecord:false
          }
        });
        dialogRef.updatePosition({ top: '12%', left: '25%' });
    });
    this.isNewRecord = false;
  }
  listAll(){
    this.sipService.getSIPs().subscribe(
      sips=>{
        this.sips=sips;
      });
  }
  deleteSIP(event: any) {
    this.sipService.deleteSIP(event.toElement.parentElement.id).subscribe(
      e => this.listAll()
    );
  }

  
}
