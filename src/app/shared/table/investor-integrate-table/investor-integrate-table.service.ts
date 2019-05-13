import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApolloService } from '@core/services/apollo.service';

import { QUERY_INVESTOR_INTEGRATE_LIST } from './investor-integrate-table.graphql';
import {
  GetInvestorIntegrateListInput,
  InvestorIntegrateList
} from '@gql-models/investor/investor-integrate.model';

@Injectable()
export class InvestorIntegrateTableService {
  constructor(private apolloService: ApolloService) {}

  getInvestorIntegrateList(
    req: GetInvestorIntegrateListInput
  ): Observable<InvestorIntegrateList[]> {
    return this.apolloService
      .getApollo()
      .query<{ investorIntegrateList: InvestorIntegrateList[] }>({
        query: QUERY_INVESTOR_INTEGRATE_LIST,
        variables: {
          req
        }
      })
      .pipe(
        map(({ data }) => {
          if (!data && !data.investorIntegrateList) {
            return [];
          }
          return data.investorIntegrateList.reverse().map(
            item =>
              ({
                ...item,
                date: item.date.slice(4)
              } as InvestorIntegrateList)
          );
        })
      );
  }
}
