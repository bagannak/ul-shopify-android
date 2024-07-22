import { Browser } from "webdriverio";
import { BaseScreen, OtpScreen } from "../../../uiExport";

export class OtpActions extends BaseScreen {
    otpScreen: OtpScreen

  constructor(driver: Browser<"async">) {
    super(driver);
    this.otpScreen = new OtpScreen(this.driver);
  }

  async enterOtpAndSubmit(otp: String) {
    await this.otpScreen.fillOtp(otp);
    await this.click(await this.otpScreen.verifyButtonEle());
  }
}
