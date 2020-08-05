import { ApiServiceService,  TiketDto } from 'src/app/core/_services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tikets',
  templateUrl: './tikets.component.html',
  styleUrls: ['./tikets.component.css']
})
export class TiketsComponent implements OnInit {
  datasource: TiketDto[];

  Tikets: TiketDto[];

  totalRecords: number;

  cols: any[];

  loading: boolean;
  constructor(private router: Router,private api: ApiServiceService) { }

  ngOnInit(): void {
    //  this.api.GetTiketscount().subscribe(data => {
    //   this.totalRecords = data.data;
    // });
    //  this.loading = true;
  }
  TikectContentView(id: number) {
    const idtiket = id;
    this.router.navigate(['/Tiket'], { queryParams: { id : idtiket } });
  }
  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    console.log('event.first:' + event.first);
    console.log('event.rows:' + event.rows);
    console.log('event.sortField:' + event.sortField);
    console.log('event.sortOrder:' + event.sortOrder);
    console.log('filters' + event.filters);
    console.log('globalFilter' + event.globalFilter);
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    this.api.GetTiketsbyLazy(event.rows, event.first, event.globalFilter).subscribe(res => {
      this.Tikets = res.data.list;
      this.totalRecords = res.data.count;
      this.loading = false;
    });
  }
}
