import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "styled-components";

export interface ITemplateItemImage {
  width?: number;
}

export interface ITemplateTem {
  isActive?: boolean;
}

export const TemplateSettingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;
  align-content: stretch;
`;

export const TemplateItem = styled.div<ITemplateTem>`
  width: calc(50% - 40px);
  height: 150px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  border: 1px solid ${(props) => (props.isActive ? "black" : "#ffffff")};
  @media only screen and (${breakpoints.device.bigLg}) {
    height: 250px;
  }
`;

export const TemplateItemImage = styled.div<ITemplateItemImage>`
  height: calc(100% - 50px);
  position: relative;
  margin: 10px 0px;
  @media only screen and (${breakpoints.device.bigLg}) {
    height: calc(100% - 100px);
    margin: 50px 0px;
  }
  img {
    padding: 0 1px;
    width: ${(props) => props.width || 100}%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
  }
`;
export const TextTemplate = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 25px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  span {
    padding: 3px 10px;
    background: black;
    color: #ffffff;
    font-size: 12px;
  }
`;
