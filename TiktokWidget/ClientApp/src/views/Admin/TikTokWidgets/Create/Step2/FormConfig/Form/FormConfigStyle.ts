import styled from "Dependencies/StyledComponents/Container";

export const FormConfiguration = styled("div")`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
`;

export const FormLeft = styled("div", "tiktok", "orichi-onboarding")`
  margin-right: 7px;
  width: calc(50% - 7px);
  .Polaris-Button.Polaris-Button--pressed {
    background: #fe0b53;
    border: 1px solid #fe0b53;
  }
`;

export const FormRight = styled("div", "form", "orichi-onboarding")`
  margin-left: 7px;
  width: calc(50% - 7px);
`;
export const FormRightWrapper = styled("div")`
  width: 100%;
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
  margin-bottom: 10px;
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

export const FormSubmitWrapper = styled("div")`
  width: 100%;
  margin: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  button:first-child {
    background: #fafafa;
    color: #fe0b53;
  }
  button + button {
    margin-left: 15px;
    background: #fe0b53;
    color: #ffffff;
    &:hover {
      background: #fe0b53;
      color: #ffffff;
    }
  }
`;

export const ButtonCancel = styled("button")`
  border: none;
  background: transparent;
  color: #fe2c55;
  cursor: pointer;
  font-weight: 400;
  font-size: 15px;
  margin-right: 5px;
`;
