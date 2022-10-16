import styled from "Dependencies/StyledComponents/Container";

export const FormConfigWrapper = styled("div")`
  display: flex;
  margin-top: 22px;
`;
export const FormConfigContent = styled("div")`
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  width: 100%;
  padding: 20px 16px 48px 16px;
`;

export const FormConfiguration = styled("div")`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  .Polaris-Button.Polaris-Button--pressed {
    background: #008060;
    border: 1px solid #008060;
  }
`;

export const FormLeft = styled("div")`
  margin-right: 7px;
  width: calc(50% - 7px);
`;

export const FormRight = styled("div")`
  margin-left: 7px;
  width: calc(50% - 7px);
`;
export const FormRightWrapper = styled("div")`
  width: 100%;
  .Polaris-FormLayout__Item {
    margin-top: 20px;
  }
`;

export const LabelForm = styled("div")`
  width: 35%;
  align-items: flex-start;
`;
export const FormControlStep = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
`;

export const InputForm = styled("div")`
  width: calc(100% - 35%);
  z-index: 1;
`;

export interface IRadioForm {
  mr?: number;
  mt?: number;
  ml?: number;
  mb?: number;
}

export const RadioForm = styled("div")<IRadioForm>`
  margin: ${(props) => props.mt || 0}px ${(props) => props.mr || 0}px
    ${(props) => props.mb || 0}px ${(props) => props.ml || 0}px;
`;

export interface ITextFieldColorPicker {
  bg: string;
}
export const TextFieldColorPicker = styled("div")<ITextFieldColorPicker>`
  height: 2rem;
  width: 2rem;
  border-radius: 0.3rem;
  background: ${(props) => props.bg};
`;
