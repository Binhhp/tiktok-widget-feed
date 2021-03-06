import { AddTagProductRequest } from "repositories/dtos/requests/AddTagProductRequest";
import { RootURL } from "common/constants/RootURL";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { CreateWidgetRequest } from "repositories/dtos/requests/CreateWidgetRequest";
import { IWidgetReponsitory } from "repositories/interfaces/IWidgetReponsitory";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import {
  ITikTokVideoDto,
  IVideoTemplateModel,
} from "Dependencies/LayoutTemplate/LayoutTemplateModel";
import { ODataQuery } from "common/functions/ODataQuery";
import DataTableFunc from "Dependencies/DataTables/DataTableModel";
import { IWidgetResponse } from "repositories/dtos/responses/WidgetResponse";

export class WidgetReponsitory implements IWidgetReponsitory {
  GetByIds = async (widgetIds: string[]) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${
        RootURL.ApiBase
      }/odata/shopWidgets('${widgetIds.toString()}')?$expand=products,shops`,
    });
    if (response.Status) {
      response.Data = response.Data?.value;
    }
    return response;
  };
  GetVideos = async (
    key: string,
    pageIndex: number
  ): Promise<IVideoTemplateModel> => {
    return DataTableFunc.BuildPaging<ITikTokVideoDto>(
      `${RootURL.ApiBase}/odata/widgetVideos('${key}')`,
      pageIndex,
      50,
      "video,music,challenges"
    );
  };

  Create = async (
    req: CreateWidgetRequest,
    domain?: string
  ): Promise<BaseResponse> => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/RegisterWidget`,
      body: req,
    });
    return response;
  };

  Get = async (pageIndex?: number, domain?: string) => {
    let url = `${RootURL.ApiBase}/odata/shops('${domain}')/widgets?$expand=products,shops&$count=true`;
    if (pageIndex) {
      url = ODataQuery.BuildODataQuery(
        `${RootURL.ApiBase}/odata/shops('${domain}')/widgets`,
        {
          pageIndex: pageIndex,
          pageNumber: 10,
        },
        "products,shops"
      );
    }
    const response = await FetchDataFromServer({
      method: "GET",
      url: url,
    });
    if (response.Status) {
      const result = response.Data;
      const data = result?.value as IWidgetResponse[];
      return {
        count: result["@odata.count"] || result?.value.length || 0,
        data: data,
      };
    }
    return {
      count: 0,
      data: [],
    };
  };

  Delete = async (key: string) => {
    const response = await FetchDataFromServer({
      method: "DELETE",
      url: `${RootURL.ApiBase}/odata/widgets('${key}')`,
    });
    return response;
  };

  GetById = async (key: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/widgets('${key}')?$expand=products,shops`,
    });
    return response;
  };

  Update = async (key: string, req: CreateWidgetRequest) => {
    const response = await FetchDataFromServer({
      method: "PUT",
      url: `${RootURL.ApiBase}/odata/widgets('${key}')`,
      body: req,
    });
    return response;
  };

  AddTagProducts = async (
    key: string,
    req: AddTagProductRequest
  ): Promise<BaseResponse> => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/widgets('${key}')/UpdateProduct`,
      body: req,
    });
    return response;
  };
}
