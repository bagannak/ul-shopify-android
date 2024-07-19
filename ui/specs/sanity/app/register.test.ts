/**
* @group Sanity
*/


import { Browser } from 'webdriverio';
import { Driver, LoginActions, LoginScreen, OtpActions } from '../../../../uiExport';
import { HomeScreen } from '../../../screens/common/homeScreen';
import { ProfileScreen } from '../../../screens/common/profileScreen';
import { RegisterActions } from '../../../screens/userActions/registerActions';
import { RegisterScreen } from '../../../screens/common/registerScreen';
import { expect } from 'chai';
import testData from '../../../resources/testdata/qa/testData.qa.json';

/**
* Home Page Validation
*/
let driver: Browser<'async'>;
let loginActions: LoginActions;
let homeScreen: HomeScreen;
let profileScreen: ProfileScreen;
let registerActions: RegisterActions;
let registerScreen: RegisterScreen;
let otpActions: OtpActions;


declare let reporter: any;
const specName = 'Register User';
describe(specName, () => {
    beforeAll(async () => {
        driver = await Driver.getDriver(specName);
        loginActions = new LoginActions(driver);
        homeScreen = new HomeScreen(driver);
        profileScreen = new ProfileScreen(driver);
        registerActions = new RegisterActions(driver);
        registerScreen = new RegisterScreen(driver);
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
        await profileScreen.tapOnRegisterButton();
        expect(await registerScreen.isFullNameInputFieldIsPresent()).to.be.true;
        expect(await registerScreen.isEmailInputFieldPresent()).to.be.true;
        expect(await registerScreen.isPasswordInputFieldPresent()).to.be.true;
        expect(await registerScreen.isConfirmPasswordInputFieldPresent()).to.be.true;
        expect(await registerScreen.isMobileNumInputFieldPresent()).to.be.true;
    })

    it("Verify the UI-shopify link in the register screen is clickable.", async () => {
        await homeScreen.tapOnProfileIcon();
        await profileScreen.tapOnRegisterButton();
        await registerScreen.tapOnUlShopifyLink();
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
        expect(await registerScreen.isPassMinLengthMsgDisplayed()).to.be.true;
    })

    it("verify register user should fail if the value of password and confirm password are not the same", async () => {
        await homeScreen.tapOnProfileIcon();
        await registerActions.registerUser(testData.register_user_confirm_password_mismatch);
        expect(await registerScreen.isConfirmPassNotSameMsgDisplayed()).to.be.true;
    })



});


