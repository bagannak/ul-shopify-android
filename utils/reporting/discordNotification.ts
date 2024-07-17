import fs from 'fs';
import superagent, { Response } from 'superagent';
import { INotificationReporter } from './reportingInterface';
import { LOGGER } from './loggerHelper';

interface Field {
  name: string,
  value: string
}

interface Embed {
  title: string,
  description: string,
  color: string | number,
  fields: Field[]
}

interface NotificationPayload {
  username: string,
  embeds: Embed[]
}

export class DiscordNotification implements INotificationReporter {
  notificationJsonFile = './notifications/notification.json';

  allureReportLink = './notifications/allureReportLink.txt';

  branchNameFile = './notifications/branchName.txt';

  setupStatus = './tokens/setup_status.txt';

  passedColor = '65280';

  failedColor = '15299665';

  normalColor = '16777215';

  pendingColor = '13882323';

  resetNotification(title: string) {
    try {
      const parseJson: NotificationPayload = {
        username: 'Webhook',
        embeds: [{
          title, color: '', description: '', fields: [],
        }],
      };
      fs.writeFileSync(this.notificationJsonFile, JSON.stringify(parseJson));
    } catch (error) {
      throw new Error(error);
    }
  }

  async prepareNotificationJson(results: any): Promise<void> {
    let passedSpecsAsString = '';
    let failedSpecsAsString = '';
    let pendingSpecAsString = '';
    let numPassedTestSuites: number = 0;
    let numFailedTestSuites: number = 0;
    let numPendingTestSuites: number = 0;
    let numTotalTestSuites: number = 0;
    let numPassingTests: number = 0;
    let numFailingTests: number = 0;
    let numPendingTests: number = 0;
    let numTotalTests: number = 0;
    let testFileName: string = '';
    try {
      numPassedTestSuites = results.numPassedTestSuites;
      numFailedTestSuites = results.numFailedTestSuites;
      numPendingTestSuites = results.numPendingTestSuites;
      numTotalTestSuites = results.numTotalTestSuites;
      const reportLink = fs.readFileSync(this.allureReportLink, 'utf-8');

      // get each spec level details
      for (let index = 0; index < results.testResults.length; index += 1) {
        const tempFilePath: string[] = results.testResults[index].testFilePath.split('/');
        testFileName = tempFilePath[tempFilePath.length - 1];
        let tempNumPassingTests = 0;
        let tempNumFailingTests = 0;
        let tempNumPendingTests = 0;
        let tempNumTotalTests = 0;
        tempNumPassingTests = results.testResults[index].numPassingTests;
        tempNumFailingTests = results.testResults[index].numFailingTests;
        tempNumPendingTests = results.testResults[index].numPendingTests;
        numPassingTests += tempNumPassingTests;
        numFailingTests += tempNumFailingTests;
        numPendingTests += tempNumPendingTests;
        tempNumTotalTests = tempNumPassingTests + tempNumFailingTests + tempNumPendingTests;
        numTotalTests += tempNumTotalTests;
        if (tempNumPendingTests > 0) {
          pendingSpecAsString += `${testFileName} (Total tests:${tempNumTotalTests}, Passed tests-${tempNumPassingTests}, Failed tests-${tempNumFailingTests}, Pending tests-${tempNumPendingTests})\n`;
        } else if (tempNumFailingTests > 0) {
          failedSpecsAsString += `${testFileName} (Total tests:${tempNumTotalTests}, Passed tests-${tempNumPassingTests}, Failed tests-${tempNumFailingTests}, Pending tests-${tempNumPendingTests})\n`;
        } else {
          passedSpecsAsString += `${testFileName} (Total tests:${tempNumTotalTests}, Passed tests-${tempNumPassingTests}, Failed tests-${tempNumFailingTests}, Pending tests-${tempNumPendingTests})\n`;
        }
      }
      // read notification json file content
      const dataFileContent = fs.readFileSync(this.notificationJsonFile, 'utf-8');
      const notificationPayload: NotificationPayload = JSON.parse(dataFileContent);

      const totalExecutedSuites = numPassedTestSuites + numFailedTestSuites + numPendingTestSuites;

      notificationPayload.embeds[0].color = this.normalColor;
      // removing port number
      notificationPayload.embeds[0].description = `[***__View Detailed HTML Report__***](${reportLink.replace(/:\d{4}/, '')})`;

      notificationPayload.embeds[0].fields.push({
        name: 'Overall sepcs summary',
        value: `Total Suites: ${numTotalTestSuites} \t Suites Executed: ${totalExecutedSuites} \tPassed: ${numPassedTestSuites}  \tFailed: ${numFailedTestSuites} \tPending: ${numPendingTestSuites}`,
      });
      notificationPayload.embeds[0].fields.push({
        name: 'Overall tests summary',
        value: `Total: ${numTotalTests} \tPassed: ${numPassingTests} \tFailed: ${numFailingTests} \tPending: ${numPendingTests}`,
      });

      notificationPayload.embeds.push({
        title: 'Failed specs',
        color: this.failedColor,
        description: failedSpecsAsString,
        fields: [],
      });
      notificationPayload.embeds.push({
        title: 'Passed specs',
        color: this.passedColor,
        description: passedSpecsAsString,
        fields: [],
      });
      notificationPayload.embeds.push({
        title: 'Pending specs',
        color: this.pendingColor,
        description: pendingSpecAsString,
        fields: [],
      });

      // write the details to notification json file
      fs.writeFileSync(this.notificationJsonFile, JSON.stringify(notificationPayload));
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendNotification(sendSlackNotifications: boolean, webhookUrl: string): Promise<void> {
    try {
      let requestResponse: Response;
      const dataFileContent = await fs.readFileSync(this.notificationJsonFile, 'utf-8');
      const headersParam = {
        'Content-Type': 'application/json',
      };
      if (sendSlackNotifications) {
        requestResponse = await superagent.post(webhookUrl).set(headersParam).send(dataFileContent);
        if (requestResponse.status === 204 || requestResponse.status === 200) LOGGER.info('Notification sent to Discord');
        else {
          console.error(`notification response status-${requestResponse.status}`);
          console.error(`notification response status-${await requestResponse.statusCode}`);
          throw new Error('Something went wrong while sending notification to Discord');
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
