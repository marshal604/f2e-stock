import gql from 'graphql-tag';
export const QUERY_MARKET_CREDIT_TRADE_LIST = gql`
  query($req: GetMarketCreditTradeListInput) {
    marketCreditTradeList(req: $req) {
      date
      financing {
        buy
        sell
        cashRepayment
        yesterdayBalance
        todayBalance
      }
      selling {
        buy
        sell
        cashRepayment
        yesterdayBalance
        todayBalance
      }
      finacingCash {
        buy
        sell
        cashRepayment
        yesterdayBalance
        todayBalance
      }
    }
  }
`;
