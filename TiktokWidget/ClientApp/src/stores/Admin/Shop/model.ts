import { ShopDescriptor } from "repositories/dtos/responses/ShopResponse";
import { ShopActEnum } from "./enum";
import { ShopStoreModelDto } from "./state";

export interface IOnShopConfiguration {
  type: typeof ShopActEnum.INFORMATION;
  payload: ShopStoreModelDto;
}
export interface IOnShopDescriptor {
  type: typeof ShopActEnum.DESCRIPTOR;
  payload: ShopDescriptor;
}

export type ShopType = IOnShopConfiguration | IOnShopDescriptor;
