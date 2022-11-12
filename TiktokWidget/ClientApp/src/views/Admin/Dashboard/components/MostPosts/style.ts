import styled from 'Dependencies/StyledComponents/Container';

export const MostPostRoot = styled('div')`
  margin-top: 90px;
  div.post-list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .title {
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #101828;
    margin-bottom: 14px;
  }
`;

export const MostPostItem = styled('div')`
  background: #f5faff;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  flex-shrink: 0;
  font-family: 'SF Pro Display';
  .poster {
    background-color: transparent;
    position: relative;
    width: 31%;
    height: 100%;
    padding: 11%;
    overflow: hidden;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    cursor: pointer;
    text-decoration: none;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
  .content {
    flex: 1;
    margin: auto 64px auto 16px;
  }
  .content-item:first-child {
    margin-bottom: 6px;
  }
  .content-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #194185;
    }
    .value {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #175cd3;
    }
  }
`;
