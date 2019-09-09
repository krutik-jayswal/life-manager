import { Component, OnInit, Inject } from '@angular/core';
import { FutureFundService } from '../services/future-fund.service';
import { SavingService } from '../services/saving.service';
import { Saving } from '../entity/saving';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-link-fund-savings',
  templateUrl: './link-fund-savings.component.html',
  styleUrls: ['./link-fund-savings.component.css'],
  providers:[SavingService,FutureFundService]
})
export class LinkFundSavingsComponent implements OnInit {
  public fundId: number;
  private allSavings:Saving[];
  private selectedSavings:Saving[];
  public selectedSavingId:number;
  public title:string;
  constructor(private savingService:SavingService,
    private fundService:FutureFundService,
    public dialogRef: MatDialogRef<LinkFundSavingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 

    }

  ngOnInit() {
     this.savingService.getSavings().subscribe(saving=>{
         this.allSavings=saving;
     });
     this.fundId=this.data.fundId;
     this.title=this.data.title;
     this.refreshSavingAssoficatedWithFund();
  }

  refreshSavingAssoficatedWithFund(){    
    this.fundService.getFund(this.fundId).subscribe(fund=>{
      this.selectedSavings=fund.savings;
    });
  }
  close(){
   this.dialogRef.close();    
  }

  assoiateSavingWithFunds(){
    this.fundService.addSavingInFund(this.fundId,this.selectedSavingId).subscribe(
      e=>{
        this.refreshSavingAssoficatedWithFund();
      }
    );
  }
  removeAssoiatedSavingInFunds(event:any){
    this.fundService.removeSavingInFund(this.fundId,event.srcElement.parentElement.id).subscribe(
      e=>{
        this.refreshSavingAssoficatedWithFund();
      }
    );
  }



}
