import React from "react";
import { TabWrapper } from "./TabStyled";
export default function TabOnBoarding(props: TabsProps) {
  const onSelectTab = (n: number) => () => {
    if (props.step > n || props.step === n) props.onSelect(n);
  };
  return (
    <TabWrapper>
      <div className="tab-menu">
        <ul className="tabs">
          {props.tabs.map((menu, number) => (
            <li
              key={number}
              id={menu?.id}
              className="Polaris-Tabs__TabContainer"
            >
              <button
                className={`${
                  number !== props.selected
                    ? "Polaris-Tabs__Tab"
                    : "Polaris-Tabs__Tab active"
                }`}
                onClick={onSelectTab(number)}
              >
                {menu?.content(number)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-content">{props.children}</div>
    </TabWrapper>
  );
}

interface TabsProps {
  tabs: any[];
  selected: number;
  step: number;
  onSelect: (selected: number) => void;
  children?: any;
}
