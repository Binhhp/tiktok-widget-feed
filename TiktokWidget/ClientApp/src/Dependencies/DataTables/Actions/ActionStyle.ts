import styled from "Dependencies/StyledComponents/Container";
import { IActionItemType } from "./ActionsType";

export const ActionItem = styled("div")<IActionItemType>`
  width: max-content;
  margin: 0px 5px;
  svg {
    fill: ${(props) => props.bg || "rgba(92, 95, 98, 1)"};
  }
  cursor: pointer;
`;

export const ActionWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
