import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { ODataQuery } from "common/functions/ODataQuery";
import { IQueryDataTable } from "./DataTablesType";

export default class DataTableFunc {
  static async BuildPaging<T>(
    url: string,
    pageIndex: number,
    pageNumber: number,
    expand?: string,
    queryCustom?: string
  ): Promise<IQueryDataTable<T>> {
    let urlBuilt = ODataQuery.BuildODataQuery(
      url,
      {
        pageIndex: pageIndex,
        pageNumber: pageNumber,
      },
      expand
    );
    let response = new BaseResponse();
    if (queryCustom) {
      urlBuilt += `&${queryCustom}`;
    }
    response = await FetchDataFromServer({
      method: "GET",
      url: urlBuilt,
    });
    if (response.Status) {
      const result = response.Data;
      return {
        count: result["@odata.count"] ?? result?.value.length ?? 0,
        data: result?.value as T[],
      };
    } else {
      return Promise.reject(response.Error);
    }
  }
}
