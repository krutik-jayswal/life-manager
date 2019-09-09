import { Component, OnInit, Inject } from '@angular/core';
import { Saving } from '../entity/saving';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SavingService } from '../services/saving.service';
import { SIPService } from '../services/sip-recurring.service';
import { SIP } from '../entity/sip';

@Component({
  selector: 'app-sip-recurring-operation',
  templateUrl: './sip-recurring-operation.component.html',
  styleUrls: ['./sip-recurring-operation.component.css'],
  providers:[SavingService,SIPService] 
})
export class SipRecurringOperationComponent implements OnInit {

  public isNewRecord: boolean = true;
  public title :string;
  public id: string;
  public form: FormGroup;
  public startDateString: string;
  public endDateString: string;
  
  public savings: Saving[];
    constructor(public dialogRef: MatDialogRef<SipRecurringOperationComponent>,
    public savingService:SavingService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sipService:SIPService,    
    private fb: FormBuilder) {

    }

  ngOnInit() {

    this.savingService.getSavings().subscribe(s => this.savings = s);
    
    this.form = this.fb.group({
      name:[this.data.name, []],
      amount:[this.data.amount, []],
      startDate:[ "", []],
      endDate:["",[]],
      recurringType:[this.data.recurringType,[]],
      saving:[this.data.saving!=null?this.data.saving.savingId:"",[]]
    });
    this.startDateString=new Date(this.data.startDate).toISOString().split('T')[0];
    this.endDateString=new Date(this.data.endDate).toISOString().split('T')[0];
    this.isNewRecord=this.data.isNewRecord;
    this.title=this.data.title;
    this.id=this.data.id;
  }
  close(){
    this.dialogRef.close()
  }
  saveSip(){
    this.sipService.saveSip(new SIP(
      null,
      this.form.value.amount,
      this.form.value.name,
      new Date(Date.parse(this.form.value.startDate)),
      new Date(Date.parse(this.form.value.endDate)),
      this.form.value.recurringType,
      null,
      this.form.value.saving
    ),this.dialogRef);
  }
  updateSip(event:any){
    this.sipService.updateSIP(new SIP(
      this.id,
      this.form.value.amount,
      this.form.value.name,
      new Date(Date.parse(this.form.value.startDate)),
      new Date(Date.parse(this.form.value.endDate)),
      this.form.value.recurringType,
      null,
      this.form.value.saving
    ),this.dialogRef);
  }


}
