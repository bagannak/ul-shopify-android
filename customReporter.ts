/* eslint no-underscore-dangle: 0 */
/* eslint class-methods-use-this: 0 */
/* eslint no-promise-executor-return: 0 */

import { DiscordNotification, INotificationReporter, SlackNotification } from './webservicesExport';
import { EnvProperties } from './configs/env.properties';
import { EnvPropertiesEnums } from './configs/env.properties.enums';

class MyCustomReporter {
  _globalConfig: any = this;

  constructor(globalConfig: any) {
    this._globalConfig = globalConfig;
    //   this._options = options;
  }

  /**
     * on execution complete get results
     * @param {*} contexts
     * @param {*} results
     */
  async onRunComplete(contexts: any, results: any) {
    // waiting for 2sec to print the log messages if any pending
    await this.sleep(10000);
    if (EnvProperties.NotificationType === EnvPropertiesEnums.NotificationType.Slack) {
      const notification:INotificationReporter = new SlackNotification();
      await notification.prepareNotificationJson(results);
    } else if (EnvProperties.NotificationType === EnvPropertiesEnums.NotificationType.Discord) {
      const notification:INotificationReporter = new DiscordNotification();
      await notification.prepareNotificationJson(results);
    }
    console.log('------RUN COMPLETE------');
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = MyCustomReporter;
