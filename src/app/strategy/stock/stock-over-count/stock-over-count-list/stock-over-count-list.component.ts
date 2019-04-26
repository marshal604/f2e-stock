import { Component, OnInit } from '@angular/core';

import { StockOverCountItem } from '@stock/stock.model';
import { StockOverCountService } from '@stock/stock-over-count/stock-over-count.service';
import { BarChartData } from '@shared/chart/bar-chart/bar-chart.component';

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
    this.stockOverCountService.initStockOverCountList();
    this.stockOverCountService.getStockOverCountOneDayList().subscribe(stockOverCountList => {
      this.stockOverCountList = stockOverCountList;
    });

    this.stockOverCountService.getStockOverCountServeralDayList().subscribe(stockOverCountList => {
      stockOverCountList.forEach((item, index) => {
        item.forEach(stock => {
          if (!this.chartData[stock.subTitle]) {
            this.chartData[stock.subTitle] = [];
          }
          this.chartData[stock.subTitle].push({
            date: index.toString(),
            data: stock.info.tradeCount
          });
        });
      });
    });
  }
}
