import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StockInfoService } from '@core/services/stock-info.service';
import {
  EverydayStockInfoItemInput,
  EverydayStockInfoItem
} from '@gql-models/stock-info/stock-info.model';
import { StockInfoTableData } from './stock-info-table.model';

@Injectable()
export class StockInfoTableService {
  constructor(private stockInfoService: StockInfoService) {}

  getStockInfoTableData(req: EverydayStockInfoItemInput): Observable<StockInfoTableData[]> {
    return this.stockInfoService
      .getStockInfoList(req)
      .pipe(map(data => this.parseStockInfoTableData(data)));
  }

  private parseStockInfoTableData(data: EverydayStockInfoItem[]): StockInfoTableData[] {
    return data.map(d => {
      const { openPrice, highPrice, lowPrice, closePrice } = d.stockInfo[0] || ({} as any);
      const parseData: StockInfoTableData = {
        date: d.date.slice(4),
        openPrice: +openPrice,
        highPrice: +highPrice,
        lowPrice: +lowPrice,
        closePrice: +closePrice,
        compareHighPriceWithOpenPrice: +(+highPrice - +openPrice).toFixed(2),
        compareLowPriceWithOpenPrice: +(+lowPrice - +openPrice).toFixed(2)
      };
      return parseData;
    });
  }
}
