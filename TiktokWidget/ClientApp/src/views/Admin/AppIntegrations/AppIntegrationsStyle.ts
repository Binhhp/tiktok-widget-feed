import styled from "Dependencies/StyledComponents/Container";
import _styled from "styled-components";
import { MediaCard } from "@shopify/polaris";

export const AppIntegrationWrapper = styled("div")`
  width: 100%;
  padding: 40px 32px;
  background: rgba(246, 246, 247, 0.89);

  .title {
    font-size: 20px;
    line-height: 24px;
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
