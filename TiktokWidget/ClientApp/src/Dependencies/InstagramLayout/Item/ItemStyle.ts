import styled from "Dependencies/StyledComponents/Container";

interface IItemContent {
  bg?: string;
  color?: string;
}
export const DivItemContent = styled(
  "div",
  "",
  "orichi-instagram"
)<IItemContent>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  justify-content: center;
  display: none;
  flex-direction: column;
  background: ${(props) => (props.bg ? `${props.bg}50` : "transpent")};
`;

export const DivItemDesc = styled("div", "", "orichi-instagram")<
  Pick<IItemContent, "color">
>`
  margin: 20px 7%;
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
    font-family: "SF Pro Display";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.color ?? "#ffffff"};
    margin: 0px 0px 3px 0px;
    overflow: hidden;
    line-height: 18px;
    -webkit-line-clamp: 3;
    height: 54px;
    display: -webkit-box;
    color: ${(props) => props.color ?? "#ffffff"};
  }
`;

export const DivItemContentContract = styled("div", "", "orichi-instagram")`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const DivItemContentContractItem = styled("div", "", "orichi-instagram")<
  Pick<IItemContent, "color">
>`
  display: flex;
  align-items: center;
  span {
    font-family: "SF Pro Display";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: ${(props) => props.color ?? "#ffffff"};
  }
`;

export const DivItemIcon = styled("div", "", "orichi-instagram")`
  height: 23px;
  margin-right: 7px;
`;

interface IItemWrapper {
  width: number;
}
export const ItemWrapper = styled("div", "", "orichi-instagram")<IItemWrapper>`
  width: ${(props) => props.width}%;
  height: auto;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  &:hover ${DivItemContent} {
    display: flex;
  }
`;

export const DivItemOrginal = styled("div", "", "orichi-instagram")`
  width: 100%;
  display: block;
`;
export const DivItemImage = styled("img", "", "orichi-instagram")`
  width: 100%;
  object-fit: contain;
  display: block;
`;

export const ItemIcon = styled("div", "", "orichi-instagram")`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
`;
