import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExpenseCategoryService } from '../services/expense-category.service';
import { AccountService } from '../services/account-service';
import { Expense } from '../entity/expense';
import { ExpenseCategory } from '../entity/expense-category';
import { Account } from '../entity/account';
import { ExpenseService } from '../services/expense.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseOperationComponent } from '../expense-operation/expense-operation.component';

@Component({
  selector: 'app-move-to-savings',
  templateUrl: './move-to-savings.component.html',
  styleUrls: ['./move-to-savings.component.css'],
  providers: [ExpenseService]
})
export class MoveToSavingsComponent implements OnInit {


  public form: FormGroup;
  public title:string;
  public dateString: string;

  public isNewRecord: boolean = true;
  public categories: ExpenseCategory[];
  public accounts: Account[];

  public date: Date = new Date();

  public id: string;
  public amount: number;
  public name: string;
  public fromAccount: string;
  public toAccount: string;
  public category: string;

  constructor(public dialogRef: MatDialogRef<ExpenseOperationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private categoryService: ExpenseCategoryService,
  private accountService: AccountService,
  private expenseService: ExpenseService,
  private fb: FormBuilder
  ){
    
  }
  ngOnInit() {
    
    this.categoryService.getCategory().subscribe(categories =>
      { 
        this.categories = categories;
      });
      
      this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
      
      this.form = this.fb.group({
        name:[this.data.name, []],
        amount:[this.data.amount, []],
        date:[ "", []],
        fromAccount:[this.data.fromAccount,[]],
        toAccount:[this.data.toAccount,[]],
        category:[this.data.category,[]]
      });
      this.dateString=new Date(this.data.date).toISOString().split('T')[0];
      this.title=this.data.title;
  }
  moveToSavings() {
    let expense = new Expense(null,
      this.form.value.name,
      new Date(Date.parse(this.dateString)),
      this.form.value.amount, null,
      parseInt(this.form.value.fromAccount), null,
      parseInt(this.form.value.category),
      true);
      this.expenseService.moveToSavings(expense,this.form.value.toAccount,this.dialogRef);
  }
  updateMoveToSavings(event: any) {
    let expense = new Expense(this.data.id,
      this.form.value.name,
      new Date(Date.parse(this.form.value.date)),
      this.form.value.amount, null,
      parseInt(this.form.value.account), null,
      parseInt(this.form.value.category),
      true);
    this.expenseService.updateExpense(expense,this.dialogRef);    
  }
  close(){
    this.dialogRef.close();
  }

}
