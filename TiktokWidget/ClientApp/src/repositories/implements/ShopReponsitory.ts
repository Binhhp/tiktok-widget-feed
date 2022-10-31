import { RootURL } from "common/constants/RootURL";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { UpdateShopConfigurationRequest } from "repositories/dtos/requests/UpdateShopConfigurationRequest";
import { BaseShop } from "repositories/dtos/responses/BaseShop";
import { BaseShopConfiguration } from "repositories/dtos/responses/BaseShopConfiguration";
import { BaseTheme } from "repositories/dtos/responses/BaseTheme";
import { IShopReponsitory } from "repositories/interfaces/IShopReponsitory";

export class ShopReponsitory implements IShopReponsitory {
  GetThemes = async (shopDomain: string) => {
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

  GetConfiguration = async (domain?: string) => {
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

  Get = async (shopDomain: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/shops('${shopDomain}')?$expand=shopDescriptor,shopConfiguration`,
    });
    if (response.Status) {
      return response.Data as BaseShop;
    }
    return null;
  };

  GetWidgetsCount = async (shopDomain: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/Shops('${shopDomain}')/GetWidgetCounts`,
    });
    if (response.Status) {
      return response.Data?.value;
    }
    return 0;
  };

  GetInstagramCount = async (shopDomain: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/Shops('${shopDomain}')/GetInstagramWidgetCounts`,
    });
    if (response.Status) {
      return response.Data?.value;
    }
    return 0;
  };

  Update = async (domain?: string, req?: UpdateShopConfigurationRequest) => {
    const response = await FetchDataFromServer({
      method: "POST",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/UpdateShopConfiguration`,
      body: req,
    });
    return response;
  };
}
