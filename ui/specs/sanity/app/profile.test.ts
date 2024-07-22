/**
 * @group Sanity
 */

import { Browser } from 'webdriverio';
import { Driver, LoginActions } from '../../../../uiExport';
import { HomeScreen } from '../../../screens/common/homeScreen';
import { expect } from 'chai';
import { ProfileActions } from '../../../screens/userActions/profileActions';
/**
 * Home Page Validation
 */
let driver: Browser<'async'>;
let loginActions: LoginActions;
let homeScreen: HomeScreen;
let profileActions: ProfileActions

declare let reporter: any;
const specName = 'Login app validation';
describe(specName, () => {
    beforeAll(async () => {
        driver = await Driver.getDriver(specName);
        loginActions = new LoginActions(driver);
        homeScreen = new HomeScreen(driver);
        profileActions = new ProfileActions(driver);
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
        expect(await profileActions.isUserOnProfileScreen()).to.be.true;
    });

    it('Verify that the register and login buttons are on the profile screen', async () => {
        await homeScreen.tapOnProfileIcon();
        expect(await profileActions.isLoginButtonPresent()).to.be.true;
        expect(await profileActions.isRegisterButtonPresent()).to.be.true;

    })
});
