import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { StockOverCountStockInfoWithTable } from '@stock/stock.model';

@Component({
  selector: 'yur-stock-info-table',
  templateUrl: './stock-info-table.component.html',
  styleUrls: ['./stock-info-table.component.scss']
})
export class StockInfoTableComponent implements OnInit {
  @Input()
  dataSource: StockOverCountStockInfoWithTable[];
  stockInfoDataSource: MatTableDataSource<StockOverCountStockInfoWithTable>;
  stockInfoHeader = [
    'date',
    'openPrice',
    'closePrice',
    'highPrice',
    'lowPrice',
    'compareHighPriceWithOpenPrice',
    'compareLowPriceWithOpenPrice'
  ];
  constructor() {}

  ngOnInit() {
    this.stockInfoDataSource = new MatTableDataSource(this.dataSource);
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
}
