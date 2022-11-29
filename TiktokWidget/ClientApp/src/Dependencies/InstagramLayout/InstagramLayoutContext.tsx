import React, { useState } from "react";
import {
  IInstagramDto,
  IItemActive,
  ITemplateStoreModel,
  IUserInformation,
  TemplateStoreModel,
} from "./InstagramLayoutModel";
const initialState = new TemplateStoreModel();

export interface IOnSetItemsProps {
  items: IInstagramDto[];
  count: number;
  nonAppend?: boolean;
}

export interface IInstagramLayoutContext {
  state: ITemplateStoreModel;
  loading: boolean;
  OnCloseLoading: () => void;
  OnAppendItems: (payload: IOnSetItemsProps) => void;
  OnActiveItem: (payload: IItemActive) => void;
}
export const InstagramLayoutContext =
  React.createContext<IInstagramLayoutContext>({
    OnActiveItem: () => {},
    OnAppendItems: () => {},
    state: new TemplateStoreModel(),
    loading: true,
    OnCloseLoading: () => {},
  });

function InstagramLayoutContextProvider({ children }: any) {
  const [state, setState] = useState<ITemplateStoreModel>(initialState);
  const [loading, setLoading] = useState(true);

  const OnCloseLoading = () => setLoading(false);
  const OnAppendItems = (payload: IOnSetItemsProps): void => {
    const item = payload.items[0];
    const user: IUserInformation = {
      id: item?.user?.id,
      isPrivate: item?.user?.isPrivate,
      name: item?.user?.name,
      picture: item?.user?.picture,
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
    <InstagramLayoutContext.Provider
      value={{
        loading,
        OnCloseLoading,
        state,
        OnAppendItems,
        OnActiveItem,
      }}
    >
      {children}
    </InstagramLayoutContext.Provider>
  );
}

export default InstagramLayoutContextProvider;
