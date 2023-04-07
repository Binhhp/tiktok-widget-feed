import { SourceTypeEnum } from "repositories/dtos/requests/GetVideoByJobRequest";

export interface VideoPreviewProps {
  active: boolean;
  onSaveChanges: (
    videoUnchecked: string[],
    itemSorted: string[],
    disableTopNewItems?: boolean
  ) => void;

  onCloseModal: () => void;

  videoUncheckedDefault: string[];
  hiddenButtonBack?: boolean;
  buttonSaveText?: string;

  optionsShowItem?: OptionShowItems;
}

interface OptionShowItems {
  sourceType?: keyof SourceTypeEnum | string;
  valueSource?: string;
  disableTopNewItems?: boolean;
  widgetId?: string;
  limitItems?: number;
}
export interface VideoState {
  pageIndex: number;
  data: any[];
  dataReal: any[];
  count: number;
  unChecked: string[];
}

export interface DragListProps {
  data: any[];
  unChecked: string[];
  unCheckShowVideos: (id: string) => () => void;
  count: number;
  loading: boolean;
  onGetmore: () => void;
  onChangeData: (data: any[]) => void;
}
