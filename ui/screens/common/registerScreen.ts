import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';
export class RegisterScreen extends BaseScreen {
    private selectors = {
        pageTitle: { android: "//android.widget.TextView[@text='Register']", ios: '' },
        fullNameInput: { android: "//*[@text='Enter your full name']", ios: '' },
        emailInput: { android: "//*[@text='Enter your email']", ios: '' },
        passwordInput: { android: "//*[@text='Enter your password']", ios: '' },
        confirmPasswordInput: { android: "//*[@text='Confirm your password']", ios: '' },
        mobileNumberInput: { android: "//*[@text='Enter your mobile number']", ios: '' },
        registerButton: { android: "//*[@resource-id='com.ultralesson.ulshopify:id/txt-register']", ios: '' },
        loginLink: { android: "//*[@resource-id='com.ultralesson.ulshopify:id/txt-login']", ios: '' },
        ulShopifyLink: { android: "//*[@text='Ul-Shopify']", ios: "" }
    };


    async pageTitleEle(): Promise<Element<'async'>> {
        return this.getElement(this.selectors.pageTitle.ios);
    }
    async fullNameInputEle(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.fullNameInput));
    }
    async emailInputEle(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.emailInput));
    }
    async passwordInputEle(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.passwordInput));
    }
    async confirmPasswordInputEle(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.confirmPasswordInput));
    }
    async mobileNumberInputEle(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.mobileNumberInput));
    }
    async registerButtonEle(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.registerButton));
    }

    async loginLinkText(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.loginLink));
    }

    async ulShopifyLinkText(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.ulShopifyLink));
    }


    async isFullNameInputFieldIsPresent() {
        return this.isDisplayed(await this.fullNameInputEle());
    }

    async isEmailInputFieldPresent() {
        return this.isDisplayed(await this.emailInputEle());
    }

    async isPasswordInputFieldPresent() {
        return this.isDisplayed(await this.passwordInputEle());
    }


    async isConfirmPasswordInputFieldPresent() {
        return this.isDisplayed(await this.confirmPasswordInputEle());
    }


    async isMobileNumInputFieldPresent() {
        return this.isDisplayed(await this.mobileNumberInputEle());
    }



    async enterFullName(fullName: string) {
        await this.setValue(await this.fullNameInputEle(), fullName);
    }
    async enterEmail(email: string) {
        await this.setValue(await this.emailInputEle(), email);
    }
    async enterPassword(password: string) {
        await this.setValue(await this.passwordInputEle(), password);
    }
    async enterConfirmPassword(password: string) {
        await this.setValue(await this.confirmPasswordInputEle(), password);
    }
    async enterMobileNumber(mobileNumber: string) {
        await this.setValue(await this.mobileNumberInputEle(), mobileNumber);
    }
    async tapRegisterButton() {
        await this.click(await this.registerButtonEle());
    }

    async tapOnLoginLink() {
        await this.click(await this.loginLinkText());
    }

    async tapOnUlShopifyLink() {
        await this.click(await this.ulShopifyLinkText());
    }


    async fillRegisterDetails(accountDetails: { fullname: string, email: string, password: string, confirmPassword: string, mobileNum: string }) {
        await this.enterFullName("abcd");
        await this.enterEmail("abc@gmail.com");
        await this.enterPassword("12345");
        await this.enterConfirmPassword("12345");
        await this.enterMobileNumber('1234567890');
        await this.tapRegisterButton();
    }



}
