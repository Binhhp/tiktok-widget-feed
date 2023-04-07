import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { ODataQuery } from "common/functions/ODataQuery";
import { IQueryDataTable } from "./DataTablesType";
import { IQueryModel } from "common/interfaces/IQueryModel";

export default class DataTableFunc {
  static async BuildPaging<T>(
    url: string,
    pageIndex: number,
    pageNumber: number,
    expand?: string,
    queryCustom?: string,
    req?: any
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
    const requestData: IQueryModel = {
      method: "GET",
      url: urlBuilt,
    };
    if (req) {
      requestData.method = "POST";
      requestData.body = req;
    }
    response = await FetchDataFromServer(requestData);
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
