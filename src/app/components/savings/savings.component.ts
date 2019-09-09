import { Component, OnInit } from '@angular/core';
import { SavingService } from '../../services/saving.service';
import { AccountService } from '../../services/account-service';
import { Saving } from '../../entity/saving';
import { Account } from '../../entity/account';
import { MatDialog } from '@angular/material';
import { SavingOperationComponent } from '../../saving-operation/saving-operation.component';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css'],
  providers: [SavingService,AccountService]
})
export class SavingsComponent implements OnInit {

  public isNewRecord: boolean = true;

  savingId: number;
  name: string;
  amount: number;
  type: string;
  createdDate: string;
  maturityDate: string;
  maturityAmount: number;
  accountNumber: string;
  returnOfInterest: number;
  accountId: number;
  account: string;

  public accounts: Account[];
  public savings: Saving[];

  constructor(public savingService: SavingService, 
    public accountService: AccountService,
    public dialog: MatDialog) {

     }

  ngOnInit() {
    this.savingService.getSavings().subscribe(s => this.savings = s);
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.maturityDate = new Date().toISOString().split('T')[0];
    this.createdDate = new Date().toISOString().split('T')[0];
  }

  addNewSaving(event: any) {
      
    let dialogRef=this.dialog.open(SavingOperationComponent,
        {
          maxWidth: '50%',
          maxHeight: '50%',
          width: '80%',
          height: '80%',
          data : {
            title: 'New Saving',
            isNewRecord:true,
            createdDate:new Date().toISOString().split('T')[0],
            maturityDate:new Date().toISOString().split('T')[0]
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.savingService.getSavings().subscribe(s => this.savings = s);
        });
  }
  editSaving(event: any) {
    this.savingService.getSaving(event.toElement.parentElement.id).subscribe(saving => {
      this.dialog.open(SavingOperationComponent,
        {
          maxWidth: '50%',
          maxHeight: '50%',
          width: '80%',
          height: '80%',
          data : {
            title: 'Edit Saving',
            isNewRecord:false,
            savingId:saving.savingId,
            name:saving.name,
            type:saving.type,
            accountNumber:saving.accountNumber,
            returnOfInterest:saving.returnOfInterest,            
            createdDate:saving.createdDate,
            maturityDate:saving.maturityDate,
            amount:saving.amount,
            maturityAmount:saving.maturityAmount,
            account:saving.accountId
          }
        });

    })
    this.isNewRecord = false;
  }
  
  deleteSaving(event: any) {
    this.savingService.deleteSaving(event.toElement.parentElement.id).subscribe(
      e => this.savingService.getSavings().subscribe(s => this.savings = s)
    );
  }
  closeSaving($event:any){
    this.savingService.closeSaving($event.toElement.parentElement.id).subscribe(
      e => this.savingService.getSavings().subscribe(s => this.savings = s)
    );
  }

}
