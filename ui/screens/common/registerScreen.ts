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
        ulShopifyLink: { android: "//*[@text='Ul-Shopify']", ios: "" },
        passMinLengthMsg: { android: "//*[@resource-id='com.ultralesson.ulshopify:id/txt-password-should-be-minimum-of-5-characters']", ios: "" },
        confirmPassIsNotSameMsg: { android: "//*[@resource-id='com.ultralesson.ulshopify:id/txt-confirm-password-is-not-matched-with-password']", ios: "" },
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

    async passMinLengthMsgEle(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.passMinLengthMsg));
    }

    async confirmPassIsNotSameMsgEle(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.confirmPassIsNotSameMsg));
    }
}
