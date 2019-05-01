import { MarketCreditTradeList } from '@gql-models/credit-trade/credit-trade.model';
import { CrdeitTradeStatus } from '@shared-models/shared-credit-trade.model';

export interface MarketCreditTradeData extends MarketCreditTradeList {
  calcData: MarketCreditTradeCalcData;
}

export interface MarketCreditTradeCalcData {
  compareYesterdayFinancingCount: number;
  compareYesterdaySellingCount: number;
  financingStatus: CrdeitTradeStatus;
  financingStatusContinueCount: number;
  sellingStatus: CrdeitTradeStatus;
  sellingStatusContinueCount: number;
}
