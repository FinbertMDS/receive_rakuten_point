import { getByResouceId } from '../../helpers/UiSelectorHelper';
import AppScreen from '../app.screen';

const SELECTORS = {
    DEFAULT_SELECTOR: getByResouceId("jp.co.rakuten.rakutenluckykuji:id/setting"),
    MESSAGE_THUMBNAIL: "~サムネイル",
};

class K_MessageBoxScreen extends AppScreen {
    constructor () {
        super(SELECTORS.DEFAULT_SELECTOR);
    }

    get messageThumbnailList () {
        return $$(SELECTORS.MESSAGE_THUMBNAIL);
    }

    waitForMessageIsShown () {
        return this.waitForElementIsShown(SELECTORS.MESSAGE_THUMBNAIL);
    }

}

export default new K_MessageBoxScreen();