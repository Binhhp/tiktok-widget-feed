import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { ODataQuery } from "common/functions/ODataQuery";
import { IQueryDataTable } from "./DataTablesType";

export default class DataTableFunc {
  static async BuildPaging<T>(
    url: string,
    pageIndex: number,
    pageNumber: number,
    expand?: string
  ): Promise<IQueryDataTable<T>> {
    const urlBuilt = ODataQuery.BuildODataQuery(
      url,
      {
        pageIndex: pageIndex,
        pageNumber: pageNumber,
      },
      expand
    );
    const response = await FetchDataFromServer({
      method: "GET",
      url: urlBuilt,
    });
    if (response.Status) {
      const result = response.Data;
      return {
        count: result["@odata.count"] ?? result?.value.length ?? 0,
        data: result?.value as T[],
      };
    }
    return {
      count: 0,
      data: [],
    };
  }
}
