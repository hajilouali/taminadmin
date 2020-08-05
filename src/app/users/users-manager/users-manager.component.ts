import { error } from 'protractor';
import { ApiServiceService, UserBio1, Manufacturee, Employee, UserAccounting, PaymentHisstory, TiketDto } from 'src/app/core/_services/api-service.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { SelectItem, MenuItem } from 'primeng/api';
import { APP_CONFIG, IAppConfig } from 'src/app/app.config';
import {MegaMenuItem} from 'primeng/api';  //required when using MegaMenu
import Swal from 'sweetalert2';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.css'],
  providers:[MessageService]
})
export class UsersManagerComponent implements OnInit  {
  users: UserBio1[] = [];
  orginusers: UserBio1[] = [];
  Selectuser: UserBio1 = {userWallet:0};
  types: SelectItem[] = [
    {label: 'مدیر', value: 'Admin'},
    {label: 'کاربر', value: 'User'},
    {label: 'همکار', value: 'Partner'}
];

  representatives: Representative[];
  loading: boolean = true;
  brands: SelectItem[];
  items: MenuItem[];
  display = false;
  @ViewChild('dt') table: Table;
  @ViewChild('employee') tableemployee: Table;
  userEmployee: Employee[];
  usermanufacture: Manufacturee[];
  UserAccounting: UserAccounting[] = [];
  UserPayMentHistory: PaymentHisstory[];
  usertikets: TiketDto[];
  constructor(
    private messageService: MessageService,
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private sppiner: NgxSpinnerService,
    private api: ApiServiceService) { }

  ngOnInit(): void {
    this.sppiner.show();
    this.api.GetUsers().subscribe(res => {
      this.users = res.data;
      this.orginusers = res.data;
      this.loading = false;
      this.sppiner.hide();
    });
    this.representatives = [
      {name: 'مدیر', roll: 'Admin'},
      {name: 'کاربر', roll: 'User'},
      {name: 'همکار', roll: 'Partner'}
  ];
    this.brands = [
    {label: 'همه', value: null},
    {label: 'فعال', value: true},
    {label: 'غیره فعال', value: false}
  ];
    this.items = [
      {
        label: 'Family',
        icon: 'pi pi-fw pi-users'
    },
    {
        label: 'Business',
        icon: 'pi pi-fw pi-briefcase'
    }
];
  }
  activitiychange(value){
    console.log(value);
    switch (value) {
      case null:
        this.table.filter([true, false], 'isActive', 'in');
        break;
      case true:
        this.table.filter(value, 'isActive', 'equals');
        break;
      case false:
        this.table.filter(value, 'isActive', 'equals');
        break;
    }
  }
  onRepresentativeChange(event) {
    console.log(event.itemValue.roll);
    // this.users = this.orginusers.filter(p=>p.rollName.i)
  }
  onHidedialog(){
    this.Selectuser = {userWallet: 0};
    this.userEmployee = [];
    this.usermanufacture = [];
    this.UserAccounting = [];
    this.UserPayMentHistory = [];

  }
  EditeEmploye(employe){
    this.sppiner.show();
    this.api.GetUserEmployees(this.Selectuser.id).subscribe(res => {
      this.userEmployee = res.data;
      this.api.GetUserManufactures(this.Selectuser.id).subscribe(ress => {
        this.usermanufacture = ress.data;
        this.api.GetUserAccounting(this.Selectuser.id).subscribe(res1 => {
          let s = 0;
          res1.data.forEach(element => {
            s += element.bestankar - element.bedehkari;
            element.sum = s;
            this.UserAccounting.push(element);
          });
          this.api.GetUserPayMentHistory(this.Selectuser.id).subscribe(res2 => {
            this.UserPayMentHistory = res2.data;
            this.api.GetTikets(this.Selectuser.id).subscribe(res2 => {
              this.usertikets = res2.data;
              this.display = true;
              this.sppiner.hide();
            });
          });
        });
      });
    });
  }
  RollSave(){
    let rolls:string[] = [];
    this.Selectuser.rollName.forEach(element => {
      rolls.push(element);
    });
    this.sppiner.show();
    this.api.AddRollsToUser(this.Selectuser.id, rolls).subscribe(res => {
      console.log(res);
      if (res.isSuccess) {
        this.sppiner.hide();
        this.messageService.add({severity:'success', summary:'ثبت تغییرات', detail:'نقش کاربر مورد نظر با موفقیت تغییر یافت'});
      } else {
        this.sppiner.hide();
        this.messageService.add({severity:'error', summary:'خطا!', detail:'متاسفانه دستور شما با خطا مواجهه شد لطفاً مجدداً تلاش نمایید'});
      }
    },error => {
      this.sppiner.hide();
      this.messageService.add({severity:'warn', summary:'خطا!', detail:'متاسفانه دستور شما با خطا مواجهه شد لطفاً مجدداً تلاش نمایید'});
    });
  }
  Changestatus(e){
    let isChecked = e.checked as boolean;
    this.sppiner.show();
    this.api.ChangeUserStatus(this.Selectuser.id, isChecked).subscribe(res => {
      if (res.isSuccess) {
        this.sppiner.hide();
        this.messageService.add({severity:'success', summary:'ثبت تغییرات', detail:'وضعیت کاربر مورد نظر با موفقیت تغییر یافت'});
      } else {
        this.sppiner.hide();
        this.messageService.add({severity:'error', summary:'خطا!', detail:'متاسفانه دستور شما با خطا مواجهه شد لطفاً مجدداً تلاش نمایید'});
      }
    },error =>
     {
      this.sppiner.hide();
      this.messageService.add({severity:'warn', summary:'خطا!', detail:'متاسفانه دستور شما با خطا مواجهه شد لطفاً مجدداً تلاش نمایید'});
    });
  }
  Sharjaccount(numbersharj: number) {
    if (numbersharj > 0) {
      const dto = {
        userid : this.Selectuser.id,
        price: numbersharj
      };
      this.api.addsharjtouser(dto).subscribe(res => {
        if (res.data) {
          this.messageService.add({severity: 'success', summary: 'ثبت تغییرات', detail: 'موجودی کاربر مورد نظر با موفقیت تغییر یافت'});
        } else {
          this.messageService.add({severity:'error', summary:'خطا!', detail:'متاسفانه دستور شما با خطا مواجهه شد لطفاً مجدداً تلاش نمایید'});
        }
      },error=>{this.messageService.add({severity:'warn', summary:'خطا!', detail:'متاسفانه دستور شما با خطا مواجهه شد لطفاً مجدداً تلاش نمایید'});});
    } else {
      this.messageService.add({severity:'error', summary:'خطا!', detail:'لطفاً مبلغ خود را وارد نمایید'});
    }
  }
}
interface Representative {
  name: string;
  roll: string;
}
