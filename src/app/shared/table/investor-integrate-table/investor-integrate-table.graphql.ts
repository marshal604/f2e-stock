import gql from 'graphql-tag';
export const QUERY_INVESTOR_INTEGRATE_LIST = gql`
  query($req: GetInvestorIntegrateListInput) {
    investorIntegrateList(req: $req) {
      date
      list {
        code
        name
        commonStockCount
        investorStockCount
        investorStockPercent
        foreignInvestorBuy
        foreignInvestorSell
        foreignInvestorBuyAndSell
        securtiesInvestorBuy
        securtiesInvestorSell
        securtiesInvestorBuyAndSell
        dealerBuy
        dealerSell
        dealerBuyAndSell
        allInvestorBuyAndSell
      }
    }
  }
`;
