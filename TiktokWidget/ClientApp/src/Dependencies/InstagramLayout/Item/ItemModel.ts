import {
  IInstagramDto,
  InstagramOption,
  ItemShowAs,
} from "../InstagramLayoutModel";

export interface IItemProps {
  width: number;
  showAs: ItemShowAs;
  item: IInstagramDto;
  option: InstagramOption;
  onClick?: (item: IInstagramDto) => () => void;
}
