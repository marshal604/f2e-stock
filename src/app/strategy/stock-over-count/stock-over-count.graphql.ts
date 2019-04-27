import gql from 'graphql-tag';
export const queryStockOverCountList = gql`
  query EverydayStockInfoList($req: EverydayStockInfoItemInput) {
    EverydayStockInfoList(req: $req) {
      date
      stockInfo {
        code
        name
        volumn
        closePrice
      }
    }
  }
`;
