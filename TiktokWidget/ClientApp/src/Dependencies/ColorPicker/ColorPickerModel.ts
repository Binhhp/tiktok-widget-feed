export interface IColorPickerWidget {
  color?: string;
  type: string;
  onChange: (color: string, type: string) => void;
}
