import { ImageStorage } from "assets/images/ImageStorage";
import { TemplateType } from "Dependencies/TikTokLayout/LayoutTemplateType";
import { TemplateInstagramType } from "stores/Admin/InstagramWidget/state";

interface ITemplateLayout {
  key: TemplateInstagramType;
  title: "Slider" | "List" | string;
  image: any;
  width?: number;
}
const templates: ITemplateLayout[] = [
  {
    key: TemplateInstagramType.Slider,
    title: "Slider",
    image: ImageStorage.Templates.InsSlider,
  },
  {
    key: TemplateInstagramType.List,
    title: "List",
    image: ImageStorage.Templates.InsList,
  },
];

export class TemplateModel {
  public static layouts: typeof templates = templates;
}
