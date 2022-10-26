import React, { useState } from "react";
import {
  IInstagramDto,
  IItemActive,
  ITemplateStoreModel,
  TemplateStoreModel,
} from "./InstagramLayoutModel";
const initialState = new TemplateStoreModel();

export interface IOnSetItemsProps {
  items: IInstagramDto[];
  count: number;
}

export interface IInstagramLayoutContext {
  state: ITemplateStoreModel;
  OnSetItems: (payload: IOnSetItemsProps) => void;
  OnActiveItem: (payload: IItemActive) => void;
}
export const InstagramLayoutContext =
  React.createContext<IInstagramLayoutContext>({
    OnActiveItem: () => {},
    OnSetItems: () => {},
    state: new TemplateStoreModel(),
  });

function InstagramLayoutContextProvider({ children }: any) {
  const [state, setState] = useState<ITemplateStoreModel>(initialState);

  const OnSetItems = (payload: IOnSetItemsProps): void => {
    setState({
      ...state,
      count: payload.count,
      pageIndex: state.pageIndex + 1,
      items: [...state.items, ...payload.items],
    });
  };

  const OnActiveItem = (payload: IItemActive): void => {
    setState({
      ...state,
      index: payload,
    });
  };

  return (
    <InstagramLayoutContext.Provider
      value={{
        state,
        OnSetItems,
        OnActiveItem,
      }}
    >
      {children}
    </InstagramLayoutContext.Provider>
  );
}

export default InstagramLayoutContextProvider;
