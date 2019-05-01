import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  MarketCreditTradeList,
  GetMarketCreditTradeListInput
} from '@gql-models/credit-trade/credit-trade.model';
import { MarketCreditTradeTableService } from './market-credit-trade-table.service';
import {
  MarketCreditTradeData,
  MarketCreditTradeCalcData
} from './market-credit-trade-table.model';
import { CrdeitTradeStatus } from '@shared-models/shared-credit-trade.model';

@Component({
  selector: 'yur-market-credit-trade-table',
  templateUrl: './market-credit-trade-table.component.html',
  styleUrls: ['./market-credit-trade-table.component.scss'],
  providers: [MarketCreditTradeTableService]
})
export class MarketCreditTradeTableComponent implements OnInit, OnDestroy {
  @Input() height: string;
  @Input() width: string;
  @Input() dayCount = 5;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<MarketCreditTradeData>;
  headers = [
    'date',
    'financingTodayBalance',
    'compareYesterdayFinancingCount',
    'financingStatus',
    'sellingTodayBalance',
    'compareYesterdaySellingCount',
    'sellingStatus'
  ];
  private subscriptions = new Subscription();
  constructor(private marketCreditTradeTableService: MarketCreditTradeTableService) {}

  ngOnInit() {
    this.initDataSource();
    this.subscriptions.add(
      this.queryMarketCreditTradeList({ dayCount: this.dayCount }).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  mappingHeader(header: string) {
    const mapping = {
      date: '日期',
      financingTodayBalance: '融資餘額',
      compareYesterdayFinancingCount: '融資上升',
      financingStatus: '資買狀態',
      sellingTodayBalance: '融券餘額',
      compareYesterdaySellingCount: '融券上升',
      sellingStatus: '券賣狀態'
    };
    return mapping[header];
  }

  parseContentWithHeader(element: MarketCreditTradeData, header: string) {
    let mapping = {};
    switch (header) {
      case 'date':
        return element.date;
      case 'financingTodayBalance':
        return element.financing.todayBalance;
      case 'sellingTodayBalance':
        return element.selling.todayBalance;
      case 'financingStatus':
        mapping = {
          [CrdeitTradeStatus.Increase]: '資增',
          [CrdeitTradeStatus.Decrease]: '資減',
          [CrdeitTradeStatus.Zero]: '-'
        };
        return mapping[element.calcData[header]] === '-'
          ? '-'
          : `${mapping[element.calcData[header]]}${
              element.calcData['financingStatusContinueCount']
            }天`;
      case 'sellingStatus':
        mapping = {
          [CrdeitTradeStatus.Increase]: '券增',
          [CrdeitTradeStatus.Decrease]: '券減',
          [CrdeitTradeStatus.Zero]: '-'
        };
        return mapping[element.calcData[header]] === '-'
          ? '-'
          : `${mapping[element.calcData[header]]}${element.calcData.sellingStatusContinueCount}天`;
      default:
        return element.calcData[header];
    }
  }

  isRedStyle(element: MarketCreditTradeData, header: string): boolean {
    if (!header.includes('Status')) {
      return false;
    }
    return element.calcData[header] === CrdeitTradeStatus.Increase;
  }

  isGreenStyle(element: MarketCreditTradeData, header: string): boolean {
    if (!header.includes('Status')) {
      return false;
    }
    return element.calcData[header] === CrdeitTradeStatus.Decrease;
  }

  private initDataSource() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
  }

  private queryMarketCreditTradeList(
    req: GetMarketCreditTradeListInput
  ): Observable<MarketCreditTradeList[]> {
    return this.marketCreditTradeTableService
      .getMarketCreditTradeList(req)
      .pipe(tap(data => (this.dataSource.data = this.calcMarketCreditTradeList(data))));
  }

  private calcMarketCreditTradeList(data: MarketCreditTradeList[]): MarketCreditTradeData[] {
    let financingStatusContinueCount: number;
    let sellingStatusContinueCount: number;
    let financingStatus: CrdeitTradeStatus;
    let sellingStatus: CrdeitTradeStatus;
    return data.map(item => {
      const financingCount = +item.financing.todayBalance - +item.financing.yesterdayBalance;
      const sellingCount = +item.selling.todayBalance - +item.selling.yesterdayBalance;
      const newFinancingStatus =
        financingCount === 0
          ? CrdeitTradeStatus.Zero
          : financingCount >= 0
          ? CrdeitTradeStatus.Increase
          : CrdeitTradeStatus.Decrease;
      const newSellingStatus =
        sellingCount === 0
          ? CrdeitTradeStatus.Zero
          : sellingCount >= 0
          ? CrdeitTradeStatus.Increase
          : CrdeitTradeStatus.Decrease;
      financingStatusContinueCount =
        newFinancingStatus === financingStatus ? financingStatusContinueCount + 1 : 1;
      sellingStatusContinueCount =
        newSellingStatus === sellingStatus ? sellingStatusContinueCount + 1 : 1;
      financingStatus = newFinancingStatus;
      sellingStatus = newSellingStatus;
      const calcData: MarketCreditTradeCalcData = {
        compareYesterdayFinancingCount: financingCount,
        compareYesterdaySellingCount: sellingCount,
        financingStatus,
        financingStatusContinueCount,
        sellingStatus,
        sellingStatusContinueCount
      };
      return {
        ...item,
        calcData
      } as MarketCreditTradeData;
    });
  }
}
