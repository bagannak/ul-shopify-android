/* eslint no-unused-vars: "off" */

import {
  appendFileSync, existsSync, mkdirSync, writeFileSync,
} from 'fs';
import { Constants } from '../configs/constants';
import {
  LoggerHelper, Urls, SlackNotification, INotificationReporter, DiscordNotification,
} from '../webservicesExport';
import { EnvProperties } from '../configs/env.properties';
import { EnvPropertiesEnums } from '../configs/env.properties.enums';

const env: string = Constants.commandLineArguments.env;
const group: string = process.env.group;
const platform: string = Constants.commandLineArguments.platform;
const headless: boolean = Boolean(Constants.commandLineArguments.headless);

// slack notification
let slackDefaultMessage:string = '';
const dateForReporting = `${new Date().toLocaleDateString('en-IN', {
  year: '2-digit', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Kolkata',
})}`;

if (platform === undefined) {
  slackDefaultMessage = `_API_ ${group} Test Report on ENV-_${(env).toUpperCase()}_ Date-${dateForReporting}`;
} else if (platform.toLowerCase().includes('web')) {
  slackDefaultMessage = `_WEB_ ${group} Test Report on ENV-_${(env).toUpperCase()}_ Date-${dateForReporting}`;
} else {
  slackDefaultMessage = `_APP_ ${group} Test Report on ENV-_${(env).toUpperCase()}_ Date-${dateForReporting}`;
}

// allure
const allureResultDir = './allure-results';
const allureEnvPropFile = `${allureResultDir}/environment.properties`;

module.exports = async () => {
  try {
    LoggerHelper.setupLogger('Setup');
    console.log('------Running SETUP---------');

    // send slack notification
    if (Constants.commandLineArguments.sendNotification === 'true') {
      if (EnvProperties.NotificationType === EnvPropertiesEnums.NotificationType.Slack) {
        const notification:INotificationReporter = new SlackNotification();
        notification.resetNotification(slackDefaultMessage);
      } else if (EnvProperties.NotificationType === EnvPropertiesEnums.NotificationType.Discord) {
        const notification:INotificationReporter = new DiscordNotification();
        notification.resetNotification(slackDefaultMessage);
      }
    }

    // details on html report
    if (!existsSync(allureResultDir)) {
      mkdirSync(allureResultDir);
    }
    writeFileSync(allureEnvPropFile, `ENV=${env}`);
    appendFileSync(allureEnvPropFile, `\nUI_Url=${Constants.baseUrlUi}`);
    appendFileSync(allureEnvPropFile, `\nApi_Url=${Urls.baseUrl}`);
    appendFileSync(allureEnvPropFile, `\nSuite=${group}`);
    appendFileSync(allureEnvPropFile, `\nPLATFORM=${platform}`);
    appendFileSync(allureEnvPropFile, `\nHEADLESS=${headless}`);
  } catch (error) {
    console.error(error);
    // throw new Error('-------Something went badly wrong while executing setup.js!!!------');
    console.error('-------Something went badly wrong while executing setup.js!!!------');
  }
};
