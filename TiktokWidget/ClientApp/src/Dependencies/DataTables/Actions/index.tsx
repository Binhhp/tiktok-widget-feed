import { Button, Tooltip } from "@shopify/polaris";
import React from "react";
import { ActionWrapper } from "./ActionStyle";
import { IActionProps } from "./ActionsType";
function Actions(props: IActionProps) {
  return (
    <ActionWrapper>
      {props.showAddToStore && (
        <Tooltip content="Add to store" dismissOnMouseOut>
          <Button id="btn-addtostore" onClick={props.onHandleAddToStore}>
            Add to store
          </Button>
        </Tooltip>
      )}
      <Tooltip content="Edit" dismissOnMouseOut>
        <Button id="btn-edit" onClick={props.onEdit}>
          Edit
        </Button>
      </Tooltip>
      <Tooltip content="Delete" dismissOnMouseOut>
        <Button id="btn-delete-table" onClick={props.onDelete}>
          Delete
        </Button>
      </Tooltip>
    </ActionWrapper>
  );
}

export default Actions;
