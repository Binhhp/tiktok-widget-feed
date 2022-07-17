export class NumberFormatter {
  static Format(value?: number): string {
    if (value) {
      if (value > 1000 && value < 1000000)
        return `${(value / 1000).toFixed(1)}K`;
      if (value > 999999 && value < 1000000000)
        return `${(value / 1000000).toFixed(1)}M`;
      if (value > 999999999) return `${(value / 1000000).toFixed(1)}B`;
      return String(value);
    }
    return "0";
  }
}
