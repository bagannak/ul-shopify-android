import { Element } from 'webdriverio';
import { BaseScreen, XpathUtil } from '../../../uiExport';

export class ProfileScreen extends BaseScreen {

    private selectors = {
        profileScreenHearder: { android: "//*[@text='Welcome to UI-Shopify'", ios: "" },
        registerButton: { android: "//*[@text='Register']", ios: "" },
        loginButton: { android: "//*[@text='Login']", ios: "" },
        backBtn:{android:"//*[@resource-id='com.ultralesson.ulshopify:id/btn-back']",ios:""}
    };

    async registerButton(): Promise<Element<'async'>> {
        await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.registerButton)), 3000);
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.registerButton));
        await this.waitForElementDisplayed(await this.getElement(XpathUtil.getXpath(this.driver, this.selectors.registerButton)), 3000);
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.registerButton));
    }

    async loginButton(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.loginButton));
    }

    async header(): Promise<Element<'async'>> {
        return this.getElement(XpathUtil.getXpath(this.driver, this.selectors.profileScreenHearder));
    }

    async backBtnEle(): Promise<Element<"async">> {
        return this.getElement(
          XpathUtil.getXpath(this.driver, this.selectors.backBtn)
        );
      }

}