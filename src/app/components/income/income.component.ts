import { Component, OnInit } from '@angular/core';
import { Income } from '../../entity/income';
import { IncomeService } from '../../services/income.service';
import { IncomeCategory } from '../../entity/income-category';
import { IncomeCategoryService } from '../../services/income-category.service';
import { AccountService } from '../../services/account-service';
import { Account } from '../../entity/account';
import { MatDialog } from '@angular/material';
import { IncomeOperationComponent } from '../../income-operation/income-operation.component';

@Component({
  selector: 'app-incomes',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  providers: [IncomeService, IncomeCategoryService, AccountService]
})
export class IncomeComponent implements OnInit {
  public isNewRecord: boolean = true;
  public id: number;
  public name: string;
  public amount: number;
  public date: Date;
  public dateStr: string;
  public category: string;
  public categoryId: number;
  public account: string
  public accountId: number;

  incomes: Income[];
  categories: IncomeCategory[];
  accounts: Account[];

  public incomeMonth;
  public incomeYear;
  public years = [];
  public totalIncome=0;


  constructor(public dialog: MatDialog,private incomeService: IncomeService, private categoryService: IncomeCategoryService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(categories => this.categories = categories);
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.dateStr = new Date().toISOString().split('T')[0];
    
    for (let i = 2000; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
    this.incomeYear = new Date().getFullYear();
    this.incomeMonth = new Date().getMonth() + 1;
    this.listIncomes()
  }
 
  editIncome(event: any): void {
    this.incomeService.getIncome(event.toElement.parentElement.id).subscribe(income =>{
      this.dialog.open(IncomeOperationComponent,
        {
          maxWidth: '50%',
          maxHeight: '50%',
          width: '80%',
          height: '80%',
          data : {
            id:income.id,
            title: 'Edit Income',
            isNewRecord:false,
            date:income.date,
            name:income.name,
            amount:income.amount,
            category:income.categoryId,
            account:income.accountId
          }
        });
  
    })    
  }
  deleteIncome(event: any) {
    this.incomeService.deleteIncome(event.toElement.parentElement.id).subscribe(
      e => this.listIncomes()
    );
  }
 
  listIncomes(){
    this.incomeService.getIncomes(this.incomeMonth,this.incomeYear).subscribe(incomes => 
      {
        this.incomes = incomes
        for(let i=0;i<this.incomes.length;i++){
          this.totalIncome+=this.incomes[i].amount;
        }
      });   
  }

  addNewIncome(){
    let dialogRef=this.dialog.open(IncomeOperationComponent,
      {
        maxWidth: '50%',
        maxHeight: '50%',
        width: '80%',
        height: '80%',
        data : {
          id:"",
          title: 'New Income',
          isNewRecord:true,
          date:new Date().toISOString().split('T')[0]
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.listIncomes();
      });
  }

}