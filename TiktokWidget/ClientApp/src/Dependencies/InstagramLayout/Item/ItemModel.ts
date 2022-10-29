import { IInstagramDto, InstagramOption } from "../InstagramLayoutModel";

export interface IItemProps {
  width: number;
  item: IInstagramDto;
  option: InstagramOption;
  onClick?: (item: IInstagramDto) => () => void;
}
