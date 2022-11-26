import { RootURL } from "common/constants/RootURL";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { ODataQuery } from "common/functions/ODataQuery";
import config from "config";
import DataTableFunc from "Dependencies/DataTables/DataTableModel";
import {
  IInstagramDto,
  IInstagramTemplateModel,
} from "Dependencies/InstagramLayout/InstagramLayoutModel";
import { AddJobRequest } from "repositories/dtos/requests/AddJobRequest";
import { AddTagProductRequest } from "repositories/dtos/requests/AddTagProductRequest";
import { GetVideoByJobRequest } from "repositories/dtos/requests/GetVideoByJobRequest";
import PostFeedbackRequest from "repositories/dtos/requests/PostFeedbackRequest";
import SetClickPostRequest from "repositories/dtos/requests/SetClickPostRequest";
import { SetInstagramWidgetRequest } from "repositories/dtos/requests/SetInstagramWidgetRequest";
import { BaseInstagramWidget } from "repositories/dtos/responses/BaseInstagramWidget";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";

export default class InstagramWidgetAPI {
  static AddJob = async (domain?: string, req?: AddJobRequest) => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/AddJobInstagram`,
      body: req,
    });
    return response;
  };

  static PostFeedback = async (domain: string, req: PostFeedbackRequest) => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/Shops('${domain}')/Feedback`,
      body: req,
    });
    return response;
  };
  static Delete = async (key: string) => {
    const response = await FetchDataFromServer({
      method: "DELETE",
      url: `${RootURL.ApiBase}/odata/InstagramWidgets('${key}')`,
    });
    return response;
  };

  static GetById = async (key: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/InstagramWidgets('${key}')?$expand=products,shops`,
    });
    return response;
  };

  static GetByIds = async (widgetIds: string[]) => {
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

  static Get = async (pageIndex?: number, domain?: string) => {
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

  static Create = async (
    req: SetInstagramWidgetRequest,
    domain?: string
  ): Promise<BaseResponse> => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/RegisterInstagramWidget`,
      body: req,
    });
    return response;
  };

  static Update = async (key: string, req: SetInstagramWidgetRequest) => {
    const response = await FetchDataFromServer({
      method: "PUT",
      url: `${RootURL.ApiBase}/odata/InstagramWidgets('${key}')`,
      body: req,
    });
    return response;
  };

  static AddTagProducts = async (
    key: string,
    req: AddTagProductRequest
  ): Promise<BaseResponse> => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/InstagramWidgets('${key}')/UpdateProduct`,
      body: req,
    });
    return response;
  };
  static GetVideos = async (
    key: string,
    pageIndex: number,
    showItems?: number
  ): Promise<IInstagramTemplateModel> => {
    try {
      return DataTableFunc.BuildPaging<IInstagramDto>(
        `${RootURL.ApiBase}/odata/InstagramVideos('${key}')`,
        pageIndex,
        showItems ? showItems : config.showItems,
        "user"
      );
    } catch {
      return Promise.resolve({
        data: [],
        count: 0,
      });
    }
  };

  static PostClick = async (key: string, req: SetClickPostRequest) => {
    return await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/InstagramVideos('${key}')/SetClicks`,
      body: req,
    });
  };

  static GetVideosByJob = async (
    req: GetVideoByJobRequest,
    showItems?: number
  ): Promise<IInstagramTemplateModel> => {
    return DataTableFunc.BuildPaging<IInstagramDto>(
      `${RootURL.ApiBase}/odata/InstagramVideos`,
      1,
      showItems ? showItems : config.showItems,
      "",
      `data=${req.data}&type=${req.type}`
    );
  };
}