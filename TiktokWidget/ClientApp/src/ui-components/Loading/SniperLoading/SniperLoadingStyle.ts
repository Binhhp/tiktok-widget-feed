import styled from "Dependencies/StyledComponents/Container";
import { keyframes } from "styled-components";

const Spin = keyframes`
    100% { transform: rotate(1turn); }
`;

interface IDivSpinnerLoading {
  color?: string;
}
export const DivSpinnerLoading = styled(
  "div",
  "loading",
  "orichi"
)<IDivSpinnerLoading>`
  width: 36px;
  height: 36px;
  svg {
    fill: ${(props) => props.color ?? "rgba(68, 157, 167, 1)"};
    animation: ${Spin} 500ms linear infinite;
  }
`;
