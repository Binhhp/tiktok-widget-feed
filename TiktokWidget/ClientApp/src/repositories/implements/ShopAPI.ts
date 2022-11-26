import { RootURL } from "common/constants/RootURL";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { UpdateShopConfigurationRequest } from "repositories/dtos/requests/UpdateShopConfigurationRequest";
import { BaseShop } from "repositories/dtos/responses/BaseShop";
import { BaseShopConfiguration } from "repositories/dtos/responses/BaseShopConfiguration";
import { BaseTheme } from "repositories/dtos/responses/BaseTheme";
import { IAnalyticsResponse } from "repositories/dtos/responses/IAnalytics";
import { IBannerResponse } from "repositories/dtos/responses/IBanner";
import { ICourseResponse } from "repositories/dtos/responses/ICourse";
import { IPostResponse } from "repositories/dtos/responses/IPost";
import {
  convertDateTimeByTimezone,
  convertShortDate,
} from "views/Admin/Dashboard/DateRange/DateFunc";
export default class ShopAPI {
  static GetThemes = async (shopDomain: string) => {
    try {
      const response = await FetchDataFromServer({
        method: "GET",
        url: `${RootURL.ApiBase}/odata/Shops('${shopDomain}')/GetThemes`,
      });
      if (response.Status) {
        return response.Data?.value as BaseTheme[];
      }
    } catch {}
    return [];
  };

  static GetConfiguration = async (domain?: string) => {
    try {
      const response = await FetchDataFromServer({
        method: "GET",
        url: `${RootURL.ApiBase}/odata/shops('${domain}')/shopConfiguration`,
      });
      if (response.Status) {
        return response.Data as BaseShopConfiguration;
      }
    } catch {}
    return null;
  };

  static Get = async (shopDomain: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/shops('${shopDomain}')?$expand=shopDescriptor,shopConfiguration`,
    });
    if (response.Status) {
      return response.Data as BaseShop;
    }
    return null;
  };

  static GetWidgetsCount = async (shopDomain: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/Shops('${shopDomain}')/GetWidgetCounts`,
    });
    if (response.Status) {
      return response.Data?.value;
    }
    return 0;
  };

  static GetInstagramCount = async (shopDomain: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/Shops('${shopDomain}')/GetInstagramWidgetCounts`,
    });
    if (response.Status) {
      return response.Data?.value;
    }
    return 0;
  };

  static Update = async (
    domain?: string,
    req?: UpdateShopConfigurationRequest
  ) => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/UpdateShopConfiguration`,
      body: req,
    });
    return response;
  };

  static GetRecentCourses = async (): Promise<ICourseResponse> => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/Courses`,
    });
    return response.Data;
  };

  static GetPosts = async (
    domain: string,
    startDate = new Date().toString(),
    endDate = new Date().toString()
  ): Promise<IPostResponse> => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${
        RootURL.ApiBase
      }/odata/Shops('${domain}')/Posts?startTime=${convertDateTimeByTimezone(
        startDate
      )}&endTime=${convertDateTimeByTimezone(endDate)}`,
      nonTimezone: true,
    });
    return response.Data as IPostResponse;
  };

  static GetBanners = async (): Promise<IBannerResponse> => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/Banner"`,
    });
    return response.Data as IBannerResponse;
  };

  static GetDataAnalytics = async (
    shop: string,
    dateRange: {
      StartTime: string;
      EndTime: string;
    }
  ): Promise<IAnalyticsResponse> => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/Shops('${shop}')/Analytics`,
      body: {
        StartTime: convertDateTimeByTimezone(dateRange.StartTime),
        EndTime: convertDateTimeByTimezone(dateRange.EndTime),
      },
      nonTimezone: true,
    });
    return response.Data as IAnalyticsResponse;
  };
}
