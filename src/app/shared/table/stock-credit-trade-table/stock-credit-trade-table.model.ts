import { StockCreditTradeItem } from '@gql-models/credit-trade/credit-trade.model';

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

export enum CrdeitTradeStatus {
  Increase = 1,
  Decrease,
  Zero
}
