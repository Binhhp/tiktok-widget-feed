import { AddTagProductRequest } from "repositories/dtos/requests/AddTagProductRequest";
import { RootURL } from "common/constants/RootURL";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { CreateWidgetRequest } from "repositories/dtos/requests/CreateWidgetRequest";
import { IWidgetReponsitory } from "repositories/interfaces/IWidgetReponsitory";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import {
  ITikTokVideoDto,
  IVideoTemplateModel,
} from "Dependencies/TikTokLayout/LayoutTemplateModel";
import { ODataQuery } from "common/functions/ODataQuery";
import DataTableFunc from "Dependencies/DataTables/DataTableModel";
import { BaseTikTokWidget } from "repositories/dtos/responses/BaseTikTokWidget";
import { UpdateWidgetRequest } from "repositories/dtos/requests/UpdateWidgetRequest";
import config from "config";
import { AddJobRequest } from "repositories/dtos/requests/AddJobRequest";
import { GetVideoByJobRequest } from "repositories/dtos/requests/GetVideoByJobRequest";
import SetClickPostRequest from "repositories/dtos/requests/SetClickPostRequest";

export class WidgetReponsitory implements IWidgetReponsitory {
  AddJob = async (domain?: string, req?: AddJobRequest) => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/AddJob`,
      body: req,
    });
    return response;
  };
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
    pageIndex: number,
    showItems?: number
  ): Promise<IVideoTemplateModel> => {
    try {
      return DataTableFunc.BuildPaging<ITikTokVideoDto>(
        `${RootURL.ApiBase}/odata/TikTokVideos('${key}')`,
        pageIndex,
        showItems ? showItems : config.showItems,
        "video,music,challenges"
      );
    } catch {
      return Promise.resolve({
        data: [],
        count: 0,
      });
    }
  };

  PostClick = async (key: string, req: SetClickPostRequest) => {
    return await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/TikTokVideos('${key}')/SetClicks`,
      body: req,
    });
  };

  GetVideosByJob = async (
    req: GetVideoByJobRequest,
    showItems?: number
  ): Promise<IVideoTemplateModel> => {
    return DataTableFunc.BuildPaging<ITikTokVideoDto>(
      `${RootURL.ApiBase}/odata/TikTokVideos`,
      1,
      showItems ? showItems : config.showItems,
      "video,music,challenges",
      `data=${req.data}&type=${req.type}`
    );
  };

  Create = async (
    req: CreateWidgetRequest,
    domain?: string
  ): Promise<BaseResponse> => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/RegisterTikTokWidget`,
      body: req,
    });
    return response;
  };

  Get = async (pageIndex?: number, domain?: string) => {
    let url = `${RootURL.ApiBase}/odata/shops('${domain}')/TikTokWidgets?$expand=products,shops&$count=true`;
    if (pageIndex) {
      url = ODataQuery.BuildODataQuery(
        `${RootURL.ApiBase}/odata/shops('${domain}')/TikTokWidgets`,
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
      const data = result?.value as BaseTikTokWidget[];
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
      url: `${RootURL.ApiBase}/odata/TikTokWidgets('${key}')`,
    });
    return response;
  };

  GetById = async (key: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/TikTokWidgets('${key}')?$expand=products,shops`,
    });
    return response;
  };

  Update = async (key: string, req: UpdateWidgetRequest) => {
    const response = await FetchDataFromServer({
      method: "PUT",
      url: `${RootURL.ApiBase}/odata/TikTokWidgets('${key}')`,
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
      url: `${RootURL.ApiBase}/odata/TikTokWidgets('${key}')/UpdateProduct`,
      body: req,
    });
    return response;
  };
}
