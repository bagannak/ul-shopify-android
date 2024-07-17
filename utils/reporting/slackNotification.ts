import fs from 'fs';
import { IncomingWebhook } from '@slack/webhook';
import { INotificationReporter } from './reportingInterface';

export class SlackNotification implements INotificationReporter {
  notificationJsonFile = './notifications/notification.json';

  allureReportLink = './notifications/allureReportLink.txt';

  branchNameFile = './notifications/branchName.txt';

  setupStatus = './tokens/setup_status.txt';

  attachments:any[] = [];

  failedColor = '#dc3545';

  normalColor = '#36a64f';

  resetNotification(headerMessage: string) {
    try {
      const parseJson = { text: `*${headerMessage}*`, attachments: this.attachments };
      fs.writeFileSync(this.notificationJsonFile, JSON.stringify(parseJson));
    } catch (error) {
      throw new Error(error);
    }
  }

  async prepareNotificationJson(results: any): Promise<void> {
    // let passedSpecsAsString = '';
    let failedSpecsAsString = '';
    // let pendingSpecAsString = '';
    let numPassedTestSuites: number = 0;
    let numFailedTestSuites: number = 0;
    let numPendingTestSuites: number = 0;
    let numTotalTestSuites: number = 0;
    let numPassingTests: number = 0;
    let numFailingTests: number = 0;
    let numPendingTests: number = 0;
    let numTotalTests: number = 0;
    // let testFilePath: string = '';
    try {
      numPassedTestSuites = results.numPassedTestSuites;
      numFailedTestSuites = results.numFailedTestSuites;
      numPendingTestSuites = results.numPendingTestSuites;
      numTotalTestSuites = results.numTotalTestSuites;
      const jenkinsJobLink = fs.readFileSync(this.allureReportLink, 'utf-8');
      // const whoTriggeredJob = await fs.readFileSync(whoTriggeredJobFile, 'utf-8');
      const branchName = fs.readFileSync(this.branchNameFile, 'utf-8');

      // let passedSpecNumbering:number = 1;
      let failedSpecNumbering:number = 1;
      // let pendingSpecNumbering:number = 1;
      // get each spec level details
      for (let index = 0; index < results.testResults.length; index += 1) {
        const tempFilePath: string[] = results.testResults[index].testFilePath.split('/');
        const testFilePath = tempFilePath[tempFilePath.length - 1].replace('.test.ts', '');
        let specName:string = '';
        if (results.testResults[index].testResults[0] !== undefined) specName = results.testResults[index].testResults[0].ancestorTitles[0];
        else specName = `Spec name not found ${testFilePath}`;
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
        if (tempNumFailingTests > 0) {
          failedSpecsAsString += `${failedSpecNumbering}. ${specName} \t(*Failed tests - ${tempNumFailingTests}*)\n`;
          failedSpecNumbering += 1;
        }
        // else if (tempNumPendingTests > 0) {
        //   pendingSpecAsString += `${pendingSpecNumbering}.${specName} (Total tests:${tempNumTotalTests}, Passed tests-${tempNumPassingTests}, Failed tests-${tempNumFailingTests}, Pending tests-${tempNumPendingTests})\n`;
        //   pendingSpecNumbering += 1;
        // } else {
        //   passedSpecsAsString += `${passedSpecNumbering}.${specName} (Total tests:${tempNumTotalTests}, Passed tests-${tempNumPassingTests}, Failed tests-${tempNumFailingTests}, Pending tests-${tempNumPendingTests})\n`;
        //   passedSpecNumbering += 1;
        // }
      }
      // read notification json file content
      const dataFileContent = fs.readFileSync(this.notificationJsonFile);
      const parseJson = await JSON.parse(dataFileContent.toString());

      const totalExecutedSuites = numPassedTestSuites + numFailedTestSuites + numPendingTestSuites;
      await parseJson.attachments.push({
        color: this.normalColor,
        // pretext: '*Summary of execution*',
        text: `*Overall Test Suites Summary* - Total - *${numTotalTestSuites}* \t Executed - *${totalExecutedSuites}* \tPassed - *${numPassedTestSuites}*  \tFailed - *${numFailedTestSuites}* \tSkipped - *${numPendingTestSuites}* \n *Overall Test Case Summary* - Total - *${numTotalTests}* \tPassed - *${numPassingTests}* \tFailed - *${numFailingTests}* \tSkipped - *${numPendingTests}* \n Executed by using *${branchName.replace('\n', '')}* automation branch`,
        actions: [
          {
            type: 'button',
            text: 'Click Here To View Report',
            url: jenkinsJobLink.replace('\n', ''),
          },
        ],
      });
      if (fs.readFileSync(this.setupStatus, 'utf-8') === 'FAILED') {
        await parseJson.attachments.push({
          color: this.failedColor,
          text: 'Pre-requisite script failed\nAll The Tests Got FAILED/SKIPPED!!!\nPlease see pipeline execution logs for more details',
        });
      } else if (numFailingTests > 0) {
        await parseJson.attachments.push({
          color: this.failedColor,
          pretext: 'Failed Test Suites',
          text: failedSpecsAsString,
        });
      } else {
        await parseJson.attachments.push({
          color: this.normalColor,
          text: 'All The Tests Got Passed!!!',
        });
      }

      fs.writeFileSync(this.notificationJsonFile, JSON.stringify(parseJson));
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendNotification(sendSlackNotifications: boolean, webhookUrl: string): Promise<void> {
    try {
      const dataFileContent = fs.readFileSync(this.notificationJsonFile, 'utf-8');
      const webhook = new IncomingWebhook(webhookUrl);
      if (sendSlackNotifications) await webhook.send(await JSON.parse(dataFileContent));
    } catch (error) {
      throw new Error(error);
    }
  }
}
