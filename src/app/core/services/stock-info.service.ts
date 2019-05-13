import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

import { ApolloService } from '@core/services/apollo.service';
import {
  EverydayStockInfoItemInput,
  EverydayStockInfoItem,
  EverydayStockInfo
} from '@gql-models/stock-info/stock-info.model';
import { map } from 'rxjs/operators';

const QUERY_EVERYDAY_STOCK_INFO_LIST = gql`
  query($req: EverydayStockInfoItemInput) {
    everydayStockInfoList(req: $req) {
      date
      stockInfo {
        code
        name
        volumn
        openPrice
        highPrice
        lowPrice
        closePrice
        raisePoint
        raisePercent
        PE
      }
    }
  }
`;

const QUERY_EVERYDAY_STOCK_NAME = gql`
  query($req: EverydayStockInfoItemInput) {
    everydayStockInfoList(req: $req) {
      stockInfo {
        code
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class StockInfoService {
  constructor(private apolloService: ApolloService) {}

  getStockName(req: EverydayStockInfoItemInput): Observable<EverydayStockInfo> {
    return this.apolloService
      .getApollo()
      .query<{ everydayStockInfoList: EverydayStockInfoItem[] }>({
        query: QUERY_EVERYDAY_STOCK_NAME,
        variables: {
          req
        }
      })
      .pipe(
        map(({ data }) => {
          try {
            return data.everydayStockInfoList[0].stockInfo[0];
          } catch (err) {
            return null;
          }
        })
      );
  }

  getStockInfoList(req?: EverydayStockInfoItemInput): Observable<EverydayStockInfoItem[]> {
    return this.apolloService
      .getApollo()
      .query<{ everydayStockInfoList: EverydayStockInfoItem[] }>({
        query: QUERY_EVERYDAY_STOCK_INFO_LIST,
        variables: {
          req
        }
      })
      .pipe(map(({ data }) => data.everydayStockInfoList));
  }
}
