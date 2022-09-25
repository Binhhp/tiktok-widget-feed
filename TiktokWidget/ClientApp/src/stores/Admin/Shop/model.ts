import { ShopActEnum } from "./enum";
import { ShopStoreModelDto } from "./state";

export interface IOnShopConfiguration {
  type: typeof ShopActEnum.INFORMATION;
  payload: ShopStoreModelDto;
}

export type ShopType = IOnShopConfiguration;
