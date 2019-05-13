import { InvestorIntegrateItem } from '@gql-models/investor/investor-integrate.model';
import { TradeStatus } from '@shared/models/shared-trade.model';

export interface InvestorIntegrateStockData extends InvestorIntegrateItem {
  date: string;
}

export interface InvestorIntegrateData {
  code: string;
  name: string;
  foreignInvestorStatus: TradeStatus;
  foreignInvestorStatusCount: number;
  securtiesInvestorStatus: TradeStatus;
  securtiesInvestorStatusCount: number;
  dealerStatus: TradeStatus;
  dealerStatusCount: number;
  allInvestorStatus: TradeStatus;
  allInvestorStatusCount: number;
}
