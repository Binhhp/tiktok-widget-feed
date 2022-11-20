export function convertShortDate(date: string): string {
  const _date = new Date(date);
  return _date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
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
