import dateFormat from 'dateformat';
import { LOGGER } from '../../webservicesExport';

/**
 * DateTime helper will have common reusable methods related to date and time
 * refer page -https://www.npmjs.com/package/dateformat
 */

export module DateTimeUtil {
  /**
   * get today date
   * @returns
   */
  export async function getTodayDate(): Promise<string> {
    let date: string;
    try {
      date = new Date().toString();
      // date = dateFormat();
    } catch (error) {
      LOGGER.error(error.stack);
      throw new Error(error);
    }
    return date;
  }

  /**
   * convert passed date to specific format
   * @param date
   * @param format
   * @returns
   */
  export async function convertDate(date: Date, format: string): Promise<string> {
    let convertedDate: string;
    try {
      convertedDate = dateFormat(date, format);
    } catch (error) {
      LOGGER.error(error.stack);
      throw new Error(error);
    }
    return convertedDate;
  }

  /**
   * get date difference in days
   * @param date1
   * @param date2
   * @returns
   */
  export async function getDifferenceInDays(date1: Date, date2: Date): Promise<number> {
    try {
      const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
      return diffInMs / (1000 * 60 * 60 * 24);
    } catch (error) {
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }

  /**
   * get date difference in hours
   * @param date1
   * @param date2
   * @returns
   */
  export async function getDifferenceInHours(date1: Date, date2: Date): Promise<number> {
    try {
      const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
      return diffInMs / (1000 * 60 * 60);
    } catch (error) {
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }

  /**
   * get date difference in minutes
   * @param date1
   * @param date2
   * @returns
   */
  export async function getDifferenceInMinutes(date1: Date, date2: Date): Promise<number> {
    try {
      const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
      return diffInMs / (1000 * 60);
    } catch (error) {
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }

  /**
   * get date difference in seconds
   * @param date1
   * @param date2
   * @returns
   */
  export async function getDifferenceInSeconds(date1: Date, date2: Date): Promise<number> {
    try {
      const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
      return diffInMs / 1000;
    } catch (error) {
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }

  /**
   * get date difference in milli seconds
   * @param date1
   * @param date2
   * @returns
   */
  export async function getDifferenceInMilliSeconds(date1: Date, date2: Date): Promise<number> {
    try {
      const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
      return diffInMs;
    } catch (error) {
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }

  /**
   * adds minutes to passed date object
   * @param date
   * @param minutes
   * @returns
   */
  export async function addMinutesToDate(date: Date, minutes: number): Promise<Date> {
    try {
      return new Date(date.getTime() + minutes * 60000);
    } catch (error) {
      LOGGER.error(error.stack);
      throw new Error(error);
    }
  }
}
