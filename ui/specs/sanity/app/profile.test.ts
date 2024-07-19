/**
 * @group Sanity
 */

import { Browser } from 'webdriverio';
import { Driver, LoginActions } from '../../../../uiExport';
import { HomeScreen } from '../../../screens/common/homeScreen';
import { profile } from 'console';
import { ProfileScreen } from '../../../screens/common/profileScreen';
import { expect } from 'chai';
/**
 * Home Page Validation
 */
let driver: Browser<'async'>;
let loginActions: LoginActions;
let homeScreen: HomeScreen;
let profileScreen: ProfileScreen;

declare let reporter: any;
const specName = 'Login app validation';
describe(specName, () => {
    beforeAll(async () => {
        driver = await Driver.getDriver(specName);
        loginActions = new LoginActions(driver);
        homeScreen = new HomeScreen(driver);
        profileScreen = new ProfileScreen(driver);
    });

    afterEach(async () => {
        await Driver.attachScreenshots(driver, reporter);
    });

    afterEach(async () => {
        await Driver.closeDrivers([driver]);
    });

    /**
   * it will verify login on both android and ios
   * pass os in env.properties file
   */
    it('Verify the Profile Screen loads correctly.', async () => {
        await homeScreen.tapOnProfileIcon();
        expect(await profileScreen.isUserOnProfileScreen()).to.be.true;
    });

    it('Verify that the register and login buttons are on the profile screen', async () => {
        await homeScreen.tapOnProfileIcon();
        expect(await profileScreen.isLoginButtonPresent()).to.be.true;
        expect(await profileScreen.isRegisterButtonPresent()).to.be.true;

    })
});
