import { RootURL } from "common/constants/RootURL";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { ProductResponse } from "repositories/dtos/responses/ProductResponse";
export default class ProductAPI {
  static Get = async (pageIndex: number, domain?: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/products?page=${pageIndex}`,
    });
    if (response.Status) {
      const result = response.Data;
      return {
        count: result["@odata.count"] ?? result?.value.length ?? 0,
        data: result?.value as ProductResponse[],
      };
    }
    return {
      count: 0,
      data: [],
    };
  };
}
