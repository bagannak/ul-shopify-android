import { Reporter } from 'jest-allure/dist/Reporter';
import { Browser } from 'webdriverio';
import { LocalConfig } from '../../../configs/mobile/local.config';
import { LocalConfigIos } from '../../../configs/mobile/local.config.ios';
import { BrowserStackConfig } from '../../../configs/mobile/browserstack.config';
import { BrowserUtil } from './browserUtil';
import { LambdaTestConfig } from '../../../configs/mobile/lambdaTest.config';
import { LambdaTestConfigIos } from '../../../configs/mobile/lambdaTest.config.ios';
import { lambdaTestWebConfig } from '../../../configs/web/lambdatest.config';
import { MobileDriverUtil } from '../../../uiExport';
import { BasicConfig } from '../../../configs/basicConfig';
import { localConfig } from '../../../configs/web/local.config';
import { Constants } from '../../../webservicesExport';
import { browserstackWebConfig } from '../../../configs/web/browserstack.config';
import { EnvPropertiesEnums } from '../../../configs/env.properties.enums';

const basicConfigEnvJson = BasicConfig;
export module Driver {

  export async function getMobileDriver(specName: string, platform?: EnvPropertiesEnums.Platform): Promise<Browser<'async'>> {
    const cloudPlatform = Constants.commandLineArguments.platform ?? platform;
    switch (cloudPlatform) {
      case EnvPropertiesEnums.Platform.localApp:
        if (Constants.commandLineArguments.os !== undefined && Constants.commandLineArguments.os === 'ios') {
          return MobileDriverUtil.setupMobileDriver(LocalConfigIos, specName, basicConfigEnvJson);
        } return MobileDriverUtil.setupMobileDriver(LocalConfig, specName, basicConfigEnvJson);
      case EnvPropertiesEnums.Platform.lambdatestApp:
        if (Constants.commandLineArguments.os !== undefined && Constants.commandLineArguments.os === 'ios') return MobileDriverUtil.setupMobileDriver(LambdaTestConfigIos, specName, basicConfigEnvJson);
        return MobileDriverUtil.setupMobileDriver(LambdaTestConfig, specName, basicConfigEnvJson);
      case EnvPropertiesEnums.Platform.browserstackApp:
        return MobileDriverUtil.setupMobileDriver(BrowserStackConfig, specName, basicConfigEnvJson);
      default:
        return MobileDriverUtil.setupMobileDriver(LocalConfig, specName, basicConfigEnvJson);
    }
  }

  export async function getWebDriver(specName: string, platform?: EnvPropertiesEnums.Platform, optURL?: string): Promise<Browser<'async'>> {
    let localOrCloudPlatform = Constants.commandLineArguments.platform ?? platform;
    localOrCloudPlatform = localOrCloudPlatform ?? EnvPropertiesEnums.Platform.localWeb; // if undefined then reset to web

    switch (localOrCloudPlatform) {
      case EnvPropertiesEnums.Platform.localWeb:
        return BrowserUtil.setupBrowser(localConfig, specName, basicConfigEnvJson, optURL);
      case EnvPropertiesEnums.Platform.lambdatestWeb:
        return BrowserUtil.setupBrowser(lambdaTestWebConfig, specName, basicConfigEnvJson, optURL);
      case EnvPropertiesEnums.Platform.browserstackWeb:
        return BrowserUtil.setupBrowser(browserstackWebConfig, specName, basicConfigEnvJson, optURL);
      default:
        return BrowserUtil.setupBrowser(localConfig, specName, basicConfigEnvJson, optURL);
    }
  }

  export async function attachScreenshots(driver: Browser<'async'>, reporter: Reporter) {
    try {
      const viewPortScreenshotSource = await driver.takeScreenshot();
      const viewPortScreenshot = Buffer.from(viewPortScreenshotSource, 'base64');
      reporter.addAttachment('View Port Screenshot', viewPortScreenshot, 'image/png');
    } catch (error) {
      console.log(`Screenshot was not taken successfully. Error : ${error}`);
    }
  }

  /**
   * get driver based on PLATFORM parameter
   * @param specName
   * @param platform
   * @returns
   */

  export async function getDriver(specName: string, platform?: EnvPropertiesEnums.Platform, optURL?: string): Promise<Browser<'async'>> {
    let localOrCloudPlatform = Constants.commandLineArguments.platform ?? platform;
    localOrCloudPlatform = localOrCloudPlatform ?? EnvPropertiesEnums.Platform.localWeb; // if undefined then reset to web

    console.log(`Running tests on PLATFORM-${localOrCloudPlatform}`);

    switch (localOrCloudPlatform) {
      case EnvPropertiesEnums.Platform.localWeb:
        return getWebDriver(specName, undefined, optURL);
      case EnvPropertiesEnums.Platform.lambdatestWeb:
      case EnvPropertiesEnums.Platform.browserstackWeb:
        return getWebDriver(specName);
      case EnvPropertiesEnums.Platform.localApp:
      case EnvPropertiesEnums.Platform.lambdatestApp:
      case EnvPropertiesEnums.Platform.browserstackApp:
        return getMobileDriver(specName, localOrCloudPlatform);
      default:
        return getWebDriver(specName);
    }
  }

  /**
   * helps in closing the drivers
   * @param drivers
   */
  export async function closeDrivers(drivers: Browser<'async'>[]) {
    for (let index = 0; index < drivers.length; index += 1) {
      if (drivers[index].isMobile) {
        await drivers[index].closeApp();
        await drivers[index].deleteSession();
      } else await drivers[index].deleteSession();
    }
  }
  export async function closeDriver(driver: Browser<'async'>) {
    await driver.closeApp();
    await driver.deleteSession();
  }
}
