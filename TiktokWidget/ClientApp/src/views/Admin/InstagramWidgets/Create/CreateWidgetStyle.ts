import styled from "Dependencies/StyledComponents/Container";
export const InstagramWidgetWrapper = styled("div")`
  width: 100%;
  height: 100%;
  display: block;
  padding: 46px 4% 60px 4%;
`;

interface ICaption {
  mt?: number;
  mb?: number;
}
export const Caption = styled("h2")<ICaption>`
  font-size: 17px;
  color: #202223;
  font-weight: 600;
  margin-top: ${(props) => props.mt ?? 0}px;
  margin-bottom: ${(props) => props.mb ?? 0}px;
`;

export const FlexboxDiv = styled("div")`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
`;

export const ColorRed = styled("span")`
  color: #ff0b53;
  text-transform: uppercase;
`;

export const MediaCardWrapper = styled("div")`
  .Polaris-MediaCard {
    display: block;
    padding: 15px;
  }
  .Polaris-Card__Section {
    padding-left: 0px;
  }
`;

export const MediaCardGuidesDiv = styled("div")`
  width: 28%;
  height: max-content;
  margin-left: 4%;
`;
