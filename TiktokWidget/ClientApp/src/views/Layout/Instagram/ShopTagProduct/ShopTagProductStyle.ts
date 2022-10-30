import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export const DivImagePoster = styled("div", "", "orichi-instagram")`
  max-width: 70px;
  max-height: 70px;
  border-radius: 2px;
  border: 1px solid rgba(229, 229, 229, 1);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DivDescProduct = styled("div", "", "orichi-instagram")`
  padding: 0px 20px 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-width: calc(100% - 70px);
  span {
    font-family: "SF Pro Display";
    font-style: normal;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 15px;
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
    line-height: 20px;
    margin-right: 6px;
    margin: 0px;
    margin-right: 5px;
  }
  h5 {
    font-family: "SF Pro Display";
    font-style: normal;
    color: #000000;
    font-size: 13px;
    line-height: 20px;
    text-decoration: line-through;
    margin: 0px;
  }
`;

export const DivLeftProduct = styled("div", "", "orichi-instagram")`
  display: flex;
  flex-direction: row;
`;

export const DivPriceProduct = styled("div", "", "orichi-instagram")`
  display: flex;
  flex-direction: row;
  font-family: "SF Pro Display";
  align-items: center;
`;

export const DivButtonShop = styled("a")`
  background: #01f0ea;
  border-radius: 2px;
  border: none;
  padding: 5px;
  font-size: 12px;
  color: #fafafa;
  font-weight: 500;
  height: auto;
  width: 80px;
  max-width: 100%;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #03dbd5;
    color: #fafafa;
  }
`;

export const ShopTagProductWrapper = styled("div", "", "orichi-instagram")`
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
    }
  }
`;
