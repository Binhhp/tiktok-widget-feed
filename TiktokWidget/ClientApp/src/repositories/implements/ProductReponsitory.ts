import { RootURL } from "common/constants/RootURL";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { IProductReponsitory } from "repositories/interfaces/IProductReponsitory";

export class ProductReponsitory implements IProductReponsitory {
  Get = async (pageIndex: number, domain?: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/products?page=${pageIndex}`,
    });
    if (response.Status) {
      const result = response.Data;
      return {
        count: result["@odata.count"] ?? result?.value.length ?? 0,
        data: result?.value as BaseProduct[],
      };
    }
    return {
      count: 0,
      data: [],
    };
  };
}
