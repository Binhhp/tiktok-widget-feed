import styled from "styled-components";

interface IButtonOptionWrapper {
  url: string;
}
export const ButtonOptionWrapper = styled.div<IButtonOptionWrapper>`
  position: fixed;
  z-index: 9999999999;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: transparent;
  background-image: ${(props) => `url(${props.url}) no-repeat top center`};
  .top-right {
    top: 12px;
    right: 0px;
  }
  .top-left {
    top: 12px;
    left: 0px;
  }
  .bottom-right {
    bottom: 12px;
    right: 12px;
  }
  .bottom-left {
    bottom: 12px;
    left: 12px;
  }
`;
