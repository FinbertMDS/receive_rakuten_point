import config from '../../../config';
import { getByResouceId } from '../../helpers/UiSelectorHelper';
import AppScreen from '../AppScreen';

const SELECTORS = {
    LOGIN_SCREEN: getByResouceId("omni-container"),
    INPUT: getByResouceId("user_id"),
    PASSWORD: getByResouceId("password_current"),
    NEXT_BUTTON: getByResouceId("cta"),
    LOGIN_WITH_OTHER_BUTTON: getByResouceId("terz_182"),
};

class T_LoginScreen extends AppScreen {
    constructor () {
        super(SELECTORS.LOGIN_SCREEN);
    }

    get nextButton () {
        return $(SELECTORS.NEXT_BUTTON);
    }

    get loginWithOtherButton () {
        return $(SELECTORS.LOGIN_WITH_OTHER_BUTTON);
    }

    get userid () {
        return $(SELECTORS.INPUT);
    }

    get password () {
        return $(SELECTORS.PASSWORD);
    }

    get loginScreen () {
        return $(SELECTORS.LOGIN_SCREEN);
    }

    async waitForEnterLoginScreen () {
        return $(SELECTORS.LOGIN_SCREEN).waitForDisplayed({
            timeout: 3 * config.DEFAULT_TIMEOUT,
            reverse: false,
        });
    }

    async waitForLoggedIn () {
        return $(SELECTORS.LOGIN_SCREEN).waitForDisplayed({
            timeout: 15 * config.DEFAULT_TIMEOUT,
            reverse: true,
        });
    }
}

export default new T_LoginScreen();