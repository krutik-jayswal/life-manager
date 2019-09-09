import { Component, OnInit, Inject } from '@angular/core';
import { Account } from '../../entity/account';
import { AccountService } from '../../services/account-service';
import { MatDialog } from '@angular/material';
import { AccountOperationComponent } from '../../account-operation/account-operation.component';
import { TransferAccountBalanceComponent } from '../../transfer-account-balance/transfer-account-balance.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public isNewRecord: boolean = true;
  public isTransfer: boolean = false;
  accountId: string;
  name: string;
  balance: number;
  transferAmount: number;
  toAccount: number;
  fromAccount: number;
  type: string;


  public accounts: Account[];

  constructor(private accountService: AccountService,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    this.list();
  }
  list() {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  addNewAccount() {
    let dialogRef = this.dialog.open(AccountOperationComponent,
      {
        maxWidth: '30%',
        maxHeight: '50%',
        width: '80%',
        height: '80%',
        data: {
          title: 'New Account',
          isNewRecord: true
        }
      });
  }
  editAccount(event: any) {
    let dialogueRef=this.accountService.getAccount(event.toElement.parentElement.id).subscribe(account => {
      let dialogRef = this.dialog.open(AccountOperationComponent,
        {
          maxWidth: '50%',
          maxHeight: '32%',
          width: '80%',
          height: '80%',
          data: {
            title: 'Edit Account',
            isNewRecord: false,
            name: account.name,
            balance: account.balance,
            type: account.type,
            id: account.accountId
          }
        });
    }
    );
  }
  deleteAccount(event: any) {
    this.accountService.deleteAccount(event.toElement.parentElement.id).subscribe(
      e => this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts)
    );
  }
  transferBalance(){
    let dialogRef = this.dialog.open(TransferAccountBalanceComponent,
      {
        maxWidth: '32%',
        maxHeight: '50%',
        width: '35%',
        height: '50%',
      });
  }
}