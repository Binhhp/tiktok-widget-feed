import { ShopDescriptor } from "repositories/dtos/responses/BaseShop";
import { ShopActEnum } from "./enum";
import { ShopType } from "./model";
import { ShopStoreModel, ShopStoreModelDto } from "./state";

const OnSetInformation = (
  state: ShopStoreModel,
  payload: ShopStoreModelDto
) => {
  let copyState = state.Clone();
  if (payload.shop) copyState.shop = payload.shop;
  return copyState;
};

const OnSetDescriptor = (state: ShopStoreModel, payload: ShopDescriptor) => {
  let copyState = state.Clone();
  if (payload) copyState.shop.shopDescriptor = payload;
  return copyState;
};

const ShopReducer = (
  state: ShopStoreModel = new ShopStoreModel(),
  action: ShopType
): ShopStoreModel => {
  switch (action.type) {
    case ShopActEnum.INFORMATION:
      return OnSetInformation(state, action.payload);
    case ShopActEnum.DESCRIPTOR:
      return OnSetDescriptor(state, action.payload);
    default:
      return state;
  }
};

export default ShopReducer;
