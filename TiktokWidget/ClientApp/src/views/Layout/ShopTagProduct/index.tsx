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
import { RootTikTokReducer } from "stores/Layout/TikTokReducer";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";

export interface IShopTagProduct {
  product?: BaseProduct | false | undefined;
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
          <span>{props.product.title}</span>
          <DivPriceProduct>
            <h3>${props.product.prices}</h3>
            <h5>${props.product.prices}</h5>
          </DivPriceProduct>
        </DivDescProduct>
      </DivLeftProduct>
      <DivButtonShop
        href={`https://${shopReducer.shop?.domain}/products/${props.product?.handle}`}
        target="_blank"
      >
        <span>Shop Now</span>
      </DivButtonShop>
    </ShopTagProductWrapper>
  ) : (
    <></>
  );
}

export default ShopTagProduct;
