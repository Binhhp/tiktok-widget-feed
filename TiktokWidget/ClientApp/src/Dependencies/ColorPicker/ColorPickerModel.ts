export interface IColorPickerWidget {
  color?: string;
  type: "accentColor" | "itemColor" | "itemBackground";
  onChange: (
    color: string,
    type: "accentColor" | "itemColor" | "itemBackground"
  ) => void;
}
