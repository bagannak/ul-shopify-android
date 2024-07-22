import { Browser } from "webdriverio";
import { BaseScreen } from "../base/baseScreen";
import { ProfileScreen } from "../common/profileScreen";
import { RegisterScreen } from "../common/registerScreen";
import { OtpActions } from "./otpActions";
import { ProfileActions } from "./profileActions";

export class RegisterActions extends BaseScreen {
    profileActions: ProfileActions
    registerScreen: RegisterScreen
    otpActions: OtpActions
    constructor(driver: Browser<"async">) {
        super(driver);
        this.registerScreen = new RegisterScreen(driver);
        this.otpActions = new OtpActions(driver);
        this.profileActions = new ProfileActions(driver);
    }


    async registerUser(accountDetails: { fullname: string, email: string, password: string, confirmPassword: string, mobileNum: string }) {
        await this.profileActions.tapOnRegisterButton();
        await this.fillRegisterDetails(accountDetails);
    }


    async isFullNameInputFieldIsPresent() {
        return this.isDisplayed(await this.registerScreen.
            fullNameInputEle());
    }

    async isEmailInputFieldPresent() {
        return this.isDisplayed(await this.registerScreen.
            emailInputEle());
    }

    async isPasswordInputFieldPresent() {
        return this.isDisplayed(await this.registerScreen.
            passwordInputEle());
    }


    async isConfirmPasswordInputFieldPresent() {
        return this.isDisplayed(await this.registerScreen.
            confirmPasswordInputEle());
    }


    async isMobileNumInputFieldPresent() {
        return this.isDisplayed(await this.registerScreen.
            mobileNumberInputEle());
    }

    async isPassMinLengthMsgDisplayed() {
        return this.isDisplayed(await this.registerScreen.
            passMinLengthMsgEle());
    }

    async isConfirmPassNotSameMsgDisplayed() {
        return this.isDisplayed(await this.registerScreen.
            confirmPassIsNotSameMsgEle());
    }



    async enterFullName(fullName: string) {
        await this.setValue(await this.registerScreen.
            fullNameInputEle(), fullName);
    }
    async enterEmail(email: string) {
        await this.setValue(await this.registerScreen.
            emailInputEle(), email);
    }
    async enterPassword(password: string) {
        await this.setValue(await this.registerScreen.
            passwordInputEle(), password);
    }
    async enterConfirmPassword(password: string) {
        await this.setValue(await this.registerScreen.
            confirmPasswordInputEle(), password);
    }
    async enterMobileNumber(mobileNumber: string) {
        await this.setValue(await this.registerScreen.
            mobileNumberInputEle(), mobileNumber);
    }
    async tapRegisterButton() {
        await this.click(await this.registerScreen.
            registerButtonEle());
    }

    async tapOnLoginLink() {
        await this.click(await this.registerScreen.
            loginLinkText());
    }

    async tapOnUlShopifyLink() {
        await this.click(await this.registerScreen.
            ulShopifyLinkText());
    }

    async fillRegisterDetails(accountDetails: { fullname: string, email: string, password: string, confirmPassword: string, mobileNum: string }) {
        await this.enterFullName(accountDetails.fullname);
        await this.enterEmail(accountDetails.email);
        await this.enterPassword(accountDetails.password);
        await this.enterConfirmPassword(accountDetails.confirmPassword);
        await this.enterMobileNumber(accountDetails.mobileNum);
        await this.tapRegisterButton();
    }

}


