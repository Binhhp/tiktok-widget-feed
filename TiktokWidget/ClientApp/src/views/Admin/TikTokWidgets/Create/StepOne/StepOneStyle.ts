import styled from "Dependencies/StyledComponents/Container";

export const TittleStepOne = styled("h2")`
  width: 100%;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  color: #000000;
  margin-bottom: 62px;
`;

export const FormControlStepOne = styled("div")`
  width: 100%;
  margin-top: 70px;
  display: flex;
  justify-content: center;
  #btn-submit-form.Polaris-Button--primary {
    padding: 7px 23px;
    font-size: 12px;
    font-weight: 400;
  }
  #btn-submit-form:not(.Polaris-Button--loading) {
    background: rgba(254, 44, 85, 1);
    color: #ffffff;
  }
`;

export const FormContentStepOne = styled("div")`
  width: 50%;
  margin: 0 auto;
`;

export const FormStackRadio = styled("div")`
  .Polaris-Stack__Item {
    margin-top: 6px;
  }
`;

export interface IFormControlWidget {
  width: 10 | 20 | 50 | 100 | number;
  paddingTopAndBottom?: number;
  paddingLeftAndRight?: number;
}

export const FormControlWidget = styled("div")<IFormControlWidget>`
  width: ${(props: IFormControlWidget) => props.width}%;
  margin: auto;
  background: #fafafa;
  padding: ${(props: IFormControlWidget) => props.paddingTopAndBottom || 39}px
    ${(props: IFormControlWidget) => props.paddingTopAndBottom || 72}px;
  background-image: linear-gradient(#01f0ea, #01f0ea),
    linear-gradient(#01f0ea, #01f0ea), linear-gradient(#fe2c55, #fe2c55),
    linear-gradient(#fe2c55, #fe2c55), linear-gradient(#fafafa, #fafafa);
  background-repeat: no-repeat;
  background-size: 1px 50%, 50% 2px, 2px 50%, 50% 1px,
    calc(100% - 8px) calc(100% - 8px);
  background-position: left bottom, left bottom, right top, right top, 1px 1px;
  box-shadow: 0px 0px 24px rgba(180, 188, 203, 0.24);
`;

export interface IFormSubmitStep {
  size?: "small" | "large";
}
export const FormSubmitStep = styled("div")<IFormSubmitStep>`
  .Polaris-Stack .Polaris-Stack__Item {
    margin-top: ${(props) =>
      props.size === "small" ? `4px` : `var(--pc-stack-spacing)`};
  }
  .Polaris-FormLayout__Item {
    margin-top: ${(props) =>
      props.size === "small" ? `15px` : `var(--p-space-4)`};
  }
`;
