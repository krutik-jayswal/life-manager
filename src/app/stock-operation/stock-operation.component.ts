import { Component, OnInit, Inject } from '@angular/core';
import { StockService } from '../services/stock.service';
import { AccountService } from '../services/account-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IncomeOperationComponent } from '../income-operation/income-operation.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Account } from '../entity/account';
import { Stock } from '../entity/stock';

@Component({
  selector: 'app-stock-operation',
  templateUrl: './stock-operation.component.html',
  styleUrls: ['./stock-operation.component.css'],
  providers: [StockService, AccountService]
})
export class StockOperationComponent implements OnInit {

  public accounts: Account[];
  public form: FormGroup;
  public isNewRecord: boolean = true;
  public purchaseDate: string;
  public stockId: number;
  public title: string;
  public noOfShare: number;
  public amount: number;
  public totalAmount: number;
  public account:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StockOperationComponent>,
    private stockService: StockService,
    private accountService: AccountService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.form = this.fb.group({
      name: [this.data.name, []],
      code: [this.data.code, []],
      amount: [this.data.amount, []],
      purchaseDate: [this.data.purchaseDate, []],
      noOfShare: [this.data.noOfShare, []],      
      account: [this.data.account, []]
    });
    this.isNewRecord=this.data.isNewRecord;
    this.purchaseDate = new Date(this.data.purchaseDate).toISOString().split('T')[0];
    this.stockId = this.data.stockId;
    this.title=this.data.title;
    this.noOfShare=this.data.noOfShare;
    this.amount=this.data.amount;
    this.account=this.data.account;

  }

  saveStock() {
    let stock = new Stock(null,
      this.form.value.name,
      this.form.value.code,
      this.form.value.noOfShare*this.form.value.amount,
      this.form.value.noOfShare,
      this.form.value.amount,
      new Date(Date.parse(this.form.value.purchaseDate)),
      this.form.value.account,
      this.form.value.account == undefined ? -1 : parseInt(this.form.value.account));
    this.stockService.saveStock(stock,this.dialogRef);
  }

  updateStock(event: any) {
    let stock = new Stock(this.stockId,
      this.form.value.name,
      this.form.value.code,
      this.form.value.noOfShare*this.form.value.amount,
      this.form.value.noOfShare,
      this.form.value.amount,
      new Date(Date.parse(this.form.value.purchaseDate)),
      this.form.value.account,
      parseInt(this.form.value.account));
    this.stockService.updateStock(stock,this.dialogRef);
  }
  close() {
    this.dialogRef.close();
  }


}
