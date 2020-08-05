import { UsersManagerComponent } from './users-manager/users-manager.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../sheard/main-layout/main-layout.component';
import { GuardService } from '../core/_services/common/guard.service';

const routes: Routes = [
  {path: 'UsersManager', component: MainLayoutComponent, data: { title: ['مدیریت کارمندان'] }, canActivate: [GuardService] , children: [
    {path: '', component: UsersManagerComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
