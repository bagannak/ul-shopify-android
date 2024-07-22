/**
 * @group Sanity
 */

import { Browser } from 'webdriverio';
import { BaseScreen, Driver, HomeScreenActions,HomeScreen, ExploreScreen,ExploreScreenActions, 
  ProductScreen, ProductScreenActions, CartScreen, CartActions, ProfileScreen, ProfileActions,
TrackOrderScreen,TrackOrderScreenActions } from '../../../../uiExport';

import { expect } from 'chai';

/**
 * Home Page Validation
 */
let driver: Browser<'async'>;
let homeScreen: HomeScreen;
let homeScreenActions: HomeScreenActions;
let baseScreen: BaseScreen;
let exploreScreen: ExploreScreen;
let exploreScreenActions:ExploreScreenActions;
let productScreen: ProductScreen;
let productScreenActions: ProductScreenActions;
let cartScreen: CartScreen;
let cartActions: CartActions;
let profileScreen: ProfileScreen;
let profileActions: ProfileActions;
let trackOrderScreen: TrackOrderScreen;
let trackOrderScreenActions: TrackOrderScreenActions;
declare let reporter: any;

const specName = 'HomeScreen Validation';
describe(specName, () => {
  beforeAll(async () => {
    driver = await Driver.getDriver(specName);
    homeScreen = new HomeScreen(driver);
    baseScreen = new BaseScreen(driver);
    homeScreenActions = new HomeScreenActions(driver)
    exploreScreen = new ExploreScreen(driver);
    exploreScreenActions = new ExploreScreenActions(driver);
    productScreen = new ProductScreen(driver);
    productScreenActions = new ProductScreenActions(driver);
    cartScreen = new CartScreen(driver);
    cartActions = new CartActions(driver);
    profileScreen = new ProfileScreen(driver);
    profileActions = new ProfileActions(driver);
    trackOrderScreen = new TrackOrderScreen(driver);
    trackOrderScreenActions = new TrackOrderScreenActions(driver);
  });

  afterEach(async () => {
    await Driver.attachScreenshots(driver, reporter);
  });

  afterAll(async () => {
    await Driver.closeDriver(driver);
  });

  /**
 * it will verify login on both android and ios
 * pass os in env.properties file
 */
  
  it('Verify welcome message is displayed',async()=>{
    expect(await baseScreen.isDisplayed(
        await homeScreen.welcomeMsgEle()
    )).to.be.true;
  });
  it('Verify search bar is displayed',async ()=>{
    expect(await baseScreen.isDisplayed(
        await homeScreen.searchBtnEle()
    )).to.be.true;
  })

  it('Verify navigation to "Clothing" category', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('clothing'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.exploreMoreBackBtnEle());
  })

  it('Verify navigation to "Shoes" category', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('shoes'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.exploreMoreBackBtnEle());
  })
  it('Verify navigation to "Furniture" category', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('furniture'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.exploreMoreBackBtnEle());
  })

  it('Verify navigation to "Toys" category', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('toys'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.exploreMoreBackBtnEle());
  })

  it('Verify "New Arrivals" section is displayed', async ()=>{
    expect(await baseScreen.isDisplayed(
      await homeScreen.newArrivalsEle()
  )).to.be.true;
  });

  it('Verify clicking on an item in "New Arrivals" navigates to item details page',async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.itemInNewArrivalsSectionEle());
    expect(await baseScreen.isDisplayed(
      await productScreen.productTitleEle()
  )).to.be.true;
  await productScreenActions.navigateBack(await productScreen.backBtnEle())
  })

  it('Verify "Discover Fresh Items" text is displayed in "New Arrivals" section', async ()=>{
    expect(await baseScreen.getText(
      await homeScreen.newArrivalsDescriptionEle()))
      .to.be.equal('Discover Fresh Items');
  });
  it('Verify "Trending Products" section is displayed', async ()=>{
    expect(await baseScreen.isDisplayed(
      await homeScreen.trendingProductsEle()
  )).to.be.true;
  });

  it('Verify clicking on an item in "Trending Products" navigates to item details page',async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.itemInTrendingProductsSectionEle());
    expect(await baseScreen.isDisplayed(
      await productScreen.productTitleEle()
  )).to.be.true;
  await productScreenActions.navigateBack(await productScreen.backBtnEle())
  });

  it('Verify "Discover Fresh Items" text is displayed in "New Arrivals" section', async ()=>{
    expect(await baseScreen.getText(await homeScreen.trendingProductsDescriptionEle())).to.be.equal('High demand among users');
  });

  it('Verify "Cart" icon navigates to cart page', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.cartIconEle());
    expect(await baseScreen.isDisplayed(await cartScreen.emptyCartMessageEle())).to.be.true;
    await cartActions.continueShopping(await cartScreen.continueShoppingEle());
  });

  it('Verify "Explore" icon navigates to explore page', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.exploreIconEle());
    expect(await baseScreen.isDisplayed(await exploreScreen.searchInputBoxEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  });

  it('Verify "Profile" icon navigates to user profile page', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.profileIcon());
    expect(await profileScreen.isUserOnProfileScreen()).to.be.true;
    await profileActions.navigateBack(await profileScreen.backBtnEle());
  });
  it('Verify "Track" icon navigates to order tracking page', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.trackIconEle());
    expect(await baseScreen.isDisplayed(await trackOrderScreen.loginMsgEle())).to.be.true;
    await trackOrderScreenActions.navigateBack(await trackOrderScreen.backBtnEle());
  });

});
