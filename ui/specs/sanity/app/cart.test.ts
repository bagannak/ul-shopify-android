/**
 * @group Sanity
 */
import { expect } from "chai";
import { Browser } from 'webdriverio';
import { CartActions, CartScreen, Driver, LoginActions, HomeScreen, HomeScreenActions, BaseScreen} from '../../../../uiExport';

/**
 * Cart Page Validation
 */
let driver: Browser<'async'>;
let baseScreen: BaseScreen;
let loginActions: LoginActions;
let cartActions: CartActions;
let cartScreen: CartScreen;
let homeScreen: HomeScreen;
let homeScreenActions: HomeScreenActions;

declare let reporter: any;
const specName = 'Cart validation';
describe(specName, () => {
  beforeAll(async () => {
    driver = await Driver.getDriver(specName);
    baseScreen = new BaseScreen(driver);
    loginActions = new LoginActions(driver);
    cartActions = new CartActions(driver);
    cartScreen = new CartScreen(driver);
    homeScreen = new HomeScreen(driver);
    homeScreenActions = new HomeScreenActions(driver);

    await homeScreenActions.navigateTo(await homeScreen.profileIcon());
    loginActions.login({ email: "ulshopify@ultralesson.com", password:'12345' });
  });

  afterEach(async () => {
    await Driver.attachScreenshots(driver, reporter);
  });

  afterAll(async () => {
    await Driver.closeDrivers([driver]);
  });

  it('Verify adding an item to the cart and removing item from the cart', async () => {
    await homeScreenActions.navigateTo(
      await homeScreen.productCategoryEle("clothing")
    );
    await cartActions.clickOnProduct();
    await cartActions.clickOnAddToCartButton();
    await cartActions.clickOnGoToCart();
    expect(await cartScreen.getProductInCartEleName()).to.equal('Elegant Suite');
    await cartActions.deleteProductInCart();
    expect(await baseScreen.isDisplayed(await cartScreen.emptyCartMessageEle()))
      .to.be.true;
    await cartActions.clickOnContinueShoppingButton();
  });

  it("Verify increasing the quantity of an item", async () => {
    await homeScreenActions.navigateTo(
      await homeScreen.productCategoryEle("clothing")
    );
    await cartActions.clickOnProduct();
    await cartActions.clickOnAddToCartButton();
    await cartActions.clickOnGoToCart();
    await cartActions.increaseTheItemQuantity();
    expect(await cartScreen.getQuantityCount()).to.be.equal("2");
    expect(await cartScreen.getTotalAmount()).to.be.equal("₹ 499.98");
  });

  it("Verify decreasing the quantity of an item", async () => {
    await cartActions.decreaseTheItemQuantity();
    expect(await cartScreen.getQuantityCount()).to.be.equal("1");
    expect(await cartScreen.getTotalAmount()).to.be.equal("₹ 249.99");
  });

});
