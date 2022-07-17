import buildQuery from "odata-query";

export class ODataQuery {
  static BuildODataQuery(url: string, page?: IODataPaging, expand?: string) {
    let queryParameters: ODataQueryParameters = {};
    if (page) {
      queryParameters.count = true;
      queryParameters.top = page.pageNumber;
      queryParameters.skip = page.pageNumber * (page.pageIndex - 1);
    }
    if (expand) queryParameters.expand = expand;
    const endpointBuilded = buildQuery(queryParameters);
    return `${url}${endpointBuilded}`;
  }
}
interface ODataQueryParameters {
  top?: number;
  skip?: number;
  count?: boolean;
  expand?: string;
}

interface IODataPaging {
  pageIndex: number;
  pageNumber: number;
}
