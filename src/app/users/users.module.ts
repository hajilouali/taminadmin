import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersManagerComponent } from './users-manager/users-manager.component';


@NgModule({
  declarations: [UsersManagerComponent],
  imports: [
    CommonModule,
    CoreModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
