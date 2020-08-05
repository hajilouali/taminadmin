import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { error } from 'protractor';
import { APP_CONFIG, IAppConfig } from 'src/app/app.config';
import { EnvService } from './env/env.service';
export enum FactorType {
  PishFactor,
  Factor,
  PendingToAccept
}
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseurl = `${this.appConfig.apiEndpoint}`;
  constructor(
    private env: EnvService,
    private http: HttpClient ,
    private router: Router,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
    ) { }
  public login(credentials) {
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', credentials.username);
    body = body.set('password', credentials.password);
    body = body.set('grant_type', 'password');
    this.http.post(`${this.appConfig.apiEndpoint}api/v1/Users/Token`, body, {headers: myheader} ).subscribe(
      res => this.authenticate(res),
      error => {
        Swal.fire({
          title: 'خطا!',
          text: 'کاربری با اطلاعات وارد شده یافت نشد',
          icon: 'error',
          confirmButtonText: 'تایید'
        });
       });
  }
  public userinformation() {
   return this.http.get<UserBioInterFace>(`${this.appConfig.apiEndpoint}api/v1/Users/GetCorentUserBio`);
  }
  public authenticate(res) {

    localStorage.setItem('token', res.access_token);
    this.isAuthenticated().subscribe(ress => {
      const result = ress.data.rollName.indexOf('Admin');
      if (result > -1){
        this.router.navigate(['/Dashboard']);
      } else {
        Swal.fire({
          title: 'خطا!',
          text: 'متاسفانه شما مجوز ورود ندارید . لطفاً با مدیریت تماس بگیرید.',
          icon: 'error',
          confirmButtonText: 'تایید'
        });
        this.logout();
      }
    });
  }
  public logout() {
    localStorage.removeItem('token');
  }
  public isAuthenticated() {

 return this.http.get<UserBio>(`${this.appConfig.apiEndpoint}api/v1/Users/GetCorentUserBio`);
  }
  public TokenisTrue() {

   return this.http.get<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Users/CheckTokenIsValid`);

  }
  public ChangePassword(dto) {
    return this.http.post<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Users/UpdatePassword`, dto);
  }
  public ChangeProfilePic(Model) {
    return this.http.post(`${this.appConfig.apiEndpoint}api/v1/Users/Addprofilepic`, Model, {
      reportProgress: true,
      observe: 'events',

    });
  }
  public GetUsers() {
    return this.http.get<getlist<UserBio1>>(`${this.appConfig.apiEndpoint}api/v1/Users`);
  }
  public AddRollsToUser(userid, rolls: string[]) {
    return this.http.post<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Users/addUserstoRolls/${userid}`, rolls);
  }
  public ChangeUserStatus(userid, statuss: boolean) {
    const postdto = {
      id: userid,
      status: statuss
    };
    return this.http.post<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Users/UserActivity`, postdto);
  }
  public GetUserEmployees(userid) {

    return this.http.get<getlist<Employee>>(`${this.appConfig.apiEndpoint}api/v2/UserManagement/GetUserEmployes/${userid}`);
  }
  public GetUserManufactures(userid) {

    return this.http.get<getlist<Manufacturee>>(`${this.appConfig.apiEndpoint}api/v2/UserManagement/GetUserManufactures/${userid}`);
  }
  public GetUserAccounting(userid) {

    return this.http.get<getlist<UserAccounting>>(`${this.appConfig.apiEndpoint}api/v2/UserManagement/GetUserAccounting/${userid}`);
  }
  public GetUserPayMentHistory(userid) {

    return this.http.get<getlist<PaymentHisstory>>(`${this.appConfig.apiEndpoint}api/v2/UserManagement/GetLastPaymentHisstory/${userid}`);
  }
  public GetTikets(userid) {

    return this.http.get<getlist<TiketDto>>(`${this.appConfig.apiEndpoint}api/v2/UserManagement/GetUserTikets/${userid}`);
  }
  public addsharjtouser(dto) {

    return this.http.post<baseDto>(`${this.appConfig.apiEndpoint}api/v2/UserManagement/UserSharj`, dto);
  }
  public GetTiketscount() {

    return this.http.get<get<number>>(`${this.appConfig.apiEndpoint}api/v2/TiketManagment/GetTiketCount`);
  }
  public GetTiketsbyLazy(take: number, skip: number, search?: string) {

    return this.http.get<get<tiketresice>>(`${this.appConfig.apiEndpoint}api/v2/TiketManagment/GetTiket/${take}/${skip}/${search}`);
  }
  public addTicketContent(ticketContent: any, id: number) {
    return this.http.post<get<TiketContentDto>>(`${this.appConfig.apiEndpoint}api/v2/TiketManagment/AddTiketContent/${id}` , ticketContent);
  }
  public getTiketContent(id: number) {
    return this.http.get<get<TiketDto>>(`${this.appConfig.apiEndpoint}api/v2/TiketManagment/${id}`);
  }
  public getPaymentHistory(dto) {
    return this.http.post<getlist<PaymentHisstory>>(`${this.appConfig.apiEndpoint}api/v2/Accounting/GetPayementHisstory`, dto);
  }
  public getAccountingHistory(dto) {
    return this.http.post<getlist<UserAccounting>>(`${this.appConfig.apiEndpoint}api/v2/Accounting/GetUserAccounting`, dto);
  }
}
export interface tiketresice {
  list?: TiketDto[];
  count?: number;
}
export interface PaymentHisstory {
  isSucess?: true;
  trackingnumber?: number;
  transactioncode?: string;
  userID?: number;
  gateway?: string;
  price?: number;
  dateTime?: Date;
  discription?: string;
  offerCode?: string;
  id?: number;
  username?: string;
}
export interface UserAccounting {
  userID?: number;
  bedehkari?: number;
  bestankar?: number;
  discription?: string;
  dateTime?: Date ;
  sum?: number;
  id?: number;
  userDto: {
    phoneNumber: string,
    email: string,
    fullName: string
  };
}
export interface Manufacturee {
  userID?: number;
  dsK_ID?: string;
  dsK_NAME?: string;
  dsK_FARM?: string;
  dsK_ADRS?: string;
  moN_PYM?: string;
  dsK_RATE?: number;
  id?: number;
}
export interface UserBio{

  data: {
    id: number,
    userName: number,
    fullName: string,
    email: string,
    isActive: boolean,
    discount: number,
    userAddress: string,
    userPhone: string,
    rollName: string[]
  };
  isSuccess: boolean ;
  statusCode: number;
  message: string;
}
export interface baseDto{
  data: boolean;
  isSuccess: true;
  statusCode: boolean;
  message: string;
}
export interface UserBio1 {
  id?: number;
  fullName?: string;
  isActive?: boolean;
  rollName?: string[];
  userPhone?: string;
  emplyeCount?: number;
  manufacturyCount?: number;
  listCount?: number;
  userWallet?: number;
  userImage?: string;
  tiketCount?: number;
  tiketPendingCount?: number;
}
export interface UserBioInterFace{
  data?: UserBio1;
  isSuccess?: true ;
  statusCode?: boolean ;
  message?: string;
}

export interface getlist<key>{
  data: key[];
  isSuccess: boolean ;
  statusCode: number;
  message: string;
}
export interface get<key>{
  data: key;
  isSuccess: boolean ;
  statusCode: number;
  message: string;
}

export interface OfferStatus {
  code?: string;
  dateExpire?: Date;
  countExpire?: number;
  discription?: string;
  offerRate?: number;
  id?: number;
  isactive?: boolean;
}
export interface PaymentHisstory {
  isSucess?: true;
  trackingnumber?: number;
  transactioncode?: string;
  userID?: number;
  gateway?: string;
  price?: number;
  dateTime?: Date;
  discription?: string;
  offerCode?: string;
  id?: number;
}
export interface UserAccounting {
  userID?: number;
  bedehkari?: number;
  bestankar?: number;
  discription?: string;
  dateTime?: Date ;
  id?: number;
  userDto: {
    phoneNumber: string,
    email: string,
    fullName: string
  };
}
export interface TiketDto {
  title?: string;
  level?: number;
  isAdminSide?: true;
  userID?: number;
  dataCreate?: Date;
  dataModified?: Date;
  user?: string;
  tiketContents?: TiketContentDto[];
  id?: number;
  levelString?: string;
  dataCreateString?: string;
  dataModifiedstring?: string;
}
export interface TiketContentDto {
  tiketId?: number;
  isAdminSide?: true;
  text?: string;
  fileURL?: string;
  dataCreate?: Date;
  dataModified?: Date;
  id?: number;
  userID?: number;
  user?: string;
}
export interface Employee {
  dsW_ID1?: string;
  dsW_FNAME?: string;
  dsW_LNAME?: string;
  dsW_DNAME?: string;
  dsW_IDNO?: string;
  dsW_IDPLC?: string;
  dsW_IDATE?: string;
  dsW_BDATE?: string;
  dsW_SEX?: string;
  dsW_NAT?: string;
  jobid?: number;
  peR_NATCOD?: string;
  listEmployeeID?: number;
  jobs?: Jobs;
  id?: number;
  isKarfarma?: boolean;
}
export interface Jobs {
  dsW_JOB?: string;
  dsW_OCP?: string;
  id?: number;
}
