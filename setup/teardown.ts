/* eslint no-unused-vars: "off" */

import { EnvProperties } from '../configs/env.properties';
import { EnvPropertiesEnums } from '../configs/env.properties.enums';
import {
  Constants, WaitUtil, INotificationReporter, SlackNotification, DiscordNotification,
} from '../webservicesExport';

const sendNotification:boolean = Constants.commandLineArguments.sendNotification === 'true';

module.exports = async () => {
  try {
    console.log('------Running TEARDOWN---------');

    // if (process.env.npm_lifecycle_event.toLowerCase().includes('local')) sendNotification = false;
    console.log(`--------send slack notification---------${sendNotification}`);
    if (sendNotification) {
      if (EnvProperties.NotificationType === EnvPropertiesEnums.NotificationType.Slack) {
        const notification:INotificationReporter = new SlackNotification();
        const webhookUrl = EnvProperties.WebhookUrl;
        await notification.sendNotification(sendNotification, webhookUrl);
      } else if (EnvProperties.NotificationType === EnvPropertiesEnums.NotificationType.Discord) {
        const notification:INotificationReporter = new DiscordNotification();
        const webhookUrl = EnvProperties.WebhookUrl;
        await notification.sendNotification(sendNotification, webhookUrl);
      }
    }
    await WaitUtil.sleep(5000);
  } catch (error) {
    console.error(error);
  }
};
