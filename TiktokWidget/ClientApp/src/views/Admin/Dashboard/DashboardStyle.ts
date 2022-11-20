import styled from "Dependencies/StyledComponents/Container";

export const DashboardWrapper = styled("div")`
  height: 100%;
  width: 100%;
  padding: 40px 32px;
  .orichi-dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    .orichi-dashboard-welcome {
      p.orichi-text-welcome {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #667085;
      }
      h3 {
        color: #101828;
        font-weight: 500;
        font-size: 30px;
        line-height: 38px;
        margin-bottom: 3px;
      }
    }
  }
`;

export const DashboardContainer = styled("div")`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 100%;
  column-gap: 20px;
  background: rgba(246, 246, 247, 0.89);
  .orichi-dashboard-left {
    width: 70%;
    flex: 1;
  }
  .orichi-dashboard-right {
    width: 30%;
  }
`;
