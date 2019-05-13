import { MarketCreditTradeList } from '@gql-models/credit-trade/credit-trade.model';
import { TradeStatus } from '@shared/models/shared-trade.model';

export interface MarketCreditTradeData extends MarketCreditTradeList {
  calcData: MarketCreditTradeCalcData;
}

export interface MarketCreditTradeCalcData {
  compareYesterdayFinancingCount: number;
  compareYesterdaySellingCount: number;
  financingStatus: TradeStatus;
  financingStatusContinueCount: number;
  sellingStatus: TradeStatus;
  sellingStatusContinueCount: number;
}
