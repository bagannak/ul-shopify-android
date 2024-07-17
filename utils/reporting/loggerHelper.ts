/* eslint import/no-mutable-exports: "off" */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import winston, { Logger } from 'winston';

/**
 * contains logger helper methods for logging
 */

export let LOGGER: Logger;

export module LoggerHelper {
  /**
   * this method will help in setting the logger
   */
  export function setupLogger(specName?: string) {
    const reportFolderPath: string = `${process.cwd()}/logs`;
    let loggerFileName: string = 'log.log';
    try {
      if (!existsSync(reportFolderPath)) mkdirSync(reportFolderPath);
      if (!(specName === undefined || specName === '' || specName === null)) {
        loggerFileName = `${specName.replace(/[^\w\d]/gi, '_')}.log`;
      }

      // declare format of the logger
      const myformat: winston.Logform.Format = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
      );
      if (!existsSync(path.join(reportFolderPath, loggerFileName))) writeFileSync(path.join(reportFolderPath, loggerFileName), '');
      // initialize the logger
      // if (LOGGER == undefined || LOGGER == null) {
      LOGGER = winston.createLogger({
        level: 'debug',
        format: myformat,
        transports: [
          new winston.transports.File({
            filename: path.join(reportFolderPath, loggerFileName),
            level: 'info',
            maxsize: 5120000,
          }),
          new winston.transports.Console({
            level: 'debug',
          }),
        ],
      });
      LOGGER.info('-----------------------------');
      LOGGER.info('LOGGER setup complete');
      LOGGER.info('-----------------------------');
      LOGGER.info(`generating log file at ${reportFolderPath}/${loggerFileName}`);
      // }
    } catch (error) {
      console.info('-----------------------------');
      console.info('LOGGER setup Failed');
      console.info('-----------------------------');
      throw new Error(error);
    }
  }
}
