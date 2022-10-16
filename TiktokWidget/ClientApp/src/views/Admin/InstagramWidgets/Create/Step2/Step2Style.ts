import styled from "Dependencies/StyledComponents/Container";

const WIDTH_TEMPLATE = 30;
export const Step2Wrapper = styled("div")`
  width: 100%;
`;

export const TemplateSectionWrapper = styled("div")`
  padding: 16px 16px 23px 16px;
  background: #ffffff;
  width: ${WIDTH_TEMPLATE}%;
  height: max-content;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25);
  position: fixed;
`;

export const FormLayoutContainer = styled("div")`
  width: 100%;
  padding-left: calc(${WIDTH_TEMPLATE + 9}% + 30px);
`;
