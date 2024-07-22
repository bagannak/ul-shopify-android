/**
* @group Sanity
*/


import { Browser } from 'webdriverio';
import { Driver, LoginActions, LoginScreen, OtpActions } from '../../../../uiExport';
import { HomeScreen } from '../../../screens/common/homeScreen';
import { RegisterActions } from '../../../screens/userActions/registerActions';
import { expect } from 'chai';
import testData from '../../../resources/testdata/qa/testData.qa.json';
import { ProfileActions } from '../../../screens/userActions/profileActions';

/**
* Home Page Validation
*/
let driver: Browser<'async'>;
let homeScreen: HomeScreen;
let profileActions: ProfileActions;
let registerActions: RegisterActions;
let otpActions: OtpActions;
let loginActions: LoginActions;


declare let reporter: any;
const specName = 'Register User';
describe(specName, () => {
    beforeAll(async () => {
        driver = await Driver.getDriver(specName);
        homeScreen = new HomeScreen(driver);
        profileActions = new ProfileActions(driver);
        registerActions = new RegisterActions(driver);
        otpActions = new OtpActions(driver);
    });


    afterEach(async () => {
        await Driver.attachScreenshots(driver, reporter);
    });


    afterAll(async () => {
        await Driver.closeDrivers([driver]);
    });

    it("verify the input fields are present in register user screen", async () => {
        await homeScreen.tapOnProfileIcon();
        await profileActions.tapOnRegisterButton();
        expect(await registerActions.isFullNameInputFieldIsPresent()).to.be.true;
        expect(await registerActions.isEmailInputFieldPresent()).to.be.true;
        expect(await registerActions.isPasswordInputFieldPresent()).to.be.true;
        expect(await registerActions.isConfirmPasswordInputFieldPresent()).to.be.true;
        expect(await registerActions.isMobileNumInputFieldPresent()).to.be.true;
    })

    it("Verify the UI-shopify link in the register screen is clickable.", async () => {
        await homeScreen.tapOnProfileIcon();
        await profileActions.tapOnRegisterButton();
        await registerActions.tapOnUlShopifyLink();
        expect(await homeScreen.isUserOnHomeScreen()).to.be.true;
    })

    it("verify the register user feature with valid user data.", async () => {
        await homeScreen.tapOnProfileIcon();
        await registerActions.registerUser(testData.register_user_valid_data);
        await otpActions.enterOtpAndSubmit('0000');
        expect(await homeScreen.isRegSuccessMsgDisplayed()).to.be.true;
    })

    it("verify the register user feature with mobile num less than 10 digits", async () => {
        await homeScreen.tapOnProfileIcon();
        await registerActions.registerUser(testData.register_user_invalid_mob_num);
        expect(await homeScreen.isRegSuccessMsgDisplayed()).to.be.true;
    })


    it("verify register user should fail if password has less than or equal to 4 characters", async () => {
        await homeScreen.tapOnProfileIcon();
        await registerActions.registerUser(testData.register_user_invalid_password_length);
        console.log("Hemanth ", testData.register_user_invalid_password_length);
        expect(await registerActions.isPassMinLengthMsgDisplayed()).to.be.true;
    })

    it("verify register user should fail if the value of password and confirm password are not the same", async () => {
        await homeScreen.tapOnProfileIcon();
        await registerActions.registerUser(testData.register_user_confirm_password_mismatch);
        expect(await registerActions.isConfirmPassNotSameMsgDisplayed()).to.be.true;
    })

    it("verify the login link is clickable on the register user screen.", async () => {
        await homeScreen.tapOnProfileIcon();
        await profileActions.tapOnRegisterButton();
        await registerActions.tapOnLoginLink();
        expect(await loginActions.isUserOnLoginScreen()).to.be.true;
    })



});


