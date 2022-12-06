import styled from "Dependencies/StyledComponents/Container";

export const LiveTemplateWrapper = styled("div", "", "orichi-instagram")`
  width: 100%;
  min-height: 400px;
  padding: 20px;
  overflow: hidden;
  background: #ffffff;
  position: relative;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 1590px) {
    #desctt {
      max-height: 36px;
    }
    .orichi-instagram-item__desc {
      margin-bottom: 15px;
      margin-top: 25px;
    }
  }
  @media screen and (min-width: 1590px) {
    #desctt {
      max-height: 36px;
    }
    .orichi-instagram-item__desc {
      margin-bottom: 0px;
    }
    .orichi-instagram-item__content {
      padding-top: 15% !important;
    }
  }
`;

export const EmptyWrapper = styled("div", "", "orichi-instagram")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
