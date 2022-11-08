import styled from "Dependencies/StyledComponents/Container";

export const FeedbackWrapper = styled("div")`
  width: auto;
  .text-confirm {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-family: "SF Pro Display";
    line-height: 25px;
    color: #202223;
    font-weight: 400;
    padding: 70px 20px 55px 20px;
  }
`;

export const DivImageThank = styled("div")`
  position: absolute;
  top: -52%;
  left: 50%;
  transform: translate(-52%, 50%);
  z-index: 520;
  img {
    width: 100%;
    display: block;
  }
`;
