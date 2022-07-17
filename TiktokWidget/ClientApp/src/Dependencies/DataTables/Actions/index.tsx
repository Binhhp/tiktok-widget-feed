import { Icon, Tooltip } from "@shopify/polaris";
import { DeleteMinor, EditMinor } from "@shopify/polaris-icons";
import React from "react";
import { ActionItem, ActionWrapper } from "./ActionStyle";
import { IActionProps } from "./ActionsType";
function Actions(props: IActionProps) {
  return (
    <ActionWrapper>
      <Tooltip content="Edit" dismissOnMouseOut>
        <ActionItem onClick={props.onEdit}>
          <Icon source={EditMinor}></Icon>
        </ActionItem>
      </Tooltip>
      <Tooltip content="Delete" dismissOnMouseOut>
        <ActionItem bg="#E20000" onClick={props.onDelete}>
          <Icon source={DeleteMinor}></Icon>
        </ActionItem>
      </Tooltip>
    </ActionWrapper>
  );
}

export default Actions;
