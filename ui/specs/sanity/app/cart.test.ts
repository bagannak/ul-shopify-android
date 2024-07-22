/**
 * @group Sanity
 */
import { expect } from "chai";
import { Browser } from "webdriverio";
import {
  CartActions,
  CartScreen,
  Driver,
  LoginActions,
  HomeScreen,
  HomeScreenActions,
  BaseScreen,
  ExploreScreenActions,
  ExploreScreen,
} from "../../../../uiExport";

/**
 * Cart Page Validation
 */
let driver: Browser<"async">;
let baseScreen: BaseScreen;
let loginActions: LoginActions;
let cartActions: CartActions;
let cartScreen: CartScreen;
let homeScreen: HomeScreen;
let homeScreenActions: HomeScreenActions;

declare let reporter: any;
const specName = "Cart validation";
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
    loginActions.login({
      email: "ulshopify@ultralesson.com",
      password: "12345",
    });
  });

  afterEach(async () => {
    await Driver.attachScreenshots(driver, reporter);
  });

  afterAll(async () => {
    await Driver.closeDrivers([driver]);
  });

  it("Verify adding an item to the cart and removing item from the cart", async () => {
    await homeScreenActions.navigateTo(
      await homeScreen.productCategoryEle("clothing")
    );
    await cartActions.clickOnProduct();
    await cartActions.clickOnAddToCartButton();
    await cartActions.clickOnGoToCart();
    expect(await cartScreen.getProductInCartEleName()).to.equal(
      "Elegant Suite"
    );
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
  });

  it("Verify decreasing the quantity of an item", async () => {
    await cartActions.decreaseTheItemQuantity();
    expect(await cartScreen.getQuantityCount()).to.be.equal("1");
  });

  it("Verify that the cart is empty after removing items", async () => {
    await cartActions.deleteProductInCart();
    expect(await baseScreen.isDisplayed(await cartScreen.emptyCartMessageEle()))
      .to.be.true;
    await cartActions.clickOnContinueShoppingButton();
  });

  it("Verify that the item quantity cannot go below 1", async () => {
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
    for (let i = 0; i < maxQuantity; i++) {
      await cartActions.increaseTheItemQuantity();
    }

    expect(await cartScreen.getQuantityCount()).to.be.not.equal("6");
  });

  it("Verify the cart screen displays correct item details", async () => {
    expect(
      await baseScreen.isDisplayed(await cartScreen.productImageInCartEle())
    ).to.be.true;
    expect(
      await baseScreen.isDisplayed(await cartScreen.productNameInCartEle())
    ).to.be.true;
    expect(
      await baseScreen.isDisplayed(await cartScreen.productPriceInCartEle())
    ).to.be.true;
  });

  it('Verify that when the user clicks on "Place Order" button, the success message should be displayed', async () => {
    await cartActions.clickOnPlaceOrderButton();
    expect(await cartScreen.getorderPlacedSuccessMsgText()).to.be.equal(
      "Thanks for Shopping in UL-Shopify"
    );
    await cartActions.clickOnContinueShoppingButton();
  });

  it("Verify the total price calculation", async () => {
    await homeScreenActions.navigateTo(
      await homeScreen.productCategoryEle("clothing")
    );
    await cartActions.clickOnProduct();
    await cartActions.clickOnAddToCartButton();
    await cartActions.clickOnGoToCart();
    await cartActions.increaseTheItemQuantity();
    expect(await cartScreen.getTotalAmount()).to.be.equal("₹ 499.98");
    await cartActions.decreaseTheItemQuantity();
    expect(await cartScreen.getTotalAmount()).to.be.equal("₹ 249.99");
    await cartActions.deleteProductInCart();
    await cartActions.clickOnContinueShoppingButton();
  });

  it('Verify the functionality of "Continue Shopping" button', async () => {
    await homeScreenActions.navigateTo(await homeScreen.cartIconEle());
    await cartActions.clickOnContinueShoppingButton();
    expect(await baseScreen.isDisplayed(await homeScreen.homeIconEle())).to.be
      .true;
  });

  it("verifying items removing from the cart", async () => {
    await homeScreenActions.navigateTo(
      await homeScreen.productCategoryEle("clothing")
    );
    await cartActions.clickOnProduct();
    await cartActions.clickOnAddToCartButton();
    await cartActions.clickOnGoToCart();
    await cartActions.increaseTheItemQuantity();
    await cartActions.deleteProductInCart();
    expect(await baseScreen.isDisplayed(await cartScreen.emptyCartMessageEle()))
      .to.be.true;
    await cartActions.clickOnContinueShoppingButton();
  });

  it("Verify item details link navigates to product page", async () => {
    await homeScreenActions.navigateTo(
      await homeScreen.productCategoryEle("clothing")
    );
    await cartActions.clickOnProduct();
    await cartActions.clickOnAddToCartButton();
    await cartActions.clickOnGoToCart();
    await cartActions.clickOnProductInCart();
    expect(await baseScreen.isDisplayed(await cartScreen.productPageEle())).to
      .be.true;
  });
});
