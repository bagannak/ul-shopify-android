/**
 * @group Sanity
 */

import { Browser } from 'webdriverio';
import { BaseScreen, Driver, HomeScreenActions,HomeScreen, ExploreScreen,ExploreScreenActions, ProductScreen, ProductScreenActions } from '../../../../uiExport';

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
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  })

  it('Verify navigation to "Shoes" category', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('shoes'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  })
  it('Verify navigation to "Furniture" category', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('furniture'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  })

  it('Verify navigation to "Toys" category', async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('toys'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  })



  it.skip('Verify navigation to "Audio sets" category', async ()=>{
    // await homeScreenActions.scrollProductCategory()
    // await homeScreenActions.scrollForward()
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('audio sets'));
    expect(await baseScreen.isDisplayed(await exploreScreen.productCardEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
  })

  it('Verify navigation to "Books" category', async ()=>{
    // await homeScreenActions.scrollProductCategory()
    await homeScreenActions.navigateTo(await homeScreen.productCategoryEle('books'));
    expect(await baseScreen.isDisplayed(await exploreScreen.noProductsFoundMsgEle())).to.be.true;
    await exploreScreenActions.navigateBack(await exploreScreen.backBtnEle());
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
    expect(await baseScreen.getText(await homeScreen.newArrivalsDescriptionEle())).to.be.equal('Discover Fresh Items');
  });
  it.only('Verify "Trending Products" section is displayed', async ()=>{
    expect(await baseScreen.isDisplayed(
      await homeScreen.trendingProductsEle()
  )).to.be.true;
  });

  it.only('Verify clicking on an item in "Trending Products" navigates to item details page',async ()=>{
    await homeScreenActions.navigateTo(await homeScreen.itemInTrendingProductsSectionEle());
    expect(await baseScreen.isDisplayed(
      await productScreen.productTitleEle()
  )).to.be.true;
  await productScreenActions.navigateBack(await productScreen.backBtnEle())
  })

  it.only('Verify "Discover Fresh Items" text is displayed in "New Arrivals" section', async ()=>{
    expect(await baseScreen.getText(await homeScreen.trendingProductsDescriptionEle())).to.be.equal('High demand among users');
  });
});
