import { IInstagramDto, InstagramOption } from "../InstagramLayoutModel";

export interface SliderProps {
  items: IInstagramDto[];
  option: InstagramOption;
  autoplay?: number;
  onClick?: (item: IInstagramDto) => () => void;
}
