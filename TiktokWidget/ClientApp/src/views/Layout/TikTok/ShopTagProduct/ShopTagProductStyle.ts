import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export const DivImagePoster = styled("div", "poster")`
  &.orichi-tiktok-poster {
    width: 80px;
    height: 80px;
    border-radius: 2px;
    border: 1px solid rgba(229, 229, 229, 1);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const DivDescProduct = styled("div", "product__desc")`
  &.orichi-tiktok-product__desc {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
    width: calc(100% - 80px);
    span {
      font-family: "SF Pro Display";
      font-style: normal;
      font-size: 12px;
      line-height: 16px;
      margin-bottom: 15px;
      height: 32px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    h3 {
      font-family: "SF Pro Display";
      font-style: normal;
      color: #000000;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      margin: 0px 6px 0px 0px;
    }
    h5 {
      font-family: "SF Pro Display";
      font-style: normal;
      color: #000000;
      font-size: 13px;
      line-height: 24px;
      text-decoration: line-through;
      margin: 0px;
    }
  }
`;

export const DivLeftProduct = styled("div", "left__item")`
  &.orichi-tiktok-left__item {
    display: flex;
    flex-direction: row;
    max-width: 80%;
    height: 100%;
  }
`;

export const DivPriceProduct = styled("div", "price")`
  &.orichi-tiktok-price {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: flex-end;
    font-family: "SF Pro Display";
    font-style: normal;
  }
`;

export const DivButtonShop = styled("a", "shopnow")`
  &.orichi-tiktok-shopnow {
    text-transform: uppercase;
    background: #01f0ea;
    border-radius: 2px;
    border: none;
    padding: 5px 15px;
    font-size: 12px;
    color: #fafafa;
    font-weight: 500;
    height: auto;
    min-width: 120px;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: center;
    span {
      line-height: 18px;
    }
    &:hover {
      background: #03dbd5;
      color: #fafafa;
    }
  }
`;

export const ShopTagProductWrapper = styled("div", "product__wrapper")`
  &.orichi-tiktok-product__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto;
    background-color: #ffffff;
    color: #000000;
    @media only screen and (${breakpoints.device.xs}) {
    }
    @media only screen and (${breakpoints.device.sm}) {
    }
    @media only screen and (${breakpoints.device.lg}) {
      max-width: 100%;
      width: 100%;
      height: 70px;
      padding: 10px;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 10;
      border-top: 1px solid #00000020;
      ${DivPriceProduct} {
        h3 {
          font-size: 12px;
          line-height: 12px;
        }
        h5 {
          font-size: 10px;
          line-height: 12px;
        }
      }
      ${DivDescProduct} {
        width: calc(100% - 50px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        span {
          font-size: 10px;
          line-height: 10px;
          margin-bottom: 7px;
        }
      }
      ${DivImagePoster} {
        height: 100%;
        border: 1px solid #00000040;
      }
      ${DivButtonShop} {
        font-size: 10px;
        padding: 5px;
        min-width: 80px;
      }
    }
  }
`;
