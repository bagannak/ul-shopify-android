/**
* @group Sanity
*/


import { Browser } from 'webdriverio';
import { BaseScreen, Driver, HomeActions, HomeScreen, HomeScreenActions, LoginActions, LoginScreen, OtpActions } from '../../../../uiExport';
import { RegisterActions } from '../../../screens/userActions/registerActions';
import { expect } from 'chai';
import testData from '../../../resources/testdata/qa/testData.qa.json';
import { ProfileActions } from '../../../screens/userActions/profileActions';

/**
* Home Page Validation
*/
let driver: Browser<'async'>;
let homeScreen: HomeScreen;
let homeScreenActions: HomeScreenActions;
let profileActions: ProfileActions;
let registerActions: RegisterActions;
let otpActions: OtpActions;
let loginActions: LoginActions;
let baseScreen: BaseScreen;


declare let reporter: any;
const specName = 'Register User';
describe(specName, () => {
    beforeEach(async () => {
        driver = await Driver.getDriver(specName);
         baseScreen = new BaseScreen(driver);
        homeScreen = new HomeScreen(driver);
        homeScreenActions = new HomeScreenActions(driver);
        profileActions = new ProfileActions(driver);
        registerActions = new RegisterActions(driver);
        otpActions = new OtpActions(driver);
        loginActions = new LoginActions(driver);
    });



    afterEach(async () => {
        await Driver.attachScreenshots(driver, reporter);
         await Driver.closeDrivers([driver]);
    });


    afterAll(async () => {
    });

    it("verify the input fields are present in register user screen", async () => {
        await homeScreenActions.navigateTo(await homeScreen.profileIcon());
        await profileActions.tapOnRegisterButton();
        expect(await registerActions.isFullNameInputFieldIsPresent()).to.be.true;
        expect(await registerActions.isEmailInputFieldPresent()).to.be.true;
        expect(await registerActions.isPasswordInputFieldPresent()).to.be.true;
        expect(await registerActions.isConfirmPasswordInputFieldPresent()).to.be.true;
        expect(await registerActions.isMobileNumInputFieldPresent()).to.be.true;
    })

    it("Verify the UI-shopify link in the register screen is clickable.", async () => {
        await homeScreenActions.navigateTo(await homeScreen.profileIcon());
        await profileActions.tapOnRegisterButton();
        await registerActions.tapOnUlShopifyLink();
        expect(await homeScreenActions.isUserOnHomeScreen()).to.be.true;
    })

    it("verify the register user feature with valid user data.", async () => {
        await homeScreenActions.navigateTo(await homeScreen.profileIcon());
        await registerActions.registerUser(testData.register_user_valid_data);
        await otpActions.enterOtpAndSubmit('0000');
        expect(await homeScreenActions.isRegSuccessMsgDisplayed()).to.be.true;
    })

    it("verify the register user feature with mobile num less than 10 digits", async () => {
        await homeScreenActions.navigateTo(await homeScreen.profileIcon());
        await registerActions.registerUser(testData.register_user_invalid_mob_num);
        expect(await baseScreen.isDisplayed(await homeScreen.errorMsgForInvalidNumberEle())).to.be.true;
    })


    it("verify register user should fail if password has less than or equal to 4 characters", async () => {
        await homeScreenActions.navigateTo(await homeScreen.profileIcon());
        await registerActions.registerUser(testData.register_user_invalid_password_length);
        console.log("Hemanth ", testData.register_user_invalid_password_length);
        expect(await registerActions.isPassMinLengthMsgDisplayed()).to.be.true;
    })

    it("verify register user should fail if the value of password and confirm password are not the same", async () => {
        await homeScreenActions.navigateTo(await homeScreen.profileIcon());
        await registerActions.registerUser(testData.register_user_confirm_password_mismatch);
        expect(await registerActions.isConfirmPassNotSameMsgDisplayed()).to.be.true;
    })

    it("verify the login link is clickable on the register user screen.", async () => {
        await homeScreenActions.navigateTo(await homeScreen.profileIcon());
        await profileActions.tapOnRegisterButton();
        await registerActions.tapOnLoginLink();
        expect(await loginActions.isUserOnLoginScreen()).to.be.true;
    })



});


