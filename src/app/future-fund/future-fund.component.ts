import { Component, OnInit } from '@angular/core';
import { FutureFund } from '../entity/future-fund';
import { FutureFundService } from '../services/future-fund.service';
import { MatDialog } from '@angular/material';
import { LinkFundStocksComponent } from '../link-fund-stocks/link-fund-stocks.component';
import { LinkFundSavingsComponent } from '../link-fund-savings/link-fund-savings.component';
import { FutureFundOperationComponent } from '../future-fund-operation/future-fund-operation.component';

@Component({
  selector: 'app-future-fund',
  templateUrl: './future-fund.component.html',
  styleUrls: ['./future-fund.component.css'],
  providers:[FutureFundService]
})
export class FutureFundComponent implements OnInit {

  futureFunds:FutureFund[];
  constructor(private futureFundService:FutureFundService,
    public dialog: MatDialog) { }

  ngOnInit() {
   this.listFunds();
  }

  addFund() {
    let dialogRef = this.dialog.open(FutureFundOperationComponent,
      {
        maxWidth: '50%',
        maxHeight: '50%',
        width: '80%',
        height: '80%',
        data : {
          title: 'New Fund',
          isNewRecord:true,
          createdDate:new Date().toISOString().split('T')[0],
          desiredDate:new Date().toISOString().split('T')[0]
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.listFunds()
      });
  }
 
  editFund(event:any){
    this.futureFundService.getFund(event.toElement.parentElement.id).subscribe(fund =>{
      let dialogRef = this.dialog.open(FutureFundOperationComponent,
        {
          maxWidth: '50%',
          maxHeight: '50%',
          width: '80%',
          height: '80%',
          data : {
            title: 'Edit Fund',
            isNewRecord:false,
            id:fund.id,
            name:fund.name,
            amountNeeded:fund.amount,
            createdDate:fund.createdDate,
            desiredDate:fund.desiredFundDate
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.listFunds()
        });
    })
    
  }

  listFunds(){
    this.futureFundService.getFunds().subscribe(funds=>{
      this.futureFunds=funds;      
    });
  }
  editStocksInFund(event:any){
    let dialogRef = this.dialog.open(LinkFundStocksComponent,
      {
        maxWidth: '50%',
        maxHeight: '50%',
        width: '80%',
        height: '80%',
        data : {
          title: 'Edit Funds',
          fundId : event.srcElement.parentElement.parentElement.parentElement.id,
          isNewRecord:false
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.listFunds()
      });
  }

  editSavingsInFund(event:any){
    let dialogRef = this.dialog.open(LinkFundSavingsComponent,
      {
        maxWidth: '50%',
        maxHeight: '50%',
        width: '80%',
        height: '80%',
        data : {
          title: 'Edit Funds',
          fundId : event.srcElement.parentElement.parentElement.parentElement.id,
          isNewRecord:false
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.listFunds()
      });
  }

  deleteFund(event: any) {
    this.futureFundService.deleteFund(event.toElement.parentElement.id).subscribe(
      e => this.futureFundService.getFunds().subscribe(funds => this.futureFunds = funds)
    );
  }


}
