import styled from "Dependencies/StyledComponents/Container";

export const ErrorBoundaryWrapper = styled("div")`
  width: 100%;
  height: 100%;
  position: relative;
  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
