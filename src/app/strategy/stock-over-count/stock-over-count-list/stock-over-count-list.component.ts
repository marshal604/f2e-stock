import { Component, OnInit } from '@angular/core';

import { StockOverCountItem } from '@stock-over-count/stock-over-count.model';
import { StockOverCountService } from '@stock-over-count/stock-over-count.service';

@Component({
  selector: 'yur-stock-over-count-list',
  templateUrl: './stock-over-count-list.component.html',
  styleUrls: ['./stock-over-count-list.component.scss']
})
export class StockOverCountListComponent implements OnInit {
  stockOverCountList: StockOverCountItem[];
  chartData = {};
  constructor(private stockOverCountService: StockOverCountService) {}

  ngOnInit() {
    this.stockOverCountService.getStockOverCountOneDayList().subscribe(stockOverCountList => {
      this.stockOverCountList = stockOverCountList;
    });

    this.stockOverCountService.getStockOverCountServeralDayList().subscribe(stockOverCountList => {
      stockOverCountList.forEach((item, index) => {
        item.forEach(stock => {
          if (!this.chartData[stock.code]) {
            this.chartData[stock.code] = [];
          }
          this.chartData[stock.code].push({
            date: index.toString(),
            data: stock.info.tradeCount
          });
        });
      });
    });
  }
}
