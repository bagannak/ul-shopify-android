/**
 * @group Sanity
 */
import { expect } from "chai";
import { Browser } from 'webdriverio';
import { CartActions, CartScreen, Driver, LoginActions, HomeScreen, HomeScreenActions, BaseScreen} from '../../../../uiExport';
import { max } from "moment";

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

  it.skip('Verify adding an item to the cart and removing item from the cart', async () => {
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

  it.skip("Verify increasing the quantity of an item", async () => {
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

  it.skip("Verify decreasing the quantity of an item", async () => {
    await cartActions.decreaseTheItemQuantity();
    expect(await cartScreen.getQuantityCount()).to.be.equal("1");
    expect(await cartScreen.getTotalAmount()).to.be.equal("₹ 249.99");
  });

  it.skip("Verify that the cart is empty after removing items", async()=>{
    await cartActions.deleteProductInCart();
    expect(await baseScreen.isDisplayed(await cartScreen.emptyCartMessageEle()))
      .to.be.true;
    await cartActions.clickOnContinueShoppingButton();
  });

  it("Verify that the item quantity cannot go below 1", async ()=>{
    await homeScreenActions.navigateTo(
      await homeScreen.productCategoryEle("clothing")
    );
    await cartActions.clickOnProduct();
    await cartActions.clickOnAddToCartButton();
    await cartActions.clickOnGoToCart();
    await cartActions.decreaseTheItemQuantity();

    expect(await baseScreen.isDisplayed(await cartScreen.emptyCartMessageEle()))
      .to.be.true;
    await cartActions.clickOnContinueShoppingButton();
  });

  it("Verify the maximum quantity limit for an item", async () => {
    const maxQuantity = 5;
    await homeScreenActions.navigateTo(
      await homeScreen.productCategoryEle("clothing")
    );
    await cartActions.clickOnProduct();
    await cartActions.clickOnAddToCartButton();
    await cartActions.clickOnGoToCart();
    for(let i=0; i<maxQuantity;i++){
      await cartActions.increaseTheItemQuantity();
    }

    expect(await cartScreen.getQuantityCount()).to.be.not.equal('6');


  });

  it.skip('Verify that when the user clicks on "Place Order" button, the success message should be displayed', async()=>{
    await homeScreenActions.navigateTo(
      await homeScreen.productCategoryEle("clothing")
    );
    await cartActions.clickOnProduct();
    await cartActions.clickOnAddToCartButton();
    await cartActions.clickOnGoToCart();
    await cartActions.clickOnPlaceOrderButton();

    expect(await cartScreen.getorderPlacedSuccessMsgText()).to.be.equal(
      "Thanks for Shopping in UL-Shopify"
    );
  });

  

});
