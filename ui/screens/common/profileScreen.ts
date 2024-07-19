import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';

export class ProfileScreen extends BaseScreen {

    private selectors = {
        profileScreenHearder: { android: "#com.ultralesson.ulshopify:id/txt-welcome-to-ulshopify", ios: "" },
        registerButton: { android: "//*[@text='Register']", ios: "" },
        loginButton: { android: "//*[@text='Login']", ios: "" },
    };

    async registerButton(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.registerButton));
    }

    async loginButton(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.loginButton));
    }

    async tapOnRegisterButton() {
        await this.click(await this.registerButton());
    }

    async tapOnLoginButton() {
        await this.click(await this.loginButton());
    }

    async isUserOnProfileScreen() {
        return await this.getText(this.selectors.profileScreenHearder.android);
    }



}