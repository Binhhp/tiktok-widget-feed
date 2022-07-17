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

const ShopReducer = (
  state: ShopStoreModel = new ShopStoreModel(),
  action: ShopType
): ShopStoreModel => {
  switch (action.type) {
    case ShopActEnum.INFORMATION:
      return OnSetInformation(state, action.payload);
    default:
      return state;
  }
};

export default ShopReducer;
