import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export const DivImagePoster = styled(
  "div",
  "product__poster",
  "orichi-instagram"
)`
  &.orichi-instagram-product__poster {
    max-width: 70px;
    max-height: 70px;
    border-radius: 2px;
    border: 1px solid rgba(229, 229, 229, 1);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
`;

export const DivDescProduct = styled(
  "div",
  "product__desc",
  "orichi-instagram"
)`
  &.orichi-instagram-product__desc {
    padding: 0px 20px 0px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    max-width: calc(100% - 70px);
    span {
      font-family: "SF Pro Text" !important;
      font-style: normal;
      font-size: 12px;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-bottom: 15px;
    }
    span.div__product-prices {
      font-family: "SF Pro Text" !important;
      font-style: normal;
      color: #000000;
      font-weight: 700;
      font-size: 20px;
      line-height: 20px;
      margin-right: 6px;
      margin: 0px;
      margin-right: 5px;
    }
    h5 {
      font-family: "SF Pro Text" !important;
      font-style: normal;
      color: #000000;
      font-size: 13px;
      line-height: 20px;
      text-decoration: line-through;
      margin: 0px;
    }
  }
`;

export const DivLeftProduct = styled("div", "divleft", "orichi-instagram")`
  &.orichi-instagram-divleft {
    display: flex;
    flex-direction: row;
    max-width: calc(100% - 80px);
  }
`;

export const DivPriceProduct = styled("div", "price", "orichi-instagram")`
  &.orichi-instagram-price {
    display: flex;
    flex-direction: row;
    font-family: "SF Pro Text" !important;
    align-items: center;
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
  }
`;

export const DivButtonShop = styled("a", "btn__shopping", "orichi-instagram")`
  &.orichi-instagram-btn__shopping {
    background: #01f0ea;
    border-radius: 2px;
    border: none;
    padding: 5px 3px;
    color: #fafafa;
    font-weight: 500;
    height: auto;
    width: 80px;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    span.view-detail {
      display: block;
      height: max-content;
      font-family: "SF Pro Text" !important;
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
    }
    &:hover {
      background: #03dbd5;
      color: #fafafa;
    }
  }
`;

export const ShopTagProductWrapper = styled(
  "div",
  "product__root",
  "orichi-instagram"
)`
  &.orichi-instagram-product__root {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto;
    background-color: #ffffff;
    color: #000000;
    max-width: 100%;
    overflow: hidden;
    @media only screen and (${breakpoints.device.xs}) {
    }
    @media only screen and (${breakpoints.device.sm}) {
    }
    @media only screen and (${breakpoints.device.lg}) {
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
        }
      }
      ${DivImagePoster} {
        width: 50px;
        height: auto;
        border: 1px solid #00000040;
      }
      ${DivButtonShop} {
        font-size: 10px;
      }
    }
  }
`;
