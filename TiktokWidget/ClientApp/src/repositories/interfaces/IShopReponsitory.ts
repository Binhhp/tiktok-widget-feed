import { UpdateShopConfigurationRequest } from "repositories/dtos/requests/UpdateShopConfigurationRequest";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import { BaseShop } from "repositories/dtos/responses/BaseShop";
import { BaseShopConfiguration } from "repositories/dtos/responses/BaseShopConfiguration";
import { BaseTheme } from "repositories/dtos/responses/BaseTheme";

export interface IShopReponsitory {
  Get: (shopDomain: string) => Promise<BaseShop | null>;
  GetConfiguration: (domain: string) => Promise<BaseShopConfiguration | null>;
  GetWidgetsCount: (shopDomain: string) => Promise<number>;
  GetThemes: (shopDomain: string) => Promise<BaseTheme[]>;
  Update: (
    domain?: string,
    req?: UpdateShopConfigurationRequest
  ) => Promise<BaseResponse>;
}
