import { IInstagramDto, InstagramOption } from "../InstagramLayoutModel";

export interface ListProps {
  items: IInstagramDto[];
  autoplay?: number;
  option: InstagramOption;
  onClick?: (item: IInstagramDto) => () => void;
  onLoadmore?: () => void;
}
