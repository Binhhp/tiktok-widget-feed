import styled from 'Dependencies/StyledComponents/Container';

export const DashboardWrapper = styled('div')`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 40px 32px;
  column-gap: 20px;
  background: rgba(246, 246, 247, 0.89);

  .left {
    width: 70%;
  }
  .right {
    width: 30%;
  }
`;
