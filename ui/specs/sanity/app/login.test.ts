/**
 * @group Sanity
 */

import { Browser } from 'webdriverio';
import { Driver, HomeScreenActions, HomeScreen, LoginActions, ProfileActions, LoginScreen } from '../../../../uiExport';
import { expect } from 'chai';
import testData from '../../../resources/testdata/qa/testData.qa.json';
import { RegisterActions } from '../../../screens/userActions/registerActions';
import { RegisterScreen } from '../../../screens/common/registerScreen';

/**
 * Home Page Validation
 */
let driver: Browser<'async'>;
let loginActions: LoginActions;
let homeScreen: HomeScreen;
let homeScreenActions: HomeScreenActions;
let profileActions: ProfileActions
let loginScreen: LoginScreen;
let registerActions: RegisterActions;
let registerScreen: RegisterScreen;

declare let reporter: any;
const specName = 'Login app validation';
describe(specName, () => {
  beforeEach(async () => {
    driver = await Driver.getDriver(specName);
    loginActions = new LoginActions(driver);
    homeScreen = new HomeScreen(driver);
    homeScreenActions = new HomeScreenActions(driver);
    profileActions = new ProfileActions(driver);
    loginScreen = new LoginScreen(driver);
    registerActions = new RegisterActions(driver);
    registerScreen = new RegisterScreen(driver);
  });

  afterEach(async () => {
    await Driver.attachScreenshots(driver, reporter);
    await Driver.closeDrivers([driver]);
  });

  afterAll(async () => {
    
  });

  /**
 * it will verify login on both android and ios
 * pass os in env.properties file
 */
  it('verify the login user feature with valid user credentials.', async () => {
    await homeScreenActions.navigateTo(await homeScreen.profileIcon())
    await loginActions.login({
      email: "ulshopify@ultralesson.com",
      password: "12345",
    });
  });
  it("verify the input fields (email, password), link text Forgot password are displayed in Login user screen", async () => {
    await homeScreenActions.navigateTo(await homeScreen.profileIcon())
    await profileActions.tapOnLoginButton();
    expect(await loginActions.isDisplayed(await loginScreen.emailTextFieldEle())).to.be.true;
    expect(await loginActions.isDisplayed(await loginScreen.passwordTextFieldEle())).to.be.true;
    expect(await loginActions.isDisplayed(await loginScreen.forgotPasswordEle())).to.be.true;
  })

  it("verify the login user feature with invalid userId.", async () => {
    await homeScreenActions.navigateTo(await homeScreen.profileIcon())
    await profileActions.tapOnLoginButton();
    await loginActions.fillLoginDetails(testData.login_user_invalid_credentials);
    expect(await registerActions.isElementDisplayed(await registerScreen.emailNotRegisteredPopUpEle()))
  })

});
