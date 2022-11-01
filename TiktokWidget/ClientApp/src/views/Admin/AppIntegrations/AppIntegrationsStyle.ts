import styled from "Dependencies/StyledComponents/Container";

export const AppIntegrationWrapper = styled("div")`
  width: 100%;
  padding: 24px 32px;
  background: rgba(246, 246, 247, 0.89);
  font-family: "SF Pro Display";
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  p {
    color: #202223;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
  .title {
    font-size: 20px;
    line-height: 20px;
    color: #202223;
    margin-bottom: 24px;
    span {
      font-weight: 700;
    }
  }
  .main {
    display: flex;
    column-gap: 20px;
    .card-item {
      max-width: 320px;
    }

    .Polaris-MediaCard {
      flex-direction: column;
    }
  }
`;
