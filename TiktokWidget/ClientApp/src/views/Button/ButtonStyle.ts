import styled from "styled-components";

export const ButtonOptionWrapper = styled.a`
  position: fixed;
  z-index: 9999999999;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: transparent;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.top-right {
    top: 12px;
    right: 0px;
  }
  &.top-left {
    top: 12px;
    left: 0px;
  }
  &.bottom-right {
    bottom: 12px;
    right: 12px;
  }
  &.bottom-left {
    bottom: 12px;
    left: 12px;
  }
`;
