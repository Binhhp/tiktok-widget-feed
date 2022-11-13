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
  nonAppend?: boolean;
}

export interface ILayoutTemplateContext {
  loading: boolean;
  OnCloseLoading: () => void;
  state: ITemplateStoreModel;
  OnAppendItems: (payload: IOnSetItemsProps) => void;
  OnActiveItem: (payload: IItemActive) => void;
}
export const LayoutTemplateContext =
  React.createContext<ILayoutTemplateContext>({
    OnActiveItem: () => {},
    OnAppendItems: () => {},
    state: new TemplateStoreModel(),
    loading: true,
    OnCloseLoading: () => {},
  });

function LayoutTemplateContextProvider({ children }: any) {
  const [state, setState] = useState<ITemplateStoreModel>(initialState);
  const [loading, setLoading] = useState(true);

  const OnCloseLoading = () => setLoading(false);
  const OnAppendItems = (payload: IOnSetItemsProps): void => {
    const item = payload.items[0];
    const user = {
      author: item.author,
      avatarThumb: item.avatarThumb,
      diggCount: item.authorStats?.diggCount,
      followerCount: item.authorStats?.followerCount,
      followingCount: item.authorStats?.followingCount,
    };
    if (payload.nonAppend) {
      setState({
        index: state.index,
        count: payload.count,
        pageIndex: state.pageIndex,
        items: payload.items,
        user: user,
      });
    } else {
      setState({
        ...state,
        count: payload.count,
        pageIndex: state.pageIndex + 1,
        items: [...state.items, ...payload.items],
        user: user,
      });
    }
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
        loading,
        OnCloseLoading,
        state,
        OnAppendItems,
        OnActiveItem,
      }}
    >
      {children}
    </LayoutTemplateContext.Provider>
  );
}

export default LayoutTemplateContextProvider;
