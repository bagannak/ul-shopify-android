import { Element } from "webdriverio";
import { BaseScreen, XpathUtil } from "../../../uiExport";

export class OtpScreen extends BaseScreen {
  private selectors = {
    otpTextField1: {
      android: "//*[@resource-id='com.ultralesson.ulshopify:id/inp-opt-1']",
      ios: "",
    },
    otpTextField2: {
      android: "//*[@resource-id='com.ultralesson.ulshopify:id/inp-opt-2']",
      ios: "",
    },
    otpTextField3: {
      android: "//*[@resource-id='com.ultralesson.ulshopify:id/inp-opt-3']",
      ios: "",
    },
    otpTextField4: {
      android: "//*[@resource-id='com.ultralesson.ulshopify:id/inp-opt-4']",
      ios: "",
    },
    verifyButton: {
      android: '//*[@resource-id="com.ultralesson.ulshopify:id/txt-verify"]',
      ios: "",
    },
  };

  async otpField1(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.otpTextField1)
    );
  }

  async otpField2(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.otpTextField2)
    );
  }

  async otpField3(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.otpTextField3)
    );
  }

  async otpField4(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.otpTextField4)
    );
  }

  async verifyButtonEle(): Promise<Element<"async">> {
    return this.getElement(
      XpathUtil.getXpath(this.driver, this.selectors.verifyButton)
    );
  }

  async fillOtp(otp: String) {
    await this.setValue(await this.otpField1(), otp[0]);
    await this.setValue(await this.otpField2(), otp[1]);
    await this.setValue(await this.otpField3(), otp[2]);
    await this.setValue(await this.otpField4(), otp[3]);
  }
}
