import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApolloService } from '@core/services/apollo.service';
import {
  GetMarketCreditTradeListInput,
  MarketCreditTradeList
} from '@gql-models/credit-trade/credit-trade.model';
import { QUERY_MARKET_CREDIT_TRADE_LIST } from './market-credit-trade-table.graphql';

@Injectable()
export class MarketCreditTradeTableService {
  constructor(private apolloService: ApolloService) {}

  getMarketCreditTradeList(
    req: GetMarketCreditTradeListInput
  ): Observable<MarketCreditTradeList[]> {
    return this.apolloService
      .getApollo()
      .query<{ marketCreditTradeList: MarketCreditTradeList[] }>({
        query: QUERY_MARKET_CREDIT_TRADE_LIST,
        variables: {
          req
        }
      })
      .pipe(
        map(({ data }) => {
          if (!data && !data.marketCreditTradeList) {
            return [];
          }
          return data.marketCreditTradeList.reverse().map(
            item =>
              ({
                ...item,
                date: item.date.slice(4)
              } as MarketCreditTradeList)
          );
        })
      );
  }
}
