import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryRef } from 'apollo-angular';

import {
  StockOverCountItem,
  StockOverCountStockInfo,
  StockOverCountPersonTrade,
  StockOverCountTradeCount,
  EverydayStockInfoItem,
  EverydayStockInfoItemInput
} from '@stock-over-count/stock-over-count.model';
import { StockInfoService } from '@core/services/stock-info.service';

@Injectable({
  providedIn: 'root'
})
export class StockOverCountService {
  stockOverCountListRef: QueryRef<{ EverydayStockInfoList: EverydayStockInfoItem[] }>;

  constructor(private stockInfoService: StockInfoService) {}

  getStockOverCountOneDayList(): Observable<StockOverCountItem[]> {
    return this.stockInfoService.getStockInfoList().pipe(
      map(data => this.filterOverCountWithPercent(data)),
      map(data => this.filterOverCountOneDay(data))
    );
  }

  getStockOverCountServeralDayList(): Observable<StockOverCountItem[][]> {
    return this.stockInfoService.getStockInfoList().pipe(
      map(data => this.filterOverCountWithPercent(data)),
      map(data => this.filterOverCountServeralDay(data))
    );
  }

  getStockOverCountStockInfo(req): Observable<StockOverCountStockInfo[]> {
    const res: StockOverCountStockInfo[] = [
      {
        date: new Date().toLocaleString(),
        openPrice: 20,
        closePrice: 19,
        highPrice: 21.5,
        lowPrice: 19.5
      }
    ];
    return of(res);
  }

  getStockOverCountPersonTrade(req): Observable<StockOverCountPersonTrade[]> {
    const res: StockOverCountPersonTrade[] = [
      {
        date: new Date().toLocaleString(),
        buyBalance: 1200,
        sellBalance: 1333
      }
    ];
    return of(res);
  }

  getStockOverCountTradeCount(
    req: EverydayStockInfoItemInput
  ): Observable<StockOverCountTradeCount[]> {
    return this.stockInfoService.getStockInfoList(req).pipe(
      map((list: EverydayStockInfoItem[]) => {
        const result = list.reverse().map(item => {
          if (!item) {
            return;
          }
          const tradeCount = +item.stockInfo[0].volumn;
          return {
            date: item.date.slice(4),
            tradeCount
          };
        });
        return result;
      })
    );
  }

  refetchStockOverCountList() {
    this.stockOverCountListRef.refetch();
  }

  private filterOverCountWithPercent(
    data: EverydayStockInfoItem[],
    percent = 0.5,
    atLeastVolumn = 0,
    belowVolumn = 999999,
    cost = 250
  ): EverydayStockInfoItem[] {
    if (!data) {
      return [];
    }
    const baseOverCountItem = data[0].stockInfo;
    const otherOverCountItems = data.slice(1);
    const averageCountObj = this.parseAverageOverCount(data);
    const filterStockCode = baseOverCountItem
      .filter(baseStock => +baseStock.volumn >= atLeastVolumn && +baseStock.volumn <= belowVolumn)
      .filter(baseStock => +baseStock.closePrice <= cost)
      .filter(baseStock => {
        const compareStock = averageCountObj[baseStock.code];
        if (!compareStock) {
          return false;
        }
        const averageVolumn = +compareStock.volumn / compareStock.count;
        return (1 - percent) * +baseStock.volumn > averageVolumn;
      })
      .filter(baseStock => {
        const code = baseStock.code;
        const diffPercent = 0.2;
        // 找前一天與前兩天的成交量差不多的股票
        const dayOne = otherOverCountItems[0].stockInfo.find(stock => stock.code === code);
        const dayTwo = otherOverCountItems[1].stockInfo.find(stock => stock.code === code);
        if (!dayOne || !dayTwo) {
          return false;
        }
        const comparePercent = Math.abs(+dayOne.volumn - +dayTwo.volumn) / +dayOne.volumn;
        return comparePercent <= diffPercent;
      })
      .map(baseStock => baseStock.code);
    const result = data.map(item => ({
      date: item.date,
      stockInfo: item.stockInfo.filter(stock => filterStockCode.includes(stock.code))
    }));
    return result;
  }
  private filterOverCountOneDay(
    data: EverydayStockInfoItem[],
    isDesc = false
  ): StockOverCountItem[] {
    const averageCountObj = this.parseAverageOverCount(data);
    const result = data[0].stockInfo
      .map(baseStock => {
        const compareStock = averageCountObj[baseStock.code];
        const averageVolumn = compareStock.volumn / compareStock.count;
        const tradePercent = +((+baseStock.volumn / averageVolumn) * 100).toFixed(2);
        const stockOverCountItem: StockOverCountItem = {
          name: baseStock.name,
          code: baseStock.code,
          info: {
            tradeCount: +baseStock.volumn,
            tradePercent,
            closePrice: +baseStock.closePrice
          }
        };
        return stockOverCountItem;
      })
      .sort((a, b) => (a.info.tradePercent > b.info.tradePercent ? 1 : -1) * (isDesc ? -1 : 1));
    return result;
  }

  private filterOverCountServeralDay(data: EverydayStockInfoItem[]): StockOverCountItem[][] {
    const result = data.map(item =>
      item.stockInfo.map(
        stock =>
          ({
            name: stock.name,
            code: stock.code,
            info: {
              tradeCount: +stock.volumn,
              closePrice: +stock.closePrice
            }
          } as StockOverCountItem)
      )
    );
    return result;
  }

  private parseAverageOverCount(data: EverydayStockInfoItem[]) {
    const otherOverCountItems = data.slice(1);
    const averageCountObj = otherOverCountItems.reduce((pre, cur) => {
      const { stockInfo } = cur;
      stockInfo.forEach(stock => {
        const volumn = pre[stock.code] ? pre[stock.code].volumn + +stock.volumn : +stock.volumn;
        const count = pre[stock.code] ? pre[stock.code].count + 1 : 1;
        pre[stock.code] = {
          volumn,
          count
        };
      });
      return pre;
    }, {});

    return averageCountObj;
  }
}
