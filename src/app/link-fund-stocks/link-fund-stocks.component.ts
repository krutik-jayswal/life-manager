import { Component, OnInit, Inject } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Stock } from '../entity/stock';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FutureFundService } from '../services/future-fund.service';

@Component({
  selector: 'app-link-fund-stocks',
  templateUrl: './link-fund-stocks.component.html',
  styleUrls: ['./link-fund-stocks.component.css'],
  providers:[StockService,FutureFundService]
})
export class LinkFundStocksComponent implements OnInit {

  public fundId: number;
  public allStocks:Stock[];
  public selectedStocks:Stock[];
  public selectedStockId:number;
  public title:string;
  constructor(private stockService:StockService,
    private fundService:FutureFundService,
    public dialogRef: MatDialogRef<LinkFundStocksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 

    }

  ngOnInit() {
     this.stockService.getStocks().subscribe(stocks=>{
         this.allStocks=stocks;
     });
     this.fundId=this.data.fundId;
     this.title=this.data.title;
     this.refreshStockAssoficatedWithFund();
  }

  refreshStockAssoficatedWithFund(){    
    this.fundService.getFund(this.fundId).subscribe(fund=>{
      this.selectedStocks=fund.stocks;
    });
  }
  close(){
   this.dialogRef.close();    
  }

  assoiateStockWithFunds(){
    this.fundService.addStockInFund(this.fundId,this.selectedStockId).subscribe(
      e=>{
        this.refreshStockAssoficatedWithFund();
      }
    );
  }
  removeAssoiatedStockInFunds(event:any){
    this.fundService.removeStockInFund(this.fundId,event.srcElement.parentElement.id).subscribe(
      e=>{
        this.refreshStockAssoficatedWithFund();
      }
    );
  }


}
