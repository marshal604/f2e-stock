import { StockCreditTradeItem } from '@gql-models/credit-trade/credit-trade.model';
import { TradeStatus } from '@shared/models/shared-trade.model';

export interface StockCreditTradeData {
  date: string;
  list: StockCreditTradeDataItem[];
}
export interface StockCreditTradeDataItem extends StockCreditTradeItem {
  compareYesterdayFinancingCount: number;
  compareYesterdaySellingCount: number;
  financingStatus: TradeStatus;
  financingStatusContinueCount: number;
  sellingStatus: TradeStatus;
  sellingStatusContinueCount: number;
}
