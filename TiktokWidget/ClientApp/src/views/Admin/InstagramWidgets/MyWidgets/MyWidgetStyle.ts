import { IProductWrapper } from "./MyWidgetType";
import { Link } from "react-router-dom";
import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export const MyWidgetHeader = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h2 {
    font-weight: 500;
    font-size: 30px;
  }
`;

export const TagProductSelected = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  cursor: pointer;
  span {
    margin-right: 4px;
    font-size: 13px;
    color: rgba(44, 110, 203, 1);
  }
`;

export const TagProductSelectedIcon = styled("div")`
  width: auto;
  svg {
    fill: rgba(44, 110, 203, 1);
  }
`;

export const TagProductContainer = styled("div")`
  padding: 20px;
`;
export const TagProductSection = styled("div")`
  position: relative;
`;

export const LoadingTagProduct = styled("div")`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  img {
    width: 40px;
  }
`;
export const TagProductSearch = styled("div")`
  margin-bottom: 25px;
`;

export const ProductWrapper = styled("div")<IProductWrapper>`
  background: ${(props) =>
    props.active
      ? props.bg
        ? props.bg
        : "#e1e3e5"
      : props.shadow
      ? props.bg
        ? props.bg
        : "rgba(246, 246, 247, 1)"
      : "#ffffff"};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.shadow ? "inset 0px -1px 0px #e1e3e5" : "none"};
  padding: 7px 30px 8px 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    background: #e1e3e5;
  }
`;

export const ProductItem = styled("div")`
  border-top: 1px solid;
`;

export const ProductRadio = styled("div")`
  padding: 0px 5px;
  width: max-content;
  input[type="radio"] {
    height: 16px;
    width: 16px;
  }
  input[type="radio"]:after {
    background-color: #ffffff;
    border-radius: 25px;
    content: "";
    display: block;
    height: 8px;
    left: 4px;
    position: relative;
    top: 4px;
    width: 8px;
  }
  input[type="radio"]:checked:after {
    background-color: #2b6ecc;
  }
`;

export const ProductImage = styled("div")`
  border-radius: 2px;
  border: 1px solid #e1e3e5;
  margin: 0px 10px;
  width: 60px;
  min-width: 60px;
  height: 60px;
  min-height: 60px;
  img {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    border-radius: 2px;
    font-size: 12px;
  }
`;

export const ProductDesc = styled("span")`
  font-size: 13px;
  width: auto;
  height: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  display: block;
  -webkit-line-clamp: 2;
`;

export const TextLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

export const ProductModalWrapper = styled("div")`
  height: 500px;
`;

export const MyWidgetWrapper = styled("div")`
  width: 100%;
  max-height: 100%;
  padding: 50px;
  @media only screen and (${breakpoints.device.lg}) {
    padding: 20px 10px;
    ${MyWidgetHeader} {
      h2 {
        font-size: 20px;
      }
    }
  }
  thead {
    border-bottom: 1px solid #e1e3e5;
  }
  .Polaris-IndexTable,
  .Polaris-IndexTable-ScrollContainer {
    height: max-content !important;
    max-height: 96%;
  }

  .Polaris-IndexTable__TableHeading,
  .Polaris-IndexTable__TableCell {
    padding-left: 1rem !important;
  }

  .Polaris-IndexTable__ScrollBarContainer {
    display: none !important;
  }
`;

export const TimeZoneColumn = styled("div")`
  font-size: 13px;
  word-break: break-word;
`;
