import { SheardModule } from './../sheard/sheard.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { NumberToPersianPipe } from './Pipe/number-to-persian-pipe.service';
import { JalaliPipe } from './Pipe/jalali-pipe.service';
import { NumberFormatPipe } from './Pipe/number-format-pipe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from './_services/api-service.service';
import { PersianPipeModule } from '../sheard/Modules/common/persianPipe.module';
import { NgBytesPipeModule } from 'angular-pipes';
import { NgAbsPipeModule } from 'angular-pipes';
import { CarService } from './_services/carservice';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NationalCodeService} from 'ngx-persian';
import {KeyFilterModule} from 'primeng/keyfilter';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputMaskModule} from 'primeng/inputmask';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import {DragDropModule} from 'primeng/dragdrop';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { EnvServiceProvider } from './_services/env/env.service.provider';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {CheckboxModule} from 'primeng/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {TooltipModule} from 'primeng/tooltip';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MenuModule} from 'primeng/menu';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    NumberToPersianPipe,
    JalaliPipe,
    NumberFormatPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule,
    ContextMenuModule,
    CalendarModule,
    MenuModule,
    ReactiveFormsModule,
    CommonModule,
    SheardModule,
    ToastModule,
    AccordionModule,
    PersianPipeModule,
    SelectButtonModule,
    NgBytesPipeModule,
    NgAbsPipeModule,
    TableModule,
    DialogModule,
    MultiSelectModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    TabViewModule,
    DropdownModule,
    PaginatorModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    KeyFilterModule,
    RadioButtonModule,
    InputMaskModule,
    ProgressSpinnerModule,
    NgxSpinnerModule,
    DragDropModule,
    PanelModule,
    CardModule,
    ScrollPanelModule,
    VirtualScrollerModule,
    CheckboxModule,
    InputSwitchModule,
    TriStateCheckboxModule,
    TooltipModule,
    InputNumberModule,
    MessagesModule,
    MessageModule
  ],
  providers: [ApiServiceService, CarService, NationalCodeService, EnvServiceProvider],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SheardModule,
    CalendarModule,
    AccordionModule,
    SelectButtonModule,
    PersianPipeModule,
    ContextMenuModule,
    MenuModule,
    ToastModule,
    NgBytesPipeModule,
    NgAbsPipeModule,
    MultiSelectModule,
    NumberToPersianPipe,
    JalaliPipe,
    NumberFormatPipe,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    TabViewModule,
    DropdownModule,
    PaginatorModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    KeyFilterModule,
    RadioButtonModule,
    InputMaskModule,
    ProgressSpinnerModule,
    NgxSpinnerModule,
    DragDropModule,
    PanelModule,
    CardModule,
    InputNumberModule,
    ScrollPanelModule,
    VirtualScrollerModule,
    CheckboxModule,
    InputSwitchModule,
    TriStateCheckboxModule,
    TooltipModule,
    MessagesModule,
    MessageModule
  ]
})
export class CoreModule { }
