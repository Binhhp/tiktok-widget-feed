import styled from "Dependencies/StyledComponents/Container";

export const MostPostRoot = styled("div")`
  margin-top: 40px;

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
    margin-bottom: 12px;
  }
`;

export const MostPostItem = styled("div")`
  background: #f5faff;
  border-radius: 12px;
  display: flex;

  img {
    width: 100px;
    height: 70px;
    object-fit: cover;
  }
  .content {
    flex: 1;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 64px;
  }
  .content-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #194185;
    }
    .value {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #175cd3;
    }
  }
`;
