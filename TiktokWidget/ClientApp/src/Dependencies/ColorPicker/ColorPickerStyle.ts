import styled from "styled-components";

export const ColorPickerMain = styled.div`
  position: relative;
  width: 100%;
`;

export const ColorPickerWrapper = styled.div`
  position: absolute;
  z-index: 25;
  top: -280px;
  right: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  max-width: 25rem;
  max-height: 31.25rem;
  flex: 1 1;
  box-shadow: 0 0 0 1px rgb(6 44 82 / 10%), 0 2px 16px rgb(33 43 54 / 8%);
  background: #ffffff;
  &:before {
    content: "";
    display: block;
    z-index: 1;
    width: 8px;
    height: 8px;
    background: #ffffff;
    position: absolute;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    bottom: -4px;
    left: 48%;
  }
  .color-picker {
    width: 100%;
  }
  .section + .section {
    border-top: var(--p-border-divider);
  }
`;

export const ColorPickerSection = styled.div`
  padding: 0.5rem;
`;

export interface IExpandColor {
  bg?: string;
}
export const ExpandColor = styled.div<IExpandColor>`
  width: 1rem;
  height: 1rem;
  border-radius: 3px;
  margin-right: 6px;
  background: ${(props) => props.bg};
  border: 1px solid rgba(153, 158, 164, 1);
`;
