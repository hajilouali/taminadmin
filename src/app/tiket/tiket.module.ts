import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TiketRoutingModule } from './tiket-routing.module';
import { TiketsComponent } from './tikets/tikets.component';
import { TiketContentComponent } from './tiket-content/tiket-content.component';


@NgModule({
  declarations: [TiketsComponent, TiketContentComponent],
  imports: [
    CommonModule,
    TiketRoutingModule,
    CoreModule,
    AngularEditorModule
  ]
})
export class TiketModule { }
