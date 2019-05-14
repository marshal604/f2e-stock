import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  StockOverCountTradeCount,
  EverydayStockInfoItem,
  EverydayStockInfoItemInput
} from '@stock-over-count/stock-over-count.model';
import { StockInfoService } from '@core/services/stock-info.service';

@Injectable()
export class StockInfoChartService {
  constructor(private stockInfoService: StockInfoService) {}

  getStockTradeCount(req: EverydayStockInfoItemInput): Observable<StockOverCountTradeCount[]> {
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
}
