export default class MoneyCurrentFormat {
  static money_format: any = "{{amount}} USD";
  static FormatMoney(cents: any, format?: any) {
    if (typeof cents === "string") {
      cents = cents.replace(".", "");
    }
    if (format === undefined || format == null) {
      format = "{{amount}}}";
    }
    var value = "";
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || this.money_format;

    function defaultOption(opt: any, def: any) {
      return typeof opt == "undefined" ? def : opt;
    }

    function formatWithDelimiters(
      number: any,
      precision: any,
      thousands?: any,
      decimal?: any
    ) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ",");
      decimal = defaultOption(decimal, ".");

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split("."),
        dollars = parts[0].replace(
          /(\d)(?=(\d\d\d)+(?!\d))/g,
          "$1" + thousands
        ),
        cents = parts[1] ? decimal + parts[1] : "";

      return dollars + cents;
    }
    let val = formatString.match(placeholderRegex)[1];
    switch (val) {
      case "amount":
        value = formatWithDelimiters(cents, 2);
        break;
      case "amount_no_decimals":
        value = formatWithDelimiters(cents, 0);
        break;
      case "amount_with_comma_separator":
        value = formatWithDelimiters(cents, 2, ".", ",");
        break;
      case "amount_no_decimals_with_comma_separator":
        value = formatWithDelimiters(cents, 0, ".", ",");
        break;
      default:
        value = formatWithDelimiters(cents, 2);
        break;
    }
    return formatString.replace(placeholderRegex, value);
  }
}
