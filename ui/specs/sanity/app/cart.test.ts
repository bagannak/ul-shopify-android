/**
 * @group Sanity
 */
import { expect } from "chai";
import { Browser } from 'webdriverio';
import { CartActions, CartScreen, Driver, LoginActions, HomeScreen } from '../../../../uiExport';

/**
 * Cart Page Validation
 */
let driver: Browser<'async'>;
let loginActions: LoginActions;
let cartActions: CartActions;
let cartScreen: CartScreen;
let homeScreen: HomeScreen;

declare let reporter: any;
const specName = 'Cart validation';
describe(specName, () => {
  beforeAll(async () => {
    driver = await Driver.getDriver(specName);
    loginActions = new LoginActions(driver);
    cartActions = new CartActions(driver);
    cartScreen = new CartScreen(driver);
    homeScreen = new HomeScreen(driver);
    homeScreen.tapOnProfileIcon()
    loginActions.login({ email: "ulshopify@ultralesson.com", password:'12345' });
  });

  afterEach(async () => {
    await Driver.attachScreenshots(driver, reporter);
  });

  afterAll(async () => {
    await Driver.closeDrivers([driver]);
  });

  it('Verify adding an item to the cart', async () => {
    await cartActions.clickOnProduct();
    await cartActions.clickOnAddToCartButton();
    await cartActions.clickOnGoToCart();
    expect(await cartScreen.getProductInCartEleName()).to.equal('Elegant Suite');
  });

  // it('Verify removing an item from the cart', async () => {
  //   await cartActions.deleteProductInCart();
  //   // expect(await )
  // })

});
