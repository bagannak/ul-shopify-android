import { Browser } from "webdriverio";
import { BaseScreen } from "../base/baseScreen";
import { ProfileScreen } from "../common/profileScreen";
import { RegisterScreen } from "../common/registerScreen";
import { OtpActions } from "./otpActions";

export class RegisterActions extends BaseScreen {
    profileScreen: ProfileScreen
    registerScreen: RegisterScreen
    otpActions: OtpActions
    constructor(driver: Browser<"async">) {
        super(driver);
        this.registerScreen = new RegisterScreen(driver);
        this.otpActions = new OtpActions(driver);
        this.profileScreen = new ProfileScreen(driver);
    }


    async registerUser(accountDetails: { fullname: string, email: string, password: string, confirmPassword: string, mobileNum: string }) {
        await this.profileScreen.tapOnRegisterButton();
        await this.registerScreen.fillRegisterDetails(accountDetails);
    }

}


