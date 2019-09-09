import { Component, OnInit, Inject } from '@angular/core';
import { AccountService } from '../services/account-service';
import { Account } from '../entity/account';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.css'],
  providers:[AccountService]
})
export class AccountOperationComponent implements OnInit {
  public isNewRecord: boolean = true;
  public isTransfer: boolean = false;
  accountId: string;
  name: string;
  title: string;
  balance: number;
  transferAmount: number;
  toAccount: number;
  fromAccount: number;
  type: string;
  public form: FormGroup;
  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<AccountOperationComponent>) { }

  ngOnInit() {
    this.title=this.data.title;
    this.isNewRecord=this.data.isNewRecord;
    this.form = this.fb.group({
      name:[this.data.name, []],
      balance:[this.data.balance, []],
      type:[ this.data.type, []]
    });
  }
  saveAccount() {
    this.accountService.saveAccount(new Account(null,
      this.form.value.name,
      this.form.value.balance,
      this.form.value.type
    ),this.dialogRef);    
  }
  
  updateAccount(event: any) {
    this.accountService.updateAccount(new Account(this.data.id,
      this.form.value.name,
      this.form.value.balance,
      this.form.value.type
    ,),this.dialogRef)
  }
  close(){
    this.dialogRef.close();
  }

}
