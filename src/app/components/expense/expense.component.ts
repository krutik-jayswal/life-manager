import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Expense } from '../../entity/expense';
import { ExpenseService } from '../../services/expense.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ExpenseCategoryService } from '../../services/expense-category.service';
import { ExpenseCategory } from '../../entity/expense-category';
import { AccountService } from '../../services/account-service';
import { Account } from '../../entity/account';
import { MatDialog } from '@angular/material';
import { ExpenseOperationComponent } from '../../expense-operation/expense-operation.component';
import { IncomeService } from '../../services/income.service';
import { MoveToSavingsComponent } from '../../move-to-savings/move-to-savings.component';
import { UtilityService } from '../../services/lm-utility.service';
import { ExpenseReport } from '../../entity/expense-report';

@Component({
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers: [ExpenseService,IncomeService]
})
export class ExpenseComponent implements OnInit {

  public isNewRecord: boolean = true;
  public showExpenseSummary: boolean = false;
  public showUncategorisedExpense: boolean = false;
  public showExpenseDetails: boolean =true;
  public showCurrentFiscalYearReport: boolean = false;
  public highlightOnclick:boolean;
  public date: Date = new Date();

  public id: string;
  public amount: number;
  public name: string;
  public account: string;
  public category: string;

  public expenseMonth;
  public accountIdFilter;
  public years = [];
  public categoryWiseExpense = new Map();
  public categories: ExpenseCategory[];
  public categoryWiseExpenseKeys ;

  public expenseYear;
  public totalExpense=0;
  public totalSavings=0;
  public expenses: Expense[];
  public expensesReport: ExpenseReport[];
  public accounts: Account[];
  public creditAmount = 0;
  public totalIncome = 0;
  public totalFinanceYearExpense = 0;

  constructor(private expenseService: ExpenseService,
    private categoryService:ExpenseCategoryService,
    private incomeService:IncomeService,
    public dialog: MatDialog,
    public accountService:AccountService,
    private utilityService: UtilityService) {
  }

  ngOnInit(): void {
    for (let i = 2000; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
    this.expenseYear = new Date().getFullYear();
    this.expenseMonth = new Date().getMonth() + 1;
    this.listExpenses()
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.totalIncome=0;
    this.incomeService.getIncomes(this.expenseMonth,this.expenseYear).subscribe(incomes=>{
      for(let i=0;i<incomes.length;i++){
        this.totalIncome+=incomes[i].amount;
      }
    });
  }

  editExpense(event: any) {
    this.expenseService.getExpense(event.toElement.parentElement.id).subscribe(expense =>{
      
      let dialogRef= this.dialog.open(ExpenseOperationComponent,
        {
          maxWidth: '50%',
          maxHeight: '50%',
          width: '80%',
          height: '80%',
          data : {
            id:event.toElement.parentElement.id,
            title: 'Edit Expense',
            name : expense.name,
            amount :expense.amount,
            date : expense.date,
            category:expense.categoryId,
            account:expense.accountId,
            isNewRecord:false
          }
        });
        dialogRef.updatePosition({ top: '12%', left: '25%' });
    });
    this.isNewRecord = false;
  }

  deleteExpense(event: any) {
    this.expenseService.deleteExpense(event.toElement.parentElement.id).subscribe(
      e => this.expenseService.getExpenses(this.expenseMonth, this.expenseYear,this.accountIdFilter).subscribe(expenses => this.expenses = expenses)
    );
  }

  listExpenses() {       
    this.categoryService.getCategory().subscribe(categories =>
    { 
        this.categories = categories;
        for (let i = 0; i < this.categories.length; i++) {  
          this.categoryWiseExpense.set(categories[i].name,0);
        }

        this.expenseService.getExpenses(this.expenseMonth, this.expenseYear,this.accountIdFilter==undefined?"":this.accountIdFilter).subscribe(expenses => {
          this.expenses = expenses;
          var totalExpense = 0;
          this.creditAmount = 0;
          for (let i = 0; i < this.expenses.length; i++) {
            if(this.expenses[i].category=="SAVINGS"){
              this.totalSavings += this.expenses[i].amount;
            }
              totalExpense += this.expenses[i].amount;
            
                if(this.expenses[i].accountId!=undefined){
                      this.accountService.getAccount(this.expenses[i].accountId).subscribe(account => {                    
                        if (account.type == 'Credit') {
                          this.creditAmount += this.expenses[i].amount;
                        }
                      })
                }
                if(this.expenses[i].category==undefined){
                  this.categoryWiseExpense.set("Other",this.categoryWiseExpense.get("Other")+this.expenses[i].amount);
                }else{
                  this.categoryWiseExpense.set(this.expenses[i].category,this.categoryWiseExpense.get(this.expenses[i].category)+this.expenses[i].amount);
                }
            }
          this.totalExpense = totalExpense;
          
          this.incomeService.getIncomes(this.expenseMonth,this.expenseYear).subscribe(incomes=>{
            this.totalIncome=0;
            for(let i=0;i<incomes.length;i++){
              this.totalIncome+=incomes[i].amount;
            }
          });      
          this.categoryWiseExpenseKeys = Array.from(this.categoryWiseExpense.keys())
        });
    });
   
  }
  addNewExpense(event) {
    let dialogRef = this.dialog.open(ExpenseOperationComponent,
      {
        maxWidth: '50%',
        maxHeight: '50%',
        width: '80%',
        height: '80%',
        data : {
          title: 'New Expense',
          date : new Date().toISOString().split('T')[0],
          isNewRecord:true
        }
      });
      dialogRef.updatePosition({ top: '12%', left: '25%' });
      dialogRef.afterClosed().subscribe(result => {
        this.listExpenses();
      });
  }

  moveToSavings(event) {
    let dialogRef = this.dialog.open(MoveToSavingsComponent,
      {
        maxWidth: '50%',
        maxHeight: '50%',
        width: '80%',
        height: '80%',
        data : {
          title: 'Move to Savings',
          date : new Date().toISOString().split('T')[0]
        }
      });
      dialogRef.updatePosition({ top: '12%', left: '25%' });
      dialogRef.afterClosed().subscribe(result => {
        this.listExpenses();
      });
  }

  highlightHtmltElement(event){
    if(this.highlightOnclick){
      for(let i=0;(event.srcElement.parentElement.children.length-1)>i;i++){
        event.srcElement.parentElement.children[i].style.cssText="border:3px solid white;padding: 3px 10px;background-color: #2d1b56;color: navajowhite;";
      }
    }
   
    
  }
  listExpensesByCategory(event:any) {       
    this.categoryService.getCategory().subscribe(categories =>
    { 
        this.categories = categories;
        for (let i = 0; i < this.categories.length; i++) {  
          this.categoryWiseExpense.set(categories[i].name,0);
        }

        this.expenseService.getExpensesByCategory(this.expenseMonth, this.expenseYear,this.accountIdFilter==undefined?"":this.accountIdFilter,event.srcElement.id).subscribe(expenses => {
          this.expenses = expenses;
          var totalExpense = 0;
          this.creditAmount = 0;
          for (let i = 0; i < this.expenses.length; i++) {
                totalExpense += this.expenses[i].amount;
                if(this.expenses[i].accountId!=undefined){
                      this.accountService.getAccount(this.expenses[i].accountId).subscribe(account => {                    
                        if (account.type == 'Credit') {
                          this.creditAmount += this.expenses[i].amount;
                        }
                      })
                }
                if(this.expenses[i].category==undefined){
                  this.categoryWiseExpense.set("Other",this.categoryWiseExpense.get("Other")+this.expenses[i].amount);
                }else{
                  this.categoryWiseExpense.set(this.expenses[i].category,this.categoryWiseExpense.get(this.expenses[i].category)+this.expenses[i].amount);
                }
            }
          this.totalExpense = totalExpense;
          this.categoryWiseExpenseKeys = Array.from(this.categoryWiseExpense.keys())
        });
    });
    
  }

  resetFilter(){
    this.listExpenses();
    return false;
  }
  selectedComponent($event:any){
    if($event.currentTarget.value=="expense"){
      this.showCurrentFiscalYearReport=false;
      this.showExpenseSummary=false;
      this.showExpenseDetails=true;
    }else if($event.currentTarget.value=="summary"){
      this.showCurrentFiscalYearReport=false;
      this.showExpenseSummary=true;
      this.showExpenseDetails=false;
    }else{
      this.showCurrentFiscalYearReport=true;
      this.showExpenseSummary=false;
      this.showExpenseDetails=false;
      this.currentFinanceYearReport(undefined);
    }
  }
  toggleSummaryView($event:any){
    this.showExpenseSummary=!this.showExpenseSummary;    
    if(this.showExpenseSummary){
      $event.srcElement.innerHTML='Expense';
    }else{
      $event.srcElement.innerHTML='Summary';
    }
    return false;
  }
  showUncategorisedExpenses($event:any){
    this.expenseService.getUncategorisedExpenses().subscribe(expenses => {
      this.expenses = expenses;
    });
    this.showUncategorisedExpense=true;
    return false;
  }
  updateCategoryOfExpense($event:any){
    this.expenseService.updateCategoryOfExpense($event.srcElement.parentElement.id,$event.srcElement.id).subscribe
    ((res: Response) => {
      this.showUncategorisedExpenses(null);
    }
    );  
  }
  currentFinanceYearReport($event:any){
    this.showCurrentFiscalYearReport=true;
    this.expenseService.getFinanceYearExpenses(this.utilityService.getCurrentFiscalYear()).subscribe(expenseReport=>{
      this.totalExpense=0;
      this.expensesReport=expenseReport;
      for(var i=0;i<this.expensesReport.length;i++){
        this.totalFinanceYearExpense+=expenseReport[i].amount;
      }
    });

    return false;
  }
  showYearlyReport($event:any){
    this.categoryService.getCategory().subscribe(categories =>
      { 
          this.categories = categories;
          for (let i = 0; i < this.categories.length; i++) {  
            this.categoryWiseExpense.set(categories[i].name,0);
          }
  
          this.expenseService.getYearlyExpenses(this.expenseYear).subscribe(expenses => {
            this.expenses = expenses;
            var totalExpense = 0;
            this.creditAmount = 0;
            for (let i = 0; i < this.expenses.length; i++) {
                  totalExpense += this.expenses[i].amount;
                  if(this.expenses[i].accountId!=undefined){
                        this.accountService.getAccount(this.expenses[i].accountId).subscribe(account => {                    
                          if (account.type == 'Credit') {
                            this.creditAmount += this.expenses[i].amount;
                          }
                        })
                  }
                  if(this.expenses[i].category==undefined){
                    this.categoryWiseExpense.set("Other",this.categoryWiseExpense.get("Other")+this.expenses[i].amount);
                  }else{
                    this.categoryWiseExpense.set(this.expenses[i].category,this.categoryWiseExpense.get(this.expenses[i].category)+this.expenses[i].amount);
                  }
              }
            this.totalExpense = totalExpense;
            this.categoryWiseExpenseKeys = Array.from(this.categoryWiseExpense.keys())
          });
      });
        }
}