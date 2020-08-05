import { TiketContentComponent } from './tiket-content/tiket-content.component';
import { MainLayoutComponent } from '../sheard/main-layout/main-layout.component';
import { GuardService } from '../core/_services/common/guard.service';
import { TiketsComponent } from './tikets/tikets.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'Tikts', component: MainLayoutComponent, data: { title: ['مدیریت تیکتها'] }, canActivate: [GuardService] , children: [
    {path: '', component: TiketsComponent}
  ]},
  {path: 'Tiket' , canActivate: [GuardService], data: { title: ['تیکت'] }, component: MainLayoutComponent, children: [
    {path: '', component: TiketContentComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiketRoutingModule { }
