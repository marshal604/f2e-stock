import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  StockOverCountStockInfoWithTable,
  StockOverCountStockInfo,
  StockOverCountPersonTrade,
  StockOverCountTradeCount,
  EverydayStockInfoItemInput
} from '@stock/stock.model';
import { StockOverCountService } from '@stock/stock-over-count/stock-over-count.service';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'yur-stock-over-count-detail',
  templateUrl: './stock-over-count-detail.component.html',
  styleUrls: ['./stock-over-count-detail.component.scss']
})
export class StockOverCountDetailComponent implements OnInit, OnDestroy {
  title: string;
  code: string;
  stockInfoDataSource: StockOverCountStockInfoWithTable[];
  personTradeDataSource: StockOverCountPersonTrade[];
  tradeCountChartData: StockOverCountTradeCount[];

  private subscription = new Subscription();
  constructor(
    private stockOverCountService: StockOverCountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // @TODO: combine these obsevable
    this.title = this.route.snapshot.params['title'];
    this.code = this.route.snapshot.params['id'];
    const req = {
      id: this.code
    };
    this.subscription.add(
      this.stockOverCountService
        .getStockOverCountStockInfo(req)
        .pipe(map(this.parseStockOverCountStockInfo))
        .subscribe((data: StockOverCountStockInfoWithTable[]) => {
          this.stockInfoDataSource = data;
        })
    );
    this.subscription.add(
      this.stockOverCountService
        .getStockOverCountPersonTrade(req)
        .subscribe((data: StockOverCountPersonTrade[]) => {
          this.personTradeDataSource = data;
        })
    );
    const tradeCountReq: EverydayStockInfoItemInput = {
      code: this.route.snapshot.params['id'],
      dayCount: 30
    };
    this.subscription.add(
      this.stockOverCountService
        .getStockOverCountTradeCount(tradeCountReq)
        .subscribe((data: StockOverCountTradeCount[]) => {
          this.tradeCountChartData = data;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private parseStockOverCountStockInfo(
    data: StockOverCountStockInfo[]
  ): StockOverCountStockInfoWithTable[] {
    return data.map(d => {
      const parseData: StockOverCountStockInfoWithTable = {
        ...d,
        compareHighPriceWithOpenPrice: d.highPrice - d.openPrice,
        compareLowPriceWithOpenPrice: d.lowPrice - d.openPrice
      };
      return parseData;
    });
  }
}
