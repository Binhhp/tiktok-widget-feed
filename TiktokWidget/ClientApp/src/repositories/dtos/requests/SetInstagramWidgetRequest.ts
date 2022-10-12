import { ISettingProviderWidget } from "stores/Admin/Widget/state";

interface HeaderInstagramOwner {
  enable: boolean;
  title: string;
}

interface InstagramOptionOwner {
  LayoutType: number;
  LabelReadMore: string;
  ShowNetworkIcon: boolean;
  BackGround: string;
  Color: string;
  NumberPerRow: number;
  LimitItems: number;
}

export class SetInstagramWidgetRequest {
  public WidgetTitle: string;
  public SourceType: number;
  public ValueSource: string;
  public Header: HeaderInstagramOwner;
  public Options: InstagramOptionOwner;

  constructor(dto?: ISettingProviderWidget) {
    this.WidgetTitle = dto?.title || "";
    this.SourceType = dto?.source || 0;
    this.ValueSource = dto?.valueSource || "";
    this.Header = {
      enable: dto?.header === "enable",
      title: dto?.titleHeader || "",
    };
    this.Options = {
      BackGround: dto?.itemBackground || "",
      Color: dto?.itemColor || "",
      LabelReadMore: dto?.labelReadMore || "",
      LayoutType: dto?.layout || 0,
      LimitItems: dto?.limitItem || 0,
      NumberPerRow: dto?.numberItemPerRow || 0,
      ShowNetworkIcon: dto?.showNetworkIcon === "enable",
    };
  }
}
