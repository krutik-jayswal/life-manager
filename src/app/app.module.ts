import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomeComponent } from './layout/home/home.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { AccountComponent } from './components/account/account.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { LoginComponent } from './components/login/login.component';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UtilityService } from './services/lm-utility.service';
import { ExpenseCategoryService } from './services/expense-category.service';
import { AuthenticationService } from './services/authentication.service';
import { AccountService } from './services/account-service';

import { SavingsComponent } from './components/savings/savings.component';
import { LifestyleComponent } from './components/lifestyle/lifestyle.component';
import { PasswordsComponent } from './components/passwords/passwords.component';
import { StockComponent } from './components/stock/stock.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { DialogComponent } from './dialog/dialog.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { CashflowComponent } from './cashflow/cashflow.component';
import { ExpenseOperationComponent } from './expense-operation/expense-operation.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import {
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import { IncomeOperationComponent } from './income-operation/income-operation.component';
import { AccountOperationComponent } from './account-operation/account-operation.component';
import { StockOperationComponent } from './stock-operation/stock-operation.component';
import { SavingOperationComponent } from './saving-operation/saving-operation.component';
import { FinancialSummaryComponent } from './financial-summary/financial-summary.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { TransferAccountBalanceComponent } from './transfer-account-balance/transfer-account-balance.component';
import { SellStockComponent } from './sell-stock/sell-stock.component';
import { PasswordOperationComponent } from './password-operation/password-operation.component';
import { FutureFundComponent } from './future-fund/future-fund.component';
import { FutureFundOperationComponent } from './future-fund-operation/future-fund-operation.component';
import { LinkFundSavingsComponent } from './link-fund-savings/link-fund-savings.component';
import { LinkFundStocksComponent } from './link-fund-stocks/link-fund-stocks.component';
import { SipRecurringComponent } from './sip-recurring/sip-recurring.component';
import { SipRecurringOperationComponent } from './sip-recurring-operation/sip-recurring-operation.component';
import { MoveToSavingsComponent } from './move-to-savings/move-to-savings.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    AccountComponent,
    IncomeComponent,
    ExpenseComponent,
    LoginComponent,    
    StockComponent,
    SavingsComponent,
    LifestyleComponent,
    PasswordsComponent,    
    DialogComponent,
    AccountDetailsComponent,
    CashflowComponent,
    ExpenseOperationComponent,
    IncomeOperationComponent,
    AccountOperationComponent,
    StockOperationComponent,
    SavingOperationComponent,
    FinancialSummaryComponent,
    ToDoListComponent,
    TransferAccountBalanceComponent,
    SellStockComponent,
    PasswordOperationComponent,
    FutureFundComponent,
    FutureFundOperationComponent,
    LinkFundSavingsComponent,
    LinkFundStocksComponent,
    SipRecurringComponent,
    SipRecurringOperationComponent,
    MoveToSavingsComponent    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    HttpModule,
    CKEditorModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AppRoutingModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ExpenseOperationComponent,
    IncomeOperationComponent,
    AccountOperationComponent,
    StockOperationComponent,
    SavingOperationComponent,
    TransferAccountBalanceComponent,
    SellStockComponent,
    PasswordOperationComponent,
    FutureFundOperationComponent,
    LinkFundSavingsComponent,
    LinkFundStocksComponent,
    SipRecurringOperationComponent,
    MoveToSavingsComponent
  ],
  providers: [
    Http,
    UtilityService,
    ExpenseCategoryService,
    AuthenticationService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  public stockAPIKey:string='H8CENO8XNPQFR3O5';
}
