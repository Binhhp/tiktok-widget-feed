import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export const DivImagePoster = styled("div")`
  width: 80px;
  height: 80px;
  border-radius: 2px;
  border: 1px solid rgba(229, 229, 229, 1);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DivDescProduct = styled("div")`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
    margin-right: 6px;
  }
  h5 {
    font-family: "SF Pro Display";
    font-style: normal;
    color: #000000;
    font-size: 13px;
    line-height: 24px;
    text-decoration: line-through;
  }
`;

export const DivLeftProduct = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 5px;
`;

export const DivPriceProduct = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-end;
  font-family: "SF Pro Display";
  font-style: normal;
`;

export const DivButtonShop = styled("a")`
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
`;

export const ShopTagProductWrapper = styled("div")`
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
    min-width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
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
      width: 50px;
      height: auto;
      border: 1px solid #00000040;
    }
    ${DivButtonShop} {
      font-size: 10px;
      padding: 5px;
      min-width: 80px;
    }
  }
`;
