export interface INotificationReporter {
  // notificationJsonFile: './notifications/notification.json';

  // jenkinsJobLinkFile: './notifications/allureReportLink.txt';

  // branchNameFile: './notifications/branchName.txt';

  // setupStatus: './tokens/setup_status.txt';

    resetNotification(headerMessage: string):void;

    prepareNotificationJson(results: any): Promise<void>;

    sendNotification(sendSlackNotifications: boolean, webhookUrl: string): Promise<void>;
}
