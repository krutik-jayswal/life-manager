import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Stock } from '../../entity/stock';
import { StockService } from '../../services/stock.service';
import { AccountService } from '../../services/account-service';
import { Account } from '../../entity/account';
import { StockOperationComponent } from '../../stock-operation/stock-operation.component';
import { MatDialog } from '@angular/material';
import { SellStockComponent } from '../../sell-stock/sell-stock.component';

@Component({
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [StockService]
})
export class StockComponent implements OnInit {

  public isNewRecord: boolean = true;
  public isSelling: boolean = false;
  public date: Date = new Date();


  stockId: number;
  name: string;
  code: string;
  totalAmount: number;
  numberOfShare: number;
  amount: number;
  purchaseDate: string;
  accountId: number;
  account: string;
  sellId: number;
  sellStockName: string;
  sellStockPrice: number;
  public accounts: Account[];
  public stocks: Stock[];
  public totalStocks = 0;
  constructor(private stockService: StockService,
    public dialog: MatDialog,
    private accountService: AccountService) {
  }


  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.listStocks();
    this.purchaseDate = new Date().toISOString().split('T')[0];
  }

  addNewStock() {
    let dialogRef=this.dialog.open(StockOperationComponent,
      {
        maxWidth: '50%',
        maxHeight: '50%',
        width: '80%',
        height: '80%',
        data: {
          title: 'New Stock',
          isNewRecord: true,
          purchaseDate: this.purchaseDate,
          amount: 0.00,
          noOfShare: 0
        }
      });
      dialogRef.updatePosition({ top: '12%', left: '25%' });
      dialogRef.afterClosed().subscribe(result => {
        this.listStocks();
      });
  }

  editStock(event: any) {
    this.stockService.getStock(event.toElement.parentElement.id).subscribe(stock => {
     let dialogRef= this.dialog.open(StockOperationComponent,
        {
          maxWidth: '50%',
          maxHeight: '50%',
          width: '80%',
          height: '80%',
          data: {
            title: 'Edit Stock',
            isNewRecord: false,
            stockId: stock.stockId,
            purchaseDate: stock.purchaseDate,
            amount: stock.amount,
            noOfShare: stock.numberOfShare,
            name: stock.name,
            code: stock.code,
            account: stock.accountId
          }
        });
        dialogRef.updatePosition({ top: '12%', left: '25%' });
    });
  }

  deleteStock(event: any) {
    this.stockService.deleteStock(event.toElement.parentElement.id).subscribe(
      e => this.listStocks()
    );
  }
  sellStock($event) {
    this.isSelling = true;
    this.stockService.getStock($event.toElement.parentElement.id).subscribe(e => {
      this.dialog.open(SellStockComponent,
        {
          maxWidth: '40%',
          maxHeight: '30%',
          width: '80%',
          height: '80%',
          data: {
            stockId: e.stockId,
            amount: (e.amount*e.numberOfShare),
            name: e.name
          }
        });
    })
  }
  listStocks() {
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks
      this.totalStocks = 0;
      for (let i = 0; i < this.stocks.length; i++) {
        this.totalStocks += this.stocks[i].totalAmount;
      }
    });
  }

}