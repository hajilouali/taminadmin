import { ApiServiceService, PaymentHisstory } from 'src/app/core/_services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';
import * as moment from 'jalali-moment';
declare function datapikerali(): any;
@Component({
  selector: 'app-users-payment',
  templateUrl: './users-payment.component.html',
  styleUrls: ['./users-payment.component.css']
})
export class UsersPaymentComponent implements OnInit {
  dto: {
    startDate: string,
    endDate: string
  };
  cols: any[];
  selectedusers: string ;

  exportColumns: any[];
  total = 0;
  faild = 0 ;
  users:string[] = [];
  result: PaymentHisstory[];
  constructor(private api: ApiServiceService) { }

  ngOnInit(): void {

    this.dto = {
      startDate : moment(Date.now()).jDate(1).format('jYYYY/jMM/jDD'),
      endDate: moment(Date.now()).format('jYYYY/jMM/jDD')

    };
    this.api.getPaymentHistory(this.dto).subscribe(res => {
      this.result = res.data;
      res.data.forEach(element => {
        if (this.users.indexOf(element.username) > -1) {
          this.users.push(element.username);
        }
        if (element.isSucess) {
          this.total += element.price;
        } else {
          this.faild += element.price;
        }
      });
    });
    datapikerali();
    this.cols = [
      { field: 'username', header: 'کاربر' },
      { field: 'price', header: 'مبلغ' },
      { field: 'gateway', header: 'درگاه' },
      { field: 'isSucess', header: 'وضعیت' },
      { field: 'dateTime', header: 'تاریخ' },
      { field: 'trackingnumber', header: 'کد رهگیری سایت' },
      { field: 'transactioncode', header: 'رهگیری بانک' }
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  submitfilter(start, end ) {
    this.dto.startDate = start;
    this.dto.endDate = end;
    this.total = 0 ;
    this.users = [];
    this.api.getPaymentHistory(this.dto).subscribe(res => {
      this.result = res.data;
      res.data.forEach(element => {
        if (!((this.users.indexOf(element.username)) > -1)) {
          this.users.push(element.username);
        }
        if (element.isSucess) {
          this.total += element.price;
        } else {
          this.faild += element.price;
        }
      });
    });
    console.log(this.users);
  }
  exportPdf() {
    import('jspdf').then(jsPDF => {
        import('jspdf-autotable').then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.exportColumns, this.result);
            doc.save('products.pdf');
        })
    })
}

exportExcel() {
    import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.result);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'products');
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
}
}
