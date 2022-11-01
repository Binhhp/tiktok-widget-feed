import { ShopDescriptor } from "repositories/dtos/responses/BaseShop";
import { ShopActEnum } from "./enum";
import { ShopType } from "./model";
import { ShopStoreModelDto } from "./state";

export class ShopActionTS {
  public static OnSetInformation(options: ShopStoreModelDto): ShopType {
    return {
      type: ShopActEnum.INFORMATION,
      payload: options,
    };
  }

  public static OnSetDescriptor(payload: ShopDescriptor): ShopType {
    return {
      type: ShopActEnum.DESCRIPTOR,
      payload: payload,
    };
  }
}
