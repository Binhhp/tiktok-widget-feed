import styled from "Dependencies/StyledComponents/Container";

export const DashboardWrapper = styled("div")`
  height: 100%;
  width: 100%;
  padding: 40px 32px;
`;

export const DashboardContainer = styled("div")`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  column-gap: 20px;
  background: rgba(246, 246, 247, 0.89);
  .left {
    width: 70%;
    flex: 1;
  }
  .right {
    width: 30%;
    padding-top: 30px;
  }
`;
