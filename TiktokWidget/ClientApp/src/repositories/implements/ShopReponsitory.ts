import { RootURL } from "common/constants/RootURL";
import { FetchDataFromServer } from "common/functions/AxiosMethod";
import { UpdateShopConfigurationRequest } from "repositories/dtos/requests/UpdateShopConfigurationRequest";
import { BaseShop } from "repositories/dtos/responses/BaseShop";
import { BaseShopConfiguration } from "repositories/dtos/responses/BaseShopConfiguration";
import { IShopReponsitory } from "repositories/interfaces/IShopReponsitory";

export class ShopReponsitory implements IShopReponsitory {
  GetConfiguration = async (domain?: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/shops('${domain}')/shopConfiguration`,
    });
    if (response.Status) {
      return response.Data as BaseShopConfiguration;
    }
    return null;
  };

  Get = async (shopDomain: string) => {
    const response = await FetchDataFromServer({
      method: "GET",
      url: `${RootURL.ApiBase}/odata/shops('${shopDomain}')`,
    });
    if (response.Status) {
      return response.Data as BaseShop;
    }
    return null;
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
