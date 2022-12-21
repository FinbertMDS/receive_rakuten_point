import config from '../../../config';
import { getByClassname, getByResouceId, getByText } from '../../helpers/UiSelectorHelper';
import AppScreen from '../AppScreen';

const SELECTORS = {
    REWARD_SCREEN: getByResouceId("jp.co.rakuten.pointclub.android:id/rakutenreward_toobar"),
    CLOSE_BUTTON: getByResouceId("jp.co.rakuten.pointclub.android:id/rakutenreward_portalclose"),
    REQUIRE_LOGIN_LABEL: getByText("[Rakuten]Login"),
    LOGIN_INPUT: getByResouceId("username"),
    LOGIN_PASSWORD: getByResouceId("password"),
    LOGIN_BUTTON: getByText("Login"),
    NEED_ONE_MORE_TIME_LOGIN_BUTTON: getByResouceId("signin-tile"),
    SUGGEST_PRODUCT_LABEL: getByText("おすすめ商品とおトク情報"),
    UNCLAIM_BOX: getByResouceId("jp.co.rakuten.pointclub.android:id/rakutenreward_unclaimsheet"),
    UNCLAIM_LIST: getByResouceId("jp.co.rakuten.pointclub.android:id/rakutenreward_unclaimlist"),
    UNCLAIM_LIST_ITEMS: getByClassname("android.view.ViewGroup"),
    RETRY_LABEL: getByText("再試行"),
    GET_POINT_DONE_LABEL: getByResouceId("jp.co.rakuten.pointclub.android:id/rakutenreward_claim_title"),
    UNCLAIM_ERROR_MESSAGE_LABEL: getByResouceId("jp.co.rakuten.pointclub.android:id/rakutenreward_error_message"),
};

class PC_RewardScreen extends AppScreen {
    constructor () {
        super(SELECTORS.REWARD_SCREEN);
    }

    get suggestProductLabel () {
        return $(SELECTORS.SUGGEST_PRODUCT_LABEL);
    }

    get retryLabel () {
        return $(SELECTORS.RETRY_LABEL);
    }

    get unclaimBox () {
        return $(SELECTORS.UNCLAIM_BOX);
    }

    async waitForUnclaimBoxIsShown () {
        return $(SELECTORS.UNCLAIM_BOX).waitForDisplayed({
            timeout: config.DEFAULT_TIMEOUT,
            reverse: false,
        });
    }

    async waitForSuggestProductIsShown () {
        return this.waitForElementIsShown(SELECTORS.SUGGEST_PRODUCT_LABEL);
        // return $(SELECTORS.SUGGEST_PRODUCT_LABEL).waitForDisplayed({
        //     timeout: 2 * config.DEFAULT_TIMEOUT,
        //     reverse: false,
        // });
    }

    async waitForUnclaimListIsShown () {
        return this.waitForElementIsShown(SELECTORS.UNCLAIM_LIST);
    }

    get unclaimList () {
        return $(SELECTORS.UNCLAIM_LIST);
    }

    async waitForUnclaimListItemsIsShown () {
        if (await this.unclaimList.isExisting()) {
            return this.unclaimList.$(SELECTORS.UNCLAIM_LIST_ITEMS).waitForDisplayed({
                timeout: config.DEFAULT_TIMEOUT,
                reverse: false,
            });
        }
    }

    async getUnclaimListItems () {
        if (await this.unclaimList.isExisting()) {
            return this.unclaimList.$$(SELECTORS.UNCLAIM_LIST_ITEMS);
        }
        return null;
    }

    async getUnclaimListIndexButton (index: number) {
        let unclaimListItems = await this.getUnclaimListItems();
        if (unclaimListItems === null) {
            return null;
        }
        if (unclaimListItems.length > index) {
            return unclaimListItems[index].$(getByResouceId("jp.co.rakuten.pointclub.android:id/rakutenreward_claimbutton"));
        }
    }

    async getButtonCountInHeader () {
        let parent = $(SELECTORS.REWARD_SCREEN);
        return parent.$$(getByClassname("android.widget.ImageButton")).length;
    }

    async waitForGetPointDoneLabelIsShown () {
        // return this.waitForElementIsShown(SELECTORS.GET_POINT_DONE_LABEL);
        return $(SELECTORS.GET_POINT_DONE_LABEL).waitForDisplayed({
            timeout: 2 * config.DEFAULT_TIMEOUT,
            reverse: false,
        });
    }

    get getPointDoneLabel () {
        return $(SELECTORS.GET_POINT_DONE_LABEL);
    }

    get unclaimErrorMessageLabel () {
        return $(SELECTORS.UNCLAIM_ERROR_MESSAGE_LABEL);
    }

    get closeButton () {
        return $(SELECTORS.CLOSE_BUTTON);
    }

    async backButton () {
        let parent = (await $(SELECTORS.REWARD_SCREEN).parent);
        return parent.$(getByClassname("android.widget.ImageButton", 0));
    }

    async needLoginButton () {
        let signInTitle = $(SELECTORS.NEED_ONE_MORE_TIME_LOGIN_BUTTON);
        if (await signInTitle.isDisplayed()) {
            console.log("need sign in again");
            return signInTitle.$(getByClassname("android.widget.Button"));
        }
        return null;
    }

    get requireLoginLabel () {
        return $(SELECTORS.REQUIRE_LOGIN_LABEL);
    }

    get loginButton () {
        return $(SELECTORS.LOGIN_BUTTON);
    }

    get userid () {
        return $(SELECTORS.LOGIN_INPUT);
    }

    get password () {
        return $(SELECTORS.LOGIN_PASSWORD);
    }

    async waitForLoggedIn () {
        return $(SELECTORS.LOGIN_INPUT).waitForDisplayed({
            timeout: 15 * config.DEFAULT_TIMEOUT,
            reverse: true,
        });
    }
}

export default new PC_RewardScreen();
