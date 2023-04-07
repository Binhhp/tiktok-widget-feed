import { ICloneStore } from "common/interfaces/ICloneStore";
import { ShopResponse } from "repositories/dtos/responses/ShopResponse";

export class ShopStoreModelDto {
  shop: ShopResponse;
  constructor() {
    this.shop = {
      id: 0,
    };
  }
}

export class ShopStoreModel implements ICloneStore<ShopStoreModel> {
  protected _shop: ShopResponse;
  constructor(_dto?: ShopStoreModelDto) {
    this._shop = _dto?.shop ?? {
      id: 0,
    };
  }

  public get shop(): ShopResponse {
    return this._shop;
  }

  public set shop(v: ShopResponse) {
    this._shop = v;
  }
  Clone(): ShopStoreModel {
    let dto = this.ToDto();
    return new ShopStoreModel(dto);
  }

  ToDto(): ShopStoreModelDto {
    return {
      shop: this._shop,
    };
  }
}
