import { HSBColor, hsbToRgb, rgbString, rgbToHsb } from "@shopify/polaris";

export class ColorTransform {
  public static RgbStringToHsb = (value?: string): HSBColor => {
    if (value) {
      const rgbValues = value.replace(/[^\d*.?\d*,]/g, "").split(",");
      const color = rgbToHsb({
        red: parseInt(rgbValues[0]),
        green: parseInt(rgbValues[1]),
        blue: parseInt(rgbValues[2]),
      });
      return color;
    }
    return {
      brightness: 0,
      hue: 0,
      saturation: 0,
    };
  };

  public static HsbToRgbString = (value?: HSBColor): string => {
    try {
      if (value) return rgbString(hsbToRgb(value));
    } catch {}
    return rgbString({
      blue: 0,
      green: 0,
      red: 0,
    });
  };
}
