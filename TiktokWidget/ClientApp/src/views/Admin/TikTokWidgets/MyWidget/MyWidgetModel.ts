import { TiktokWidgetResponse } from "repositories/dtos/responses/TiktokWidgetResponse";
import { DateTimeFormatter } from "common/functions/DateTimeFormat";

export class DataService {
  public static ToDto = (
    obj: TiktokWidgetResponse[],
    renderTag: any
  ): any[] => {
    return obj.map((item) => {
      var dt = new Date(item.modifyDate);
      if (dt.getFullYear() < new Date().getFullYear()) {
        dt = new Date(item.createDate);
      }
      return {
        title: item.widgetTitle,
        date: DateTimeFormatter.onFormatDateTimeUTC(dt),
        tags: renderTag(item.products),
      };
    });
  };
}
