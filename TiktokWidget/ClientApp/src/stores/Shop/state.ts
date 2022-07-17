import { ICloneStore } from "common/interfaces/ICloneStore";
import { BaseShop } from "repositories/dtos/responses/BaseShop";

export class ShopStoreModelDto {
  shop: BaseShop;
  constructor() {
    this.shop = {
      id: 0,
    };
  }
}

export class ShopStoreModel implements ICloneStore<ShopStoreModel> {
  protected _shop: BaseShop;
  constructor(_dto?: ShopStoreModelDto) {
    this._shop = _dto?.shop ?? {
      id: 0,
    };
  }

  public get shop(): BaseShop {
    return this._shop;
  }

  public set shop(v: BaseShop) {
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
