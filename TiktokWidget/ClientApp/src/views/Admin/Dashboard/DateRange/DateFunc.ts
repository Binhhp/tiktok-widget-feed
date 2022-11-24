export function convertShortDate(date: string): string {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function dateDiffDays(date1: Date, date2: Date): number {
  const Difference_In_Time = date2.getTime() - date1.getTime();

  return Difference_In_Time / (1000 * 3600 * 24);
}
