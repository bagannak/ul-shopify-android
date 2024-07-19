/**
* @group Sanity
*/


import { Browser } from 'webdriverio';
import { Driver, LoginActions } from '../../../../uiExport';
import { HomeScreen } from '../../../screens/common/homeScreen';
import { ProfileScreen } from '../../../screens/common/profileScreen';
import { RegisterActions } from '../../../screens/userActions/registerActions';


/**
* Home Page Validation
*/
let driver: Browser<'async'>;
let loginActions: LoginActions;
let homeScreen: HomeScreen;
let profileScreen: ProfileScreen;
let registerActions: RegisterActions;


declare let reporter: any;
const specName = 'Register User';
describe(specName, () => {
    beforeAll(async () => {
        driver = await Driver.getDriver(specName);
        loginActions = new LoginActions(driver);
        homeScreen = new HomeScreen(driver);
        profileScreen = new ProfileScreen(driver);
        registerActions = new RegisterActions(driver);
    });


    afterEach(async () => {
        await Driver.attachScreenshots(driver, reporter);
    });


    afterAll(async () => {
        await Driver.closeDrivers([driver]);
    });




    it('verify login', async () => {
        await homeScreen.tapOnProfileIcon();
        await profileScreen.tapOnRegisterButton();
        // await registerActions.registerUser({ fullname: "abc", email: "abc@gmail.com", password: "12345", confirmPassword: "12345", mobileNum: "9876543210" });
    });
});


