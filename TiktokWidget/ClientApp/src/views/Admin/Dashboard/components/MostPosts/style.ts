import styled from 'Dependencies/StyledComponents/Container';

export const MostPostRoot = styled('div')`
  margin-top: 40px;

  .title {
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #101828;
    margin-bottom: 12px;
  }
`;

export const MostPostItem = styled('div')`
  background: #f5faff;
  border-radius: 12px;
  display: flex;

  img {
    width: 100px;
    object-fit: cover;
  }
  .content {
    flex: 1;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 64px;
  }
`;
