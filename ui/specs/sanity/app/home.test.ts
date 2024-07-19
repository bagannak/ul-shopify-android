/**
 * @group Sanity
 */

import { Browser } from 'webdriverio';
import { BaseScreen, Driver, HomeActions } from '../../../../uiExport';
import { HomeScreen } from '../../../screens/common/homeScreen';
import { expect } from 'chai';

/**
 * Home Page Validation
 */
let driver: Browser<'async'>;
let homeScreen: HomeScreen;
let homeActions: HomeActions;
let baseScreen: BaseScreen;
declare let reporter: any;
const specName = 'HomeScreen Validation';
describe(specName, () => {
  beforeAll(async () => {
    driver = await Driver.getDriver(specName);
    homeScreen = new HomeScreen(driver);
    baseScreen = new BaseScreen(driver)
  });

  afterEach(async () => {
    await Driver.attachScreenshots(driver, reporter);
  });

  afterAll(async () => {
    await Driver.closeDrivers([driver]);
  });

  /**
 * it will verify login on both android and ios
 * pass os in env.properties file
 */
  
  it('Verify welcome message is displayed',async()=>{
    const welcomeMsgEle =await homeScreen.welcomeMsgEle();
    expect(await baseScreen.isDisplayed(welcomeMsgEle)).to.be.true;
  });
});
