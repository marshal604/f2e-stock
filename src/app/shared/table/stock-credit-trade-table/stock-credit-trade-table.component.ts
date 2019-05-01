import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  StockCreditTradeList,
  GetStockCreditTradeListInput
} from '@gql-models/credit-trade/credit-trade.model';
import { StockCreditTradeTableService } from './stock-credit-trade-table.service';
import {
  StockCreditTradeData,
  CrdeitTradeStatus,
  StockCreditTradeDataItem
} from './stock-credit-trade-table.model';

@Component({
  selector: 'yur-stock-credit-trade-table',
  templateUrl: './stock-credit-trade-table.component.html',
  styleUrls: ['./stock-credit-trade-table.component.scss'],
  providers: [StockCreditTradeTableService]
})
export class StockCreditTradeTableComponent implements OnInit, OnDestroy {
  @Input() code: string;
  @Input() height: string;
  @Input() width: string;
  @Input() dayCount = 5;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<StockCreditTradeData>;
  headers = [
    'date',
    // 'code',
    // 'name',
    'financingBuy',
    'financingSell',
    // 'financingCashRepayment',
    // 'financingYesterdayBalance',
    'financingTodayBalance',
    'compareYesterdayFinancingCount',
    'financingStatus',
    // 'financingLimit',
    'sellingBuy',
    'sellingSell',
    // 'sellingCashRepayment',
    // 'sellingYesterdayBalance',
    'sellingTodayBalance',
    'compareYesterdaySellingCount',
    'sellingStatus',
    // 'sellingLimit',
    'payment',
    'remark'
  ];
  private subscriptions = new Subscription();
  constructor(private stockCreditTradeTableService: StockCreditTradeTableService) {}

  ngOnInit() {
    this.initDataSource();
    this.subscriptions.add(
      this.queryStockCreditTradeList({ code: this.code, dayCount: this.dayCount }).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  mappingHeader(header: string) {
    const mapping = {
      date: '日期',
      code: '股票代號',
      name: '股票名稱',
      financingBuy: '融資買進',
      financingSell: '融資賣出',
      financingCashRepayment: '融資現金償還',
      financingYesterdayBalance: '融資前日餘額',
      financingTodayBalance: '融資餘額',
      financingLimit: '融資限額',
      sellingBuy: '融券買進',
      sellingSell: '融券賣出',
      sellingCashRepayment: '融券現金償還',
      sellingYesterdayBalance: '融券前日餘額',
      sellingTodayBalance: '融券餘額',
      sellingLimit: '融券限額',
      payment: '資券互抵',
      compareYesterdayFinancingCount: '資買上升',
      compareYesterdaySellingCount: '券賣上升',
      financingStatus: '資買狀態',
      sellingStatus: '券賣狀態',
      remark: '註記'
    };
    return mapping[header];
  }

  parseContentWithHeader(element: StockCreditTradeList, header: string) {
    if (header !== 'date' && element.list.length === 0) {
      return '-';
    }
    let mapping = {};
    switch (header) {
      case 'date':
        return element[header];
      case 'financingStatus':
        mapping = {
          [CrdeitTradeStatus.Increase]: '資增',
          [CrdeitTradeStatus.Decrease]: '資減',
          [CrdeitTradeStatus.Zero]: '-'
        };
        return mapping[element.list[0][header]] === '-'
          ? '-'
          : `${mapping[element.list[0][header]]}${
              element.list[0]['financingStatusContinueCount']
            }天`;
      case 'sellingStatus':
        mapping = {
          [CrdeitTradeStatus.Increase]: '券增',
          [CrdeitTradeStatus.Decrease]: '券減',
          [CrdeitTradeStatus.Zero]: '-'
        };
        return mapping[element.list[0][header]] === '-'
          ? '-'
          : `${mapping[element.list[0][header]]}${element.list[0]['sellingStatusContinueCount']}天`;
      case 'remark':
        return element.list[0][header] || '-';
      default:
        return element.list[0][header];
    }
  }

  isRedStyle(element: StockCreditTradeData, header: string): boolean {
    if (!header.includes('Status') || element.list.length === 0) {
      return false;
    }
    return element.list[0][header] === CrdeitTradeStatus.Increase;
  }

  isGreenStyle(element: StockCreditTradeData, header: string): boolean {
    if (!header.includes('Status') || element.list.length === 0) {
      return false;
    }
    return element.list[0][header] === CrdeitTradeStatus.Decrease;
  }

  getTitle(element: StockCreditTradeData, header: string): string {
    if (header !== 'remark') {
      return;
    }
    return 'O：停止融資, X：停止融券, @：融資分配, %：融券分配';
  }
  private initDataSource() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
  }

  private queryStockCreditTradeList(
    req: GetStockCreditTradeListInput
  ): Observable<StockCreditTradeList[]> {
    return this.stockCreditTradeTableService
      .getStockCreditTradeList(req)
      .pipe(tap(data => (this.dataSource.data = this.calcStockCreditTradeList(data))));
  }

  private calcStockCreditTradeList(data: StockCreditTradeList[]): StockCreditTradeData[] {
    let financingStatusContinueCount: number;
    let sellingStatusContinueCount: number;
    let financingStatus: CrdeitTradeStatus;
    let sellingStatus: CrdeitTradeStatus;
    return data.map(item => ({
      date: item.date,
      list: item.list.map(stock => {
        const financingCount = +stock.financingTodayBalance - +stock.financingYesterdayBalance;
        const sellingCount = +stock.sellingTodayBalance - +stock.sellingYesterdayBalance;
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
        return {
          ...stock,
          compareYesterdayFinancingCount: financingCount,
          compareYesterdaySellingCount: sellingCount,
          financingStatus,
          financingStatusContinueCount,
          sellingStatus,
          sellingStatusContinueCount
        } as StockCreditTradeDataItem;
      })
    }));
  }
}
