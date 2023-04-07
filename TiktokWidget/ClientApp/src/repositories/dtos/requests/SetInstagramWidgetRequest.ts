import { IInstagramWidget } from "stores/Admin/InstagramWidget/state";
import { ProductResponse } from "../responses/ProductResponse";

interface HeaderInstagramOwner {
  enable: boolean;
  title: string;
}

interface InstagramOptionOwner {
  LayoutType: number;
  LabelReadMore: string;
  LabelLoadMore: string;
  ShowNetworkIcon: boolean;
  LoadMoreBackGround: string;
  ItemBackGround: string;
  ItemColor: string;
  NumberPerRow: number;
  LimitItems: number;
}

export class SetInstagramWidgetRequest {
  public Id?: string;
  public WidgetTitle: string;
  public SourceType: number;
  public ValueSource: string;
  public Header: HeaderInstagramOwner;
  public Options: InstagramOptionOwner;
  public DisableShowItems?: string[];
  public ItemSorts?: string[];
  public Products?: ProductResponse[];

  constructor(dto: IInstagramWidget) {
    this.Id = dto?.id;
    this.WidgetTitle = dto?.title || "";
    this.SourceType = dto?.source || 0;
    this.ValueSource = dto?.valueSource || "";
    this.Header = {
      enable: dto?.header === "enable",
      title: dto?.titleHeader || "",
    };
    if (!dto?.titleHeader) {
      this.Header.enable = false;
    }
    this.DisableShowItems = dto?.disableShowItems;
    this.ItemSorts = dto?.itemSorts;
    this.Products = dto?.products;
    this.Options = {
      LabelLoadMore: dto?.labelLoadMore || "",
      LoadMoreBackGround: dto?.loadMoreBackground || "",
      ItemBackGround: dto?.itemBackground || "",
      ItemColor: dto?.itemColor || "",
      LabelReadMore: dto?.labelReadMore || "",
      LayoutType: dto?.layout || 0,
      LimitItems: dto?.limitItems || 0,
      NumberPerRow: dto?.numberItemPerRow || 0,
      ShowNetworkIcon: dto?.showNetworkIcon === "enable",
    };
    if (dto?.disableShowItems) {
      this.DisableShowItems = dto.disableShowItems;
    }
    if (dto?.itemSorts) {
      this.ItemSorts = dto?.itemSorts;
    }
  }
}
