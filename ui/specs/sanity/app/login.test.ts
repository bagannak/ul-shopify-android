/**
 * @group Sanity
 */

import { Browser } from 'webdriverio';
import { Driver, LoginActions } from '../../../../uiExport';
import { HomeScreen } from '../../../screens/common/homeScreen';

/**
 * Home Page Validation
 */
let driver: Browser<'async'>;
let loginActions: LoginActions;
let homeScreen: HomeScreen;

declare let reporter: any;
const specName = 'Login app validation';
describe(specName, () => {
  beforeAll(async () => {
    driver = await Driver.getDriver(specName);
    loginActions = new LoginActions(driver);
    homeScreen= new HomeScreen(driver);
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
    await homeScreen.tapOnProfileIcon();
    await loginActions.login({ email: 'abc@gmail.com', password: '12345' });
  });
});
