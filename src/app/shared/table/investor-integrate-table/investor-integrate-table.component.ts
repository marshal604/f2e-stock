import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Subscription, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { InvestorIntegrateTableService } from './investor-integrate-table.service';
import {
  InvestorIntegrateList,
  GetInvestorIntegrateListInput
} from '@gql-models/investor/investor-integrate.model';
import {
  InvestorIntegrateStockData,
  InvestorIntegrateData
} from './investor-integrate-table.model';
import { TradeStatus } from '@shared/models/shared-trade.model';

@Component({
  selector: 'yur-investor-integrate-table',
  templateUrl: './investor-integrate-table.component.html',
  styleUrls: ['./investor-integrate-table.component.scss'],
  providers: [InvestorIntegrateTableService]
})
export class InvestorIntegrateTableComponent implements OnInit, OnDestroy {
  @Input() height: string;
  @Input() width: string;
  @Input() code: string;
  @Input() dayCount = 5;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<InvestorIntegrateStockData | InvestorIntegrateData>;
  headers: string[];
  private subscriptions = new Subscription();
  constructor(private investorIntegrateTableService: InvestorIntegrateTableService) {}

  ngOnInit() {
    this.initHeader();
    this.initDataSource();

    this.subscriptions.add(
      this.queryInvestorIntegrateList({
        ...(this.code ? { code: this.code } : null),
        dayCount: this.dayCount
      }).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  mappingHeader(header: string) {
    const mapping = {
      date: '日期',
      code: '證券代號',
      name: '證券名稱',
      commonStockCount: '發行股數',
      investorStockCount: '外資持股',
      investorStockPercent: '外資持股比',
      foreignInvestorBuy: '外資買進',
      foreignInvestorSell: '外資賣出',
      foreignInvestorBuyAndSell: '外資買賣超',
      securtiesInvestorBuy: '投信買進',
      securtiesInvestorSell: '投信賣出',
      securtiesInvestorBuyAndSell: '投信買賣超',
      dealerBuy: '自營買進',
      dealerSell: '自營賣出',
      dealerBuyAndSell: '自營買賣超',
      allInvestorBuyAndSell: '法人買賣超',
      foreignInvestorStatus: '外資動向',
      securtiesInvestorStatus: '投信動向',
      dealerStatus: '自營動向',
      allInvestorStatus: '法人動向'
    };
    return mapping[header];
  }

  parseContentWithHeader(
    element: InvestorIntegrateStockData | InvestorIntegrateData,
    header: string
  ) {
    let mapping = {};
    switch (header) {
      case 'date':
      case 'code':
      case 'name':
        return element[header];
      case 'investorStockPercent':
        return element[header] ? `${element[header]}%` : '-';
      case 'foreignInvestorStatus':
        mapping = {
          [TradeStatus.Increase]: '買超',
          [TradeStatus.Decrease]: '賣超',
          [TradeStatus.Zero]: '-'
        };
        return mapping[element[header]] === '-'
          ? '-'
          : `${mapping[element[header]]}${element['foreignInvestorStatusCount']}天`;
      case 'securtiesInvestorStatus':
        mapping = {
          [TradeStatus.Increase]: '買超',
          [TradeStatus.Decrease]: '賣超',
          [TradeStatus.Zero]: '-'
        };
        return mapping[element[header]] === '-'
          ? '-'
          : `${mapping[element[header]]}${element['securtiesInvestorStatusCount']}天`;
      case 'dealerStatus':
        mapping = {
          [TradeStatus.Increase]: '買超',
          [TradeStatus.Decrease]: '賣超',
          [TradeStatus.Zero]: '-'
        };
        return mapping[element[header]] === '-'
          ? '-'
          : `${mapping[element[header]]}${element['dealerStatusCount']}天`;
      case 'allInvestorStatus':
        mapping = {
          [TradeStatus.Increase]: '買超',
          [TradeStatus.Decrease]: '賣超',
          [TradeStatus.Zero]: '-'
        };
        return mapping[element[header]] === '-'
          ? '-'
          : `${mapping[element[header]]}${element['allInvestorStatusCount']}天`;
      default:
        return element[header] || element[header] === 0 ? (element[header] / 1_000).toFixed() : '-';
    }
  }

  isRedStyle(element: InvestorIntegrateStockData | InvestorIntegrateData, header: string): boolean {
    if (header.includes('Status')) {
      return element[header] === TradeStatus.Increase;
    } else if (header.includes('BuyAndSell')) {
      return element[header] > 0;
    }
  }

  isGreenStyle(
    element: InvestorIntegrateStockData | InvestorIntegrateData,
    header: string
  ): boolean {
    if (header.includes('Status')) {
      return element[header] === TradeStatus.Decrease;
    } else if (header.includes('BuyAndSell')) {
      return element[header] < 0;
    }
  }

  isUseHeaderSort(header: string): boolean {
    const list = [
      'date',
      'code',
      'name',
      'foreignInvestorStatus',
      'securtiesInvestorStatus',
      'dealerStatus',
      'allInvestorStatus'
    ];
    return list.includes(header);
  }
  private initDataSource() {
    this.dataSource = new MatTableDataSource();
    if (!this.code) {
      this.dataSource.sortingDataAccessor = (element, header) => {
        if (header.includes('Status')) {
          if (element[header] === TradeStatus.Zero) {
            return 0;
          }
          const count = element[`${header}Count`];
          return element[header] === TradeStatus.Increase ? count : -1 * count;
        }
        return element[header];
      };
    }
    this.dataSource.sort = this.sort;
  }

  private initHeader() {
    this.headers = this.code
      ? [
          'date',
          // 'code',
          // 'name',
          // 'commonStockCount',
          // 'investorStockCount',
          'investorStockPercent',
          'foreignInvestorBuy',
          'foreignInvestorSell',
          'foreignInvestorBuyAndSell',
          'securtiesInvestorBuy',
          'securtiesInvestorSell',
          'securtiesInvestorBuyAndSell',
          'dealerBuy',
          'dealerSell',
          'dealerBuyAndSell',
          'allInvestorBuyAndSell'
        ]
      : [
          'code',
          'name',
          'foreignInvestorStatus',
          'securtiesInvestorStatus',
          'dealerStatus',
          'allInvestorStatus'
        ];
  }
  private queryInvestorIntegrateList(
    req: GetInvestorIntegrateListInput
  ): Observable<InvestorIntegrateList[]> {
    return this.investorIntegrateTableService
      .getInvestorIntegrateList(req)
      .pipe(
        tap(
          data =>
            (this.dataSource.data = this.code
              ? this.parseInvestorIntegrateStockList(data)
              : this.parseInvestorIntegrateTradeStatusList(data))
        )
      );
  }

  private parseInvestorIntegrateStockList(
    list: InvestorIntegrateList[]
  ): InvestorIntegrateStockData[] {
    return list.map(
      item =>
        ({
          date: item.date,
          ...(item.list.length > 0 ? item.list[0] : {})
        } as InvestorIntegrateStockData)
    );
  }

  private parseInvestorIntegrateTradeStatusList(
    list: InvestorIntegrateList[]
  ): InvestorIntegrateData[] {
    const investorIntegrateMap = new Map<string, InvestorIntegrateData>();
    list.forEach(item => {
      item.list.forEach(stock => {
        if (!investorIntegrateMap.get(stock.code)) {
          investorIntegrateMap.set(stock.code, {} as any);
        }
        const investorIntegrateItem = investorIntegrateMap.get(stock.code);
        const foreignInvestorStatus = this.getTradeStatus(stock.foreignInvestorBuyAndSell);
        const securtiesInvestorStatus = this.getTradeStatus(stock.securtiesInvestorBuyAndSell);
        const dealerStatus = this.getTradeStatus(stock.dealerBuyAndSell);
        const allInvestorStatus = this.getTradeStatus(stock.allInvestorBuyAndSell);
        investorIntegrateMap.set(stock.code, {
          code: stock.code,
          name: stock.name,
          foreignInvestorStatus,
          foreignInvestorStatusCount: this.getTradeStatusCount(
            investorIntegrateItem.foreignInvestorStatus,
            foreignInvestorStatus,
            investorIntegrateItem.foreignInvestorStatusCount
          ),
          securtiesInvestorStatus,
          securtiesInvestorStatusCount: this.getTradeStatusCount(
            investorIntegrateItem.securtiesInvestorStatus,
            securtiesInvestorStatus,
            investorIntegrateItem.securtiesInvestorStatusCount
          ),
          dealerStatus,
          dealerStatusCount: this.getTradeStatusCount(
            investorIntegrateItem.dealerStatus,
            dealerStatus,
            investorIntegrateItem.dealerStatusCount
          ),
          allInvestorStatus: allInvestorStatus,
          allInvestorStatusCount: this.getTradeStatusCount(
            investorIntegrateItem.allInvestorStatus,
            allInvestorStatus,
            investorIntegrateItem.allInvestorStatusCount
          )
        });
      });
    });
    return Array.from(investorIntegrateMap.values());
  }

  private getTradeStatus(value: number): TradeStatus {
    return value === 0 ? TradeStatus.Zero : value > 0 ? TradeStatus.Increase : TradeStatus.Decrease;
  }

  private getTradeStatusCount(
    originStatus: TradeStatus,
    newStatus: TradeStatus,
    count: number
  ): number {
    return originStatus === newStatus ? count + 1 : 1;
  }
}
