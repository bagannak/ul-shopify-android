/**
 * @group Sanity
 */

import { Browser } from 'webdriverio';
import { Driver, HomeScreenActions, HomeScreen, LoginActions } from '../../../../uiExport';


/**
 * Home Page Validation
 */
let driver: Browser<'async'>;
let loginActions: LoginActions;
let homeScreen: HomeScreen;
let homeScreenActions: HomeScreenActions;
declare let reporter: any;
const specName = 'Login app validation';
describe(specName, () => {
  beforeAll(async () => {
    driver = await Driver.getDriver(specName);
    loginActions = new LoginActions(driver);
    homeScreen= new HomeScreen(driver);
    homeScreenActions = new HomeScreenActions(driver);
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
  it('verify login', async () => {
   await homeScreenActions.navigateTo(await homeScreen.profileIcon())
    await loginActions.login({
      email: "ulshopify@ultralesson.com",
      password: "12345",
    });
  });
});
