import { ImageStorage } from "assets/images/ImageStorage";
import styled from "Dependencies/StyledComponents/Container";

export const GuidesWrapper = styled("div")`
  min-width: 100%;
  position: relative;
`;

export const GuidesContainer = styled("div")`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  padding: 0 20%;
`;

interface GuidesContainerItemType {
  pt?: number;
  pb?: number;
}
export const GuidesContainerItem = styled("div")<GuidesContainerItemType>`
  width: 100%;
  height: fit-content;
  background: #63d1db;
  margin-top: 80px;
  padding: ${(props: GuidesContainerItemType) => props.pt ?? 0}px 34px
    ${(props: GuidesContainerItemType) => props.pb ?? 60}px 34px;
  position: relative;
  color: #000000;
  h2 {
    font-style: normal;
    font-weight: 450;
    font-size: 18px;
    line-height: 23px;
    text-decoration-line: underline;
  }
  p {
    font-style: normal;
    font-weight: 450;
    font-size: 20px;
    line-height: 23px;
  }
  a {
    font-weight: 650;
    color: #000000;
  }
`;

export const GuidesHeader = styled("div")`
  width: 100%;
  height: 80px;
  background: #000000;
  display: flex;
  justify-content: start;
  align-items: center;
  position: fixed;
  z-index: 1;
`;

export const GuidesHeaderIcon = styled("div")`
  padding: 0px 30px;
`;

export const GuidesHeaderLogo = styled("img").attrs({
  src: ImageStorage.LogoTikTok2,
  alt: "Logo TikTok Pixel Orichi",
})`
  width: 46px;
`;

export const GuidesHeaderText = styled("div")`
  display: block;
  color: #ffffff;
  h2 {
    flex: none;
    order: 0;
    flex-grow: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    margin-bottom: 11px;
  }
  p {
  }
  span {
    color: #ffffff;
  }
`;

interface IButtonItem {
  right?: number;
  bottom?: number;
  top?: number;
  left?: number;
}

export const ButtonItem = styled("div")<IButtonItem>`
  margin: ${(props: IButtonItem) => props.top ?? 0}px
    ${(props: IButtonItem) => props.right ?? 0}px
    ${(props: IButtonItem) => props.bottom ?? 0}px
    ${(props: IButtonItem) => props.left ?? 0}px;
  img {
    width: 40px;
  }
  cursor: pointer;
`;

export const ButtonItemDiv = styled("div")<IButtonItem>`
  display: flex;
  justify-content: flex-end;
  margin: ${(props: IButtonItem) => props.top ?? 0}px
    ${(props: IButtonItem) => props.right ?? 0}px
    ${(props: IButtonItem) => props.bottom ?? 0}px
    ${(props: IButtonItem) => props.left ?? 0}px;
`;

export const GuidesContent = styled("div")`
  color: #000000;
  margin-right: 24px;
  padding-top: 25px;
  background: #63d1db;
  p {
    font-size: 17px;
    line-height: 23px;
  }
  max-width: 40%;
`;

export const GuidesFlexDiv = styled("div")`
  display: flex;
`;

export const GuidesDivFooter = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 33px;
  a {
    font-weight: 400;
  }
  .link-help {
    font-size: 18px;
    font-weight: 450;
    text-decoration-line: underline;
  }
`;
