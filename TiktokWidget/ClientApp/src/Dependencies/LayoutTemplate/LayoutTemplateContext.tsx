import React, { useState } from "react";
import {
  IItemActive,
  ITemplateStoreModel,
  ITikTokVideoDto,
  TemplateStoreModel,
} from "./LayoutTemplateModel";
const initialState = new TemplateStoreModel();

export interface IOnSetItemsProps {
  items: ITikTokVideoDto[];
  count: number;
}

export interface ILayoutTemplateContext {
  state: ITemplateStoreModel;
  OnSetItems: (payload: IOnSetItemsProps) => void;
  OnActiveItem: (payload: IItemActive) => void;
}
export const LayoutTemplateContext =
  React.createContext<ILayoutTemplateContext>({
    OnActiveItem: () => {},
    OnSetItems: () => {},
    state: new TemplateStoreModel(),
  });

function LayoutTemplateContextProvider({ children }: any) {
  const [state, setState] = useState<ITemplateStoreModel>(initialState);

  const OnSetItems = (payload: IOnSetItemsProps): void => {
    const item = payload.items[0];
    const user = {
      author: item.author,
      avatarThumb: item.avatarThumb,
      diggCount: item.authorStats?.diggCount,
      followerCount: item.authorStats?.followerCount,
      followingCount: item.authorStats?.followingCount,
    };
    setState({
      ...state,
      count: payload.count,
      pageIndex: state.pageIndex + 1,
      items: [...state.items, ...payload.items],
      user: user,
    });
  };

  const OnActiveItem = (payload: IItemActive): void => {
    setState({
      ...state,
      index: payload,
    });
  };

  return (
    <LayoutTemplateContext.Provider
      value={{
        state,
        OnSetItems,
        OnActiveItem,
      }}
    >
      {children}
    </LayoutTemplateContext.Provider>
  );
}

export default LayoutTemplateContextProvider;
