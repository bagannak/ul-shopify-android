import { Browser,Element } from "webdriverio";
import { BaseScreen} from '../../../uiExport';
export class ExploreScreenActions extends BaseScreen {
  constructor(driver: Browser<"async">) {
    super(driver);
    
  }
  async navigateBack(element: Element<"async">) {
    await this.click(element);
  }
}
