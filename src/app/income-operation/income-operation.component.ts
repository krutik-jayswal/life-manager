import { Component, OnInit, Inject } from '@angular/core';
import { AccountService } from '../services/account-service';
import { IncomeCategoryService } from '../services/income-category.service';
import { IncomeService } from '../services/income.service';
import { IncomeCategory } from '../entity/income-category';
import { Income } from '../entity/income';
import { Account } from '../entity/account';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-income-operation',
  templateUrl: './income-operation.component.html',
  styleUrls: ['./income-operation.component.css'],
  providers: [IncomeService,IncomeCategoryService]
})
export class IncomeOperationComponent implements OnInit {
  public form: FormGroup;
  public isNewRecord: boolean = true;
  public dateString: string;

  public id: number;
  public name: string;
  public amount: number;
  public date: Date;
  public dateStr: string;
  public category: string;
  public categoryId: number;
  public account: string
  public accountId: number;
  public title :string;

  categories: IncomeCategory[];
  accounts: Account[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<IncomeOperationComponent>,
  private incomeService: IncomeService,
   private categoryService: IncomeCategoryService,
    private accountService: AccountService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.categoryService.getCategory().subscribe(categories => this.categories = categories);
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.title=this.data.title;
    this.isNewRecord=this.data.isNewRecord;

    this.form = this.fb.group({
      name:[this.data.name, []],
      amount:[this.data.amount, []],
      date:[ "", []],
      category:[this.data.category,[]],
      account:[this.data.account,[]]
    });

    this.dateString=new Date(this.data.date).toISOString().split('T')[0];
    this.id=this.data.id;
  }
  clearAll() {
    this.amount = 0.00
    this.dateStr = new Date().toISOString().split('T')[0];
    this.name = ""    
  }
  updateIncome(event: any): void {
    let income = new Income(this.id,
      this.form.value.name,
      this.form.value.amount,
      new Date(Date.parse(this.form.value.date)),
      null, parseInt(this.form.value.account),
      null, parseInt(this.form.value.category));
    this.incomeService.updateIncome(income,this.dialogRef);
    this.clearAll();

  }
  saveIncome(): void {
    let income = new Income(null,
      this.form.value.name,
      this.form.value.amount,
      new Date(Date.parse(this.form.value.date)),
      null, parseInt(this.form.value.account),
      null, parseInt(this.form.value.category));
    this.incomeService.saveIncome(income,this.dialogRef);
    this.clearAll();
  }
  close(){
    this.dialogRef.close()
  }

}
