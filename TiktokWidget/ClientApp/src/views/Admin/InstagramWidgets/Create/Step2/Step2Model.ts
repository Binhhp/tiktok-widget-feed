import { ImageStorage } from "assets/images/ImageStorage";
import { TemplateType } from "Dependencies/TikTokLayout/LayoutTemplateType";

interface ITemplateLayout {
  key: TemplateType;
  title: "Slider" | "List" | string;
  image: any;
  width?: number;
}
const templates: ITemplateLayout[] = [
  {
    key: TemplateType.Slider,
    title: "Slider",
    image: ImageStorage.Templates.InsSlider,
  },
  {
    key: TemplateType.List,
    title: "List",
    image: ImageStorage.Templates.InsList,
  },
];

export class TemplateModel {
  public static layouts: typeof templates = templates;
}
