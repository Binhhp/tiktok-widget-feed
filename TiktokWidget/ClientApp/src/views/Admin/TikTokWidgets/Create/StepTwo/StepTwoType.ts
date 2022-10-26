import { ImageStorage } from "assets/images/ImageStorage";
import { TemplateType } from "Dependencies/TikTokLayout/LayoutTemplateType";

interface ITemplateLayout {
  key: TemplateType;
  title: "Slider" | "Carousel" | "List" | "Masonry" | string;
  image: any;
  width?: number;
}
const templates: ITemplateLayout[] = [
  {
    key: TemplateType.Slider,
    title: "Slider",
    image: ImageStorage.Templates.Slider,
  },
  {
    key: TemplateType.Carousel,
    title: "Carousel",
    image: ImageStorage.Templates.Carousel,
  },
  {
    key: TemplateType.List,
    title: "List",
    image: ImageStorage.Templates.List,
  },
  {
    key: TemplateType.Masonry,
    title: "Masonry",
    image: ImageStorage.Templates.Masonry,
    width: 50,
  },
];

export class TemplateModel {
  public static layouts: typeof templates = templates;
  public static default: number = 0;
  public static title: string = "My TikTok Feed";
  public static caption: string = "caption";
}
