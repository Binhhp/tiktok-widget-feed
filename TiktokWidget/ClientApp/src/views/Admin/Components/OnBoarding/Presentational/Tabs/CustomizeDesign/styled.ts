import styled from "Dependencies/StyledComponents/Container";

export const CustomizeDesignWrapper = styled("div")`
  width: 100%;
  .header {
    font-family: "SF Pro Text";
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.03em;
    margin-bottom: 18px;
    color: #000000;
  }
`;

export const TemplateWidgetContainer = styled("div")`
  width: 100%;
  padding: 16px 26px 0px 26px;
  .menu-items {
    display: flex;
    flex-direction: row;
    .active {
      border: 1px solid rgba(68, 71, 74, 1) !important;
    }
    .item {
      cursor: pointer;
      background: #ffffff;
      border: 1px solid #e4e5e7;
      width: 169px;
      height: 160px;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .item-img {
        width: 100%;
        padding: 0 1px;
        img {
          width: calc(100% - 2px);
          display: block;
        }
      }
      .item-header {
        position: absolute;
        top: 14px;
        left: -1px;
        background: #f9b84f;
        color: #ffffff;
        align-items: center;
        text-align: center;
        letter-spacing: -0.03em;
        font-family: "SF Pro Text";
        font-style: normal;
        font-weight: 700;
        font-size: 10px;
        line-height: 10px;
        padding: 4px 10px;
        margin: 0px;
        min-width: 50px;
      }
    }
    .item:first-child {
      margin-right: 31px;
    }
  }
`;

export const FormContainer = styled("div")`
  padding: 19px;
  width: 100%;
  height: 200px;
  position: relative;
  align-items: stretch;
  .orichi-onboarding-tiktok,
  .orichi-onboarding-ins-form {
    width: 100%;
    margin-top: 30px;
  }
  .form-left {
    margin-right: 7px;
    width: calc(50% - 7px);
  }
  .orichi-onboarding-form {
    width: calc(50% - 7px);
  }
  .orichi-color-picker {
    position: fixed;
    top: -20px;
    left: auto;
    right: 20px;
    z-index: 100;
  }
`;
