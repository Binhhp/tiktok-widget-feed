import { IItemActive, TemplateStoreType } from "./model";
import { TemplateStoreActEnum } from "./enum";
import { ITikTokVideoDto } from "Dependencies/LayoutTemplate/LayoutTemplateModel";

export class TemplateStoreActionTS {
  public static OnClearState(): TemplateStoreType {
    return {
      type: TemplateStoreActEnum.CLEAR
    };
  }

  public static OnSetItems(
    id: string,
    payload: ITikTokVideoDto[]
  ): TemplateStoreType {
    return {
      type: TemplateStoreActEnum.ITEMS,
      payload: payload,
      id: id,
    };
  }

  public static OnActiveItem(
    id: string,
    index: IItemActive
  ): TemplateStoreType {
    return {
      type: TemplateStoreActEnum.ITEM_ACTIVE,
      payload: index,
      id: id,
    };
  }

  public static OnSetPage(
    id: string,
    payload: {
      pageIndex?: number;
      count?: number;
    }
  ): TemplateStoreType {
    return {
      type: TemplateStoreActEnum.PAGE_NUMBER,
      payload: payload,
      id: id,
    };
  }
}
