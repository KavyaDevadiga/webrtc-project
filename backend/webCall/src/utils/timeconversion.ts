export class TimeConversionUtils {
  public static hoursToSeconds(hours: number): number {
    return hours * 60 * 60;
  }

  public static secondsToHours(seconds: number): number {
    return seconds / 60 / 60;
  }

  public static daysToHours(days: number): number {
    return days * 24;
  }
}
