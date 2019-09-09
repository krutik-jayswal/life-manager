import { Component, OnInit, Inject } from '@angular/core';
import { AccountService } from '../services/account-service';
import { Account } from '../entity/account';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-transfer-account-balance',
  templateUrl: './transfer-account-balance.component.html',
  styleUrls: ['./transfer-account-balance.component.css'],
  providers:[AccountService]
})
export class TransferAccountBalanceComponent implements OnInit {
  accounts: Account[];
  public fromAccount: number;
  public toAccount: number;
  public transferAmount: number;
  public form: FormGroup;

  constructor(private accountService: AccountService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TransferAccountBalanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.form=this.fb.group({
      fromAccount:[0, []],
      toAccount:[0, []],
      amount:[0, []]
    });
  }

  transfer() {
    this.accountService.transferAmount(this.form.value.fromAccount, this.form.value.toAccount, this.form.value.amount).subscribe(
      e => {
        alert("Amount is transfferred");
        this.dialogRef.close();
      }
    );
  }
  close() {
    this.dialogRef.close();
  }
}
