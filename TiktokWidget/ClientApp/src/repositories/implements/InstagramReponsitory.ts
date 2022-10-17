import { RootURL } from "common/constants/RootURL";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { ODataQuery } from "common/functions/ODataQuery";
import { AddTagProductRequest } from "repositories/dtos/requests/AddTagProductRequest";
import { SetInstagramWidgetRequest } from "repositories/dtos/requests/SetInstagramWidgetRequest";
import { BaseInstagramWidget } from "repositories/dtos/responses/BaseInstagramWidget";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import { IInstagramReponsitory } from "./../interfaces/IInstagramReponsitory";

export class InstagramReponsitory implements IInstagramReponsitory {
  Delete = async (key: string) => {
    const response = await FetchDataFromServer({
      method: "DELETE",
      url: `${RootURL.ApiBase}/odata/instagramWidgets('${key}')`,
    });
    return response;
  };

  GetById = async (key: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/instagramWidgets('${key}')?$expand=products,shops`,
    });
    return response;
  };

  GetByIds = async (widgetIds: string[]) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${
        RootURL.ApiBase
      }/odata/shopWidgets('${widgetIds.toString()}')?$expand=products,shops&type=1`,
    });
    if (response.Status) {
      response.Data = response.Data?.value;
    }
    return response;
  };

  Get = async (pageIndex?: number, domain?: string) => {
    let url = `${RootURL.ApiBase}/odata/shops('${domain}')/InstagramWidgets?$expand=products,shops&$count=true`;
    if (pageIndex) {
      url = ODataQuery.BuildODataQuery(
        `${RootURL.ApiBase}/odata/shops('${domain}')/InstagramWidgets`,
        {
          pageIndex: pageIndex,
          pageNumber: 10,
        },
        "products,shops"
      );
    }
    const response = await FetchDataFromServer({ method: "GET", url: url });
    if (response.Status) {
      const result = response.Data;
      const data = result?.value as BaseInstagramWidget[];
      return {
        count: result["@odata.count"] || result?.value.length || 0,
        data: data,
      };
    }
    return { count: 0, data: [] };
  };

  Create = async (
    req: SetInstagramWidgetRequest,
    domain?: string
  ): Promise<BaseResponse> => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/RegisterInstagramWidgets`,
      body: req,
    });
    return response;
  };

  Update = async (key: string, req: SetInstagramWidgetRequest) => {
    const response = await FetchDataFromServer({
      method: "PUT",
      url: `${RootURL.ApiBase}/odata/instagramWidgets('${key}')`,
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
      url: `${RootURL.ApiBase}/odata/instagramWidgets('${key}')/UpdateProduct`,
      body: req,
    });
    return response;
  };
}
