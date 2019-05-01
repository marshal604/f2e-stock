import { StockCreditTradeItem } from '@gql-models/credit-trade/credit-trade.model';
import { CrdeitTradeStatus } from '@shared-models/shared-credit-trade.model';

export interface StockCreditTradeData {
  date: string;
  list: StockCreditTradeDataItem[];
}
export interface StockCreditTradeDataItem extends StockCreditTradeItem {
  compareYesterdayFinancingCount: number;
  compareYesterdaySellingCount: number;
  financingStatus: CrdeitTradeStatus;
  financingStatusContinueCount: number;
  sellingStatus: CrdeitTradeStatus;
  sellingStatusContinueCount: number;
}
