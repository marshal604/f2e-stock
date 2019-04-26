import { Component, OnInit } from '@angular/core';

import { StockList } from '@stock/stock.model';

@Component({
  selector: 'yur-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  stockList: StockList[];
  constructor() {}

  ngOnInit() {
    this.initStockList();
  }

  private initStockList() {
    this.stockList = [
      {
        title: '近幾日暴量的股票',
        describe: '近期爆量的股票，可能是機會也可能是逃命波，可以根據數據做簡易判別。'
      }
    ];
  }
}
