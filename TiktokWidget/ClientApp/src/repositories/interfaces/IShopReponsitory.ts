import { UpdateShopConfigurationRequest } from "repositories/dtos/requests/UpdateShopConfigurationRequest";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import { BaseShop } from "repositories/dtos/responses/BaseShop";
import { BaseShopConfiguration } from "repositories/dtos/responses/BaseShopConfiguration";

export interface IShopReponsitory {
  Get: (shopDomain: string) => Promise<BaseShop | null>;
  GetConfiguration: (domain: string) => Promise<BaseShopConfiguration | null>;
  Update: (
    domain?: string,
    req?: UpdateShopConfigurationRequest
  ) => Promise<BaseResponse>;
}
