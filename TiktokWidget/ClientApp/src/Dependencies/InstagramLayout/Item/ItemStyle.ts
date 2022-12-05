import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

interface IItemContent {
  bg?: string;
  color?: string;
}
export const DivItemContent = styled(
  "div",
  "item__content",
  "orichi-instagram"
)<IItemContent>`
  &.orichi-instagram-item__content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 12;
    justify-content: center;
    display: none;
    flex-direction: column;
    background: ${(props) => (props.bg ? `${props.bg}50` : "transpent")};
    padding-top: 20%;
    &:active {
      opacity: 0.5;
    }
  }
`;

export const DivItemDesc = styled("div", "item__desc", "orichi-instagram")<
  Pick<IItemContent, "color">
>`
  &.orichi-instagram-item__desc {
    margin: 50px 7%;
    span.orichi-instagram-readmore {
      cursor: pointer;
      margin: 0px;
      color: ${(props) => props.color ?? "#ffffff"};
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
    }
    p.orichi-instagram-desc {
      font-family: "SF Pro Display" !important;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: ${(props) => props.color ?? "#ffffff"};
      margin: 0px 0px 3px 0px;
      overflow: hidden;
      line-height: 18px;
      -webkit-line-clamp: 3;
      max-height: 54px;
      display: -webkit-box;
      color: ${(props) => props.color ?? "#ffffff"};
    }
  }
`;

export const DivItemContentContract = styled(
  "div",
  "item__contract",
  "orichi-instagram"
)`
  &.orichi-instagram-item__contract {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const DivItemContentContractItem = styled(
  "div",
  "contract__child",
  "orichi-instagram"
)<Pick<IItemContent, "color">>`
  &.orichi-instagram-contract__child {
    display: flex;
    align-items: center;
    span {
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      color: ${(props) => props.color ?? "#ffffff"};
    }
  }
`;

export const DivItemIcon = styled("div", "item__icon", "orichi-instagram")`
  &.orichi-instagram-item__icon {
    height: 23px;
    margin-right: 7px;
  }
`;

interface IItemWrapper {
  width: number;
}

export const DivItemOrginal = styled(
  "div",
  "item__orginal",
  "orichi-instagram"
)`
  &.orichi-instagram-item__orginal {
    background: rgb(239, 239, 239);
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
`;
export const DivItemImage = styled("img", "item__image", "orichi-instagram")`
  &.orichi-instagram-item__image {
    background: rgb(239, 239, 239);
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const ItemIcon = styled("div", "item__icon2", "orichi-instagram")`
  &.orichi-instagram-item__icon2 {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 22px;
    height: 22px;
    z-index: 10;
  }
`;
export const ItemWrapper = styled(
  "div",
  "item__wrapper",
  "orichi-instagram"
)<IItemWrapper>`
  &.orichi-instagram-item__wrapper {
    width: ${(props) => props.width}%;
    padding-bottom: ${(props) => props.width}%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    &:hover ${DivItemContent} {
      display: flex;
    }
    @media only screen and (min-width: 1590px) {
      .orichi-instagram-item__content {
        padding-top: 0px;
      }
    }
    @media only screen and (${breakpoints.device.lg}) {
      width: 33.33%;
      .orichi-instagram-item__desc {
        margin-top: auto;
        margin-bottom: 20px;
      }
      .orichi-instagram-item__content {
        padding-top: 30%;
      }
    }
    @media only screen and (${breakpoints.device.sm}) {
      width: 50%;
      padding-bottom: 50%;
    }
    @media only screen and (${breakpoints.device.xm}) {
    }
  }
`;
