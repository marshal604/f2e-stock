export {
  EverydayStockInfoItem,
  EverydayStockInfo,
  EverydayStockInfoItemInput
} from '@gql-models/stock-info/stock-info.model';

export interface StockList {
  title: string;
  describe: string;
  icon?: string;
}

export interface StockTitle {
  title: string;
  subTitle: string;
}

export interface StockOverCountItemInfo {
  tradeCount: number;
  closePrice: number;
  tradePercent?: number;
}

export interface StockOverCountItem extends StockTitle {
  info: StockOverCountItemInfo;
}

export interface StockOverCountStockInfo {
  date: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
}

export interface StockOverCountStockInfoWithTable extends StockOverCountStockInfo {
  compareHighPriceWithOpenPrice: number;
  compareLowPriceWithOpenPrice: number;
}

export interface StockOverCountPersonTrade {
  date: string;
  buyBalance: number;
  sellBalance: number;
}

export interface StockOverCountTradeCount {
  date: string;
  tradeCount: number;
}
