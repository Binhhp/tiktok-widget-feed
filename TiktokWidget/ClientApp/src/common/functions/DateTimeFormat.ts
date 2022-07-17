export class DateTimeFormatter {
  public static TimeZone(date: Date): string {
    const hour = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`;
    const minute = date.getMinutes()
      ? date.getMinutes()
      : `0${date.getMinutes()}`;
    return `${hour}:${minute}`;
  }

  public static ConvertTimeStamp(
    timestamp?: string,
    dateUTC?: boolean
  ): string {
    if (timestamp) {
      const time = new Date(parseInt(timestamp) * 1000);
      if (dateUTC) {
        return time.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }
      return time.toLocaleString("en-US", {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
      });
    }
    return "Invalid Date";
  }

  public static onFormatDateTimeUTC = (
    time: Date,
    timeZone?: string
  ): string => {
    var options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    if (timeZone) {
      options.timeZone = timeZone;
    }
    return time.toLocaleString("en-US", options);
  };

  public static onFormatDateUTC = (time?: string): string => {
    if (time) {
      return new Date(time).toLocaleDateString();
    }
    return "Invalid Date";
  };
}
