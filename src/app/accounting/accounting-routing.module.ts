import { AccountingReportComponent } from './accounting-report/accounting-report.component';
import { MainLayoutComponent } from '../sheard/main-layout/main-layout.component';
import { GuardService } from '../core/_services/common/guard.service';
import { UsersPaymentComponent } from './users-payment/users-payment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'UserPayments', component: MainLayoutComponent, data: { title: [' پرداختی ها'] }, canActivate: [GuardService] , children: [
    {path: '', component: UsersPaymentComponent}
  ]},
  {path: 'AccountingReport', component: MainLayoutComponent, data: { title: [' بررسی حساب'] }, canActivate: [GuardService] , children: [
    {path: '', component: AccountingReportComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
