import React from "react";
import Image from "ui-components/Image";
import {
  DivButtonShop,
  DivDescProduct,
  DivImagePoster,
  DivLeftProduct,
  DivPriceProduct,
  ShopTagProductWrapper,
} from "./ShopTagProductStyle";
import { useSelector } from "react-redux";
import { ProductResponse } from "repositories/dtos/responses/ProductResponse";
import { RootTikTokReducer } from "stores/Layout/WidgetReducer";
import MoneyCurrentFormat from "common/functions/MoneyCurrentFormat";

export interface IShopTagProduct {
  product?: ProductResponse | false | undefined;
  format?: string;
}

function ShopTagProduct(props: IShopTagProduct) {
  const shopReducer = useSelector(
    (state: RootTikTokReducer) => state.shopReducer
  );

  return props.product ? (
    <ShopTagProductWrapper>
      <DivLeftProduct>
        <DivImagePoster>
          <Image src={props.product.image} alt={props.product.title}></Image>
        </DivImagePoster>
        <DivDescProduct>
          <div>
            <span>{props.product.title}</span>
          </div>
          <DivPriceProduct>
            <span className="div__product-prices">
              {MoneyCurrentFormat.FormatMoney(
                props.product.prices,
                props.format
              )}
            </span>
          </DivPriceProduct>
        </DivDescProduct>
      </DivLeftProduct>
      <DivButtonShop
        href={`https://${shopReducer.shop?.domain}/products/${props.product?.handle}`}
        target="_blank"
      >
        <span className="view-detail">View Detail</span>
      </DivButtonShop>
    </ShopTagProductWrapper>
  ) : (
    <></>
  );
}

export default ShopTagProduct;
