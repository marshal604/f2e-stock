import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { StockInfoTableData } from './stock-info-table.model';
import { StockInfoTableService } from './stock-info-table.service';
import { EverydayStockInfoItemInput } from '@gql-models/stock-info/stock-info.model';

@Component({
  selector: 'yur-stock-info-table',
  templateUrl: './stock-info-table.component.html',
  styleUrls: ['./stock-info-table.component.scss'],
  providers: [StockInfoTableService]
})
export class StockInfoTableComponent implements OnInit, OnDestroy {
  @Input() code: string;
  @Input() height: string;
  @Input() width: string;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: StockInfoTableData[];
  stockInfoDataSource: MatTableDataSource<StockInfoTableData>;
  stockInfoHeader = [
    'date',
    'openPrice',
    'closePrice',
    'highPrice',
    'lowPrice',
    'compareHighPriceWithOpenPrice',
    'compareLowPriceWithOpenPrice'
  ];

  private subscription = new Subscription();
  constructor(private stockInfoTableService: StockInfoTableService) {}

  ngOnInit() {
    this.initDataSource();
    this.subscription.add(
      this.queryStockInfoTableData({ code: this.code, dayCount: 30 }).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  mappingStockInfoHeader(header: string) {
    const mapping = {
      date: '日期',
      openPrice: '開盤價錢',
      closePrice: '收盤價錢',
      highPrice: '最高值',
      lowPrice: '最低值',
      compareHighPriceWithOpenPrice: '開盤與最高值相差',
      compareLowPriceWithOpenPrice: '開盤與最低值相差'
    };
    return mapping[header];
  }

  private initDataSource() {
    this.stockInfoDataSource = new MatTableDataSource();
    this.stockInfoDataSource.sort = this.sort;
  }

  private queryStockInfoTableData(
    req: EverydayStockInfoItemInput
  ): Observable<StockInfoTableData[]> {
    return this.stockInfoTableService.getStockInfoTableData(req).pipe(
      tap(data => {
        this.dataSource = data;
        this.stockInfoDataSource.data = data;
      })
    );
  }
}
