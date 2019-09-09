import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { StockService } from '../services/stock.service';
import { AccountService } from '../services/account-service';
import { SavingService } from '../services/saving.service';
import { Saving } from '../entity/saving';
import { Account } from '../entity/account';
import { IncomeService } from '../services/income.service';
import { Stock } from '../entity/stock';
import { Income } from '../entity/income';


@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.css'],
  providers:[IncomeService,AccountService,StockService,SavingService]
})
export class FinancialSummaryComponent implements OnInit {

 
  savings: Saving[];
  accounts: Account[];
  stocks: Stock[];
  income: Income[];
  details_panel: string="account";

  totalTypeSaving=new Array();

  accountPercentage:number=0;
  stockPercentage:number=0;
  
  totalOfStocks:number;
  totalOfAccount:number;
  public totalBalance:number;
  constructor(private incomeService: IncomeService, private stockService: StockService, private accountService: AccountService, private savingService: SavingService) { }

  ngOnInit() {
    this.totalBalance=0;
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts
      this.totalOfAccount=0;
      for(let i=0;i<this.accounts.length;i++){
        this.totalOfAccount+=this.accounts[i].balance;
      }
      this.totalBalance+=this.totalOfAccount;      
    });
    this.savingService.getSavings().subscribe(savings => {
      this.savings = savings
      let type='';
      let total=0;
      let totalMaturity=0;
      
      for(let i=0;i<this.savings.length;i++){
        if(i==0){
          type=this.savings[i].type;
        }else{
          if(type!=this.savings[i].type){
            this.totalBalance+=total;
            this.totalTypeSaving.push(
              {
                "type":type,
                "total":total,
                "maturity":totalMaturity
              }
            );
            total=0;
            totalMaturity=0;
            type=this.savings[i].type;
          }
        }
        total+=this.savings[i].amount;
        totalMaturity+=this.savings[i].maturityAmount;

        if(i==(this.savings.length-1)){
          this.totalTypeSaving.push(
            {
              "type":type,
              "total":total,
              "maturity":totalMaturity
            }
          );
          this.totalBalance+=total;
        }
        
        
      }


    });
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks
      this.totalOfStocks=0;
      for(let i=0;i<this.stocks.length;i++){
        this.totalOfStocks+=this.stocks[i].totalAmount;
      }
      this.totalBalance+=this.totalOfStocks;
    });

  }
  showDetails(event: any){
    for(var i=0;i<event.srcElement.parentElement.children.length;i++){
      event.srcElement.parentElement.children[i].className="";
    }
    event.srcElement.className="Active";
    this.details_panel=event.srcElement.id;
    return false;
  }

  isDisplay(value : string){
    if(this.details_panel==value){
      return true;
    }else{
      return false;
    }
  }
  updateAllocation(){
    this.accountPercentage=((this.totalOfAccount*100)/this.totalBalance);
    this.stockPercentage=((this.totalOfStocks*100)/this.totalBalance);
    for(let i=0;i<this.totalTypeSaving.length;i++){
      this.totalTypeSaving[i]["allocation"]=((this.totalTypeSaving[i].total*100)/this.totalBalance);
    }
  }

}
