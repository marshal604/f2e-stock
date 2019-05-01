import gql from 'graphql-tag';
export const QUERY_STOCK_CREDIT_TRADE_LIST = gql`
  query($req: GetStockCreditTradeListInput) {
    stockCreditTradeList(req: $req) {
      date
      list {
        code
        name
        financingBuy
        financingSell
        financingCashRepayment
        financingYesterdayBalance
        financingTodayBalance
        financingLimit
        sellingBuy
        sellingSell
        sellingCashRepayment
        sellingYesterdayBalance
        sellingTodayBalance
        sellingLimit
        payment
        remark
      }
    }
  }
`;
