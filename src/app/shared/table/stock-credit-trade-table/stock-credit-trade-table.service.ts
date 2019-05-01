import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApolloService } from '@core/services/apollo.service';
import {
  GetStockCreditTradeListInput,
  StockCreditTradeList
} from '@gql-models/credit-trade/credit-trade.model';
import { QUERY_STOCK_CREDIT_TRADE_LIST } from './stock-credit-trade-table.graphql';

@Injectable()
export class StockCreditTradeTableService {
  constructor(private apolloService: ApolloService) {}

  getStockCreditTradeList(req: GetStockCreditTradeListInput): Observable<StockCreditTradeList[]> {
    return this.apolloService
      .getApollo()
      .query<{ stockCreditTradeList: StockCreditTradeList[] }>({
        query: QUERY_STOCK_CREDIT_TRADE_LIST,
        variables: {
          req
        }
      })
      .pipe(
        map(({ data }) => {
          if (!data && !data.stockCreditTradeList) {
            return [];
          }
          return data.stockCreditTradeList.reverse().map(
            item =>
              ({
                date: item.date.slice(4),
                list: item.list
              } as StockCreditTradeList)
          );
        })
      );
  }
}
