/**
 * @group Sanity
 */
import { Browser } from 'webdriverio';
import { Driver, EkamNavBarHyperLinks, HomeActions } from '../../../../uiExport';
import {
  UserLoginData, UserServices, ValidationUtil, LOGGER,
} from '../../../../webservicesExport';

/**
 * Home page validation
 */
let driver: Browser<'async'>;
let homeActions: HomeActions;
declare let reporter: any;

const specName = 'Ekam home page validation';
describe('specName', () => {
  beforeAll(async () => {
    driver = await Driver.getDriver(specName);
    homeActions = new HomeActions(driver);
  });

  afterEach(async () => {
    await Driver.attachScreenshots(driver, reporter);
  });

  afterAll(async () => {
    await Driver.closeDrivers([driver]);
  });

  it('Home Page Validation', async () => {
    await homeActions.clickingOnDocsLink(EkamNavBarHyperLinks.Docs);
  });

  // use of apis during ui automation
  it('Home Page Validation', async () => {
    // make calls to api if necessary as below
    // prepare user LoginData
    const email = 'eve.holt@reqres.in';
    const password = 'cityslicka';
    const userLoginData: UserLoginData = {
      email, password,
    };

    // Login to App and get authorization token
    const requestResponse = await UserServices.loginUser(userLoginData);
    const loginUserResp = await UserServices.readLoginUserResponse(requestResponse);
    await ValidationUtil.responseCode(requestResponse, 200, 'Expected status code-200');
    const authorizationToken = loginUserResp.token;
    LOGGER.info(`authorizationToken-${authorizationToken}`);
    // use the response object to fetch required details and pass to ui tests

    await homeActions.clickingOnDocsLink(EkamNavBarHyperLinks.Docs);
  });
});
