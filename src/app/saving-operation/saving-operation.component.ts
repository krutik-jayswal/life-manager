import { Component, OnInit, Inject } from '@angular/core';
import { Account } from '../entity/account';
import { SavingService } from '../services/saving.service';
import { AccountService } from '../services/account-service';
import { AccountOperationComponent } from '../account-operation/account-operation.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Saving } from '../entity/saving';

@Component({
  selector: 'app-saving-operation',
  templateUrl: './saving-operation.component.html',
  styleUrls: ['./saving-operation.component.css'],
  providers:[SavingService,AccountService]
})
export class SavingOperationComponent implements OnInit {
  public isNewRecord: boolean = true;
  public title:string;
  public createdDate:string;
  public maturityDate:string;
  savingId: number;
  public accounts: Account[];
  public form: FormGroup;
  constructor(public savingService: SavingService,
     public accountService: AccountService,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private fb: FormBuilder,
     public dialogRef: MatDialogRef<SavingOperationComponent>
     ) { }

  ngOnInit() {
    this.title=this.data.title;
    this.isNewRecord=this.data.isNewRecord;
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.form = this.fb.group({
      name:[this.data.name, []],
      accountNumber:[this.data.accountNumber, []],
      type:[ this.data.type, []],
      returnOfInterest:[ this.data.returnOfInterest, []],
      createdDate:[ this.data.createdDate, []],
      maturityDate:[ this.data.maturityDate, []],
      amount:[ this.data.amount, []],
      maturityAmount:[ this.data.maturityAmount, []],
      account:[ this.data.account, []]
    });
    this.savingId=this.data.savingId;
    this.createdDate=new Date(this.data.createdDate).toISOString().split('T')[0];
    this.maturityDate=new Date(this.data.maturityDate).toISOString().split('T')[0];
  }
  saveSaving() {
    let saving = new Saving(null,
      this.form.value.name,
      this.form.value.amount,
      this.form.value.type,
      this.form.value.accountNumber,
      this.form.value.returnOfInterest,
      this.form.value.account,
      parseInt(this.form.value.account), new Date(Date.parse(this.form.value.createdDate)), new Date(Date.parse(this.form.value.maturityDate)),
      this.form.value.maturityAmount
    );
    this.savingService.saveSavings(saving,this.dialogRef)
  }
  updateSaving(event: any) {
    let saving = new Saving(this.savingId,
      this.form.value.name,
      this.form.value.amount,
      this.form.value.type,
      this.form.value.accountNumber,
      this.form.value.returnOfInterest,
      this.form.value.account,
      parseInt(this.form.value.account), new Date(Date.parse(this.form.value.createdDate)), new Date(Date.parse(this.form.value.maturityDate)),
      this.form.value.maturityAmount
    );
    this.savingService.updateSaving(saving,this.dialogRef);
  }
  close(){
    this.dialogRef.close();
  }
}
