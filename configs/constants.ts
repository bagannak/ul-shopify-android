// import { JsonReaderHelper } from '../utils/services/fileUtil/jsonReaderHelper';
import { BasicConfig } from './basicConfig';
import { EnvProperties } from './env.properties';

export module Constants {

  let sendNotification = '';
  if (process.env.SendNotification === undefined) sendNotification = EnvProperties.SendNotification;
  else sendNotification = process.env.SendNotification;

  let browserHeadless:string = '';
  if (process.env.Headless === undefined) browserHeadless = EnvProperties.Headless.toString();
  else browserHeadless = process.env.Headless;

  // store the command line  arguments
  export const commandLineArguments = {
    env: process.env.Env ?? EnvProperties.Env.toString(),
    platform: process.env.Platform ?? EnvProperties.Platform.toString(),
    os: process.env.Os ?? EnvProperties.Os.toString(),
    browser: process.env.Browser ?? EnvProperties.Browser.toString(),
    headless: browserHeadless,
    cloudUserName: process.env.CloudUserName ?? EnvProperties.CloudUserName.toString(),
    cloudKey: process.env.CloudKey ?? EnvProperties.CloudKey.toString(),
    sendNotification,
    implicitTimeout: EnvProperties.ImplicitTimeout,
  };

  export const env: string = commandLineArguments.env;
  export const projectPath: string = process.cwd();

  export const dataFolderPath: string = `${projectPath}/webservices/resources/testdata/${env}`;
  export const mobileApkFolderPath: string = `${projectPath}/ui/resources/apk`;
  export const uiDataFolderPath: string = `${projectPath}/ui/resources/testdata/`;
  export const tokensFolderPath: string = `${projectPath}/tokens`;

  const EnvJson = JSON.parse(JSON.stringify(BasicConfig));
  export const baseUrlUi:string = EnvJson[env].url;

}
