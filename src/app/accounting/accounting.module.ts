import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { UsersPaymentComponent } from './users-payment/users-payment.component';
import { AccountingReportComponent } from './accounting-report/accounting-report.component';


@NgModule({
  declarations: [UsersPaymentComponent, AccountingReportComponent],
  imports: [
    CommonModule,
    CoreModule,
    AccountingRoutingModule
  ]
})
export class AccountingModule { }
