import { IInstagramWidget } from "stores/Admin/InstagramWidget/state";

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
  public WidgetTitle: string;
  public SourceType: number;
  public ValueSource: string;
  public Header: HeaderInstagramOwner;
  public Options: InstagramOptionOwner;

  constructor(dto?: IInstagramWidget) {
    this.WidgetTitle = dto?.title || "";
    this.SourceType = dto?.source || 0;
    this.ValueSource = dto?.valueSource || "";
    this.Header = {
      enable: dto?.header === "enable",
      title: dto?.titleHeader || "",
    };
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
  }
}
