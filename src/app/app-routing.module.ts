import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './layout/registration/registration.component';
import { IncomeComponent } from './components/income/income.component';
import { AccountComponent } from './components/account/account.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { LoginComponent } from './components/login/login.component';
import { StockComponent } from './components/stock/stock.component';
import { SavingsComponent } from './components/savings/savings.component';
import { LifestyleComponent } from './components/lifestyle/lifestyle.component';
import { PasswordsComponent } from './components/passwords/passwords.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { CashflowComponent } from './cashflow/cashflow.component';
import { FinancialSummaryComponent } from './financial-summary/financial-summary.component';
import { FutureFundComponent } from './future-fund/future-fund.component';
import { SipRecurringComponent } from './sip-recurring/sip-recurring.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'cashflow',
    component: CashflowComponent,
    children: [
      { path: 'expense', component: ExpenseComponent },
      { path: 'income', component: IncomeComponent },
      { path: 'account', component: AccountComponent },
      { path: 'stock', component: StockComponent },
      { path: 'saving', component: SavingsComponent },
      { path: 'futurefund', component: FutureFundComponent },
      { path: 'recurring', component: SipRecurringComponent},
      { path: 'summary', component: FinancialSummaryComponent}
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'lifestyle',
    component: LifestyleComponent
  },
  {
    path: 'passwords',
    component: PasswordsComponent
  },
  {
    path: 'todo',
    component: ToDoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
