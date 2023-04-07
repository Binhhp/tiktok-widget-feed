import styled from "Dependencies/StyledComponents/Container";

export const OnBoardingWrapper = styled("div")`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const OnBoardingWrapperContainer = styled("div")`
  width: 70%;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  .Polaris-Card__Section {
    z-index: 0;
    position: relative;
  }
`;

export const OnBoardingContainerHeader = styled("div")`
  h2 {
    color: #000000;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 150%;
  }
  span {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;
  }
`;

export const OnBoardingContainerContent = styled("div")`
  background: #ffffff;
  margin-top: 20px;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.14);
  border-radius: 0.5rem;
  .orichi-tabs {
    height: 100%;
  }
`;

export const TabItemOnBoarding = styled("div")`
  display: flex;
  align-items: center;
  span {
    font-family: "Jost";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 15px;
  }
  img {
    display: block;
    margin-right: 5px;
  }
`;

export const OnBoardingHeaderText = styled("div")`
  width: auto;
  z-index: 1;
  position: relative;
  h2 {
    font-family: "SF Pro Text";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
  }
  .skip-onboarding {
    font-family: "SF Pro Text";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 20px;
    color: #2c6ecb;
  }
  .process-bar {
    position: relative;
    width: 240px;
    span {
      float: right;
      margin-right: 8px;
      color: #7c7c7c;
      font-family: "Jost";
      font-style: italic;
      font-weight: 400;
      font-size: 9px;
      line-height: 12px;
    }
    .Polaris-ProgressBar__Indicator {
      background-color: #f9b84f !important;
      width: auto !important;
    }
  }
`;

export const TabFooter = styled("div", "tab-actions", "orichi")`
  position: absolute;
  bottom: 10px;
  right: 26px;
  align-items: flex-end;
  justify-content: flex-end;
  button,
  button:hover {
    background: #fb447a;
    color: #ffffff;
  }
`;
