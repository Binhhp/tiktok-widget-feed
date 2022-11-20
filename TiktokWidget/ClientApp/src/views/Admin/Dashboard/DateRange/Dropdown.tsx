import {
  ActionList,
  ActionListItemDescriptor,
  Icon,
  Popover,
} from "@shopify/polaris";
import { ChevronDownMinor, ChevronUpMinor } from "@shopify/polaris-icons";
import React from "react";
import { DropdownRoot } from "./DateRange";
type IProp = {
  isActive: boolean;
  value: string;
  handleActive: () => void;
  handleInActive: () => void;
  items: ActionListItemDescriptor[] | undefined;
};
function Dropdown({
  isActive,
  handleActive,
  handleInActive,
  value,
  items,
}: IProp) {
  const activatorDateRange = (
    <DropdownRoot
      style={{
        borderColor: isActive ? `#4499A3` : `#ccc`,
      }}
      onClick={isActive ? handleInActive : handleActive}
    >
      <div>{value}</div>
      <div>
        <Icon
          source={!isActive ? ChevronDownMinor : ChevronUpMinor}
          color="base"
        />
      </div>
    </DropdownRoot>
  );

  return (
    <Popover
      fullWidth
      active={isActive}
      activator={activatorDateRange}
      onClose={handleInActive}
    >
      <ActionList actionRole="menuitem" items={items} />
    </Popover>
  );
}

export default Dropdown;
