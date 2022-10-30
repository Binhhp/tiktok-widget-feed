import { IInstagramDto, InstagramOption } from "../InstagramLayoutModel";

export interface ListProps {
  items: IInstagramDto[];
  autoplay?: number;
  option: InstagramOption;
  loading?: boolean;
  onClick: (item: IInstagramDto) => () => void;
  onLoadmore: () => void;
  showLoadInfinite?: boolean;
  showPageFirst?: boolean;
}
