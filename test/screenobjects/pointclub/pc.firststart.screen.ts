import config from '../../../config';
import { getByResouceId } from '../../helpers/UiSelectorHelper';
import AppScreen from '../AppScreen';

const SELECTORS = {
    FIRSTSTSRT_SCREEN: getByResouceId("android:id/content"),
    WARNING_LABEL: getByResouceId("jp.co.rakuten.pointclub.android:id/text_root_title"),
    NEVER_DISPLAY_CHECKBOX: getByResouceId("jp.co.rakuten.pointclub.android:id/checkbox_root_detection_popup_never_ask_again"),
    CLOSE_LABEL: getByResouceId("jp.co.rakuten.pointclub.android:id/text_close_dialog"),
};

class PC_FirstStartScreen extends AppScreen {
    constructor () {
        super(SELECTORS.FIRSTSTSRT_SCREEN);
    }

    async waitForWarningLablelIsShown () {
        return $(SELECTORS.WARNING_LABEL).waitForDisplayed({
            timeout: config.DEFAULT_TIMEOUT,
            reverse: false,
        });
    }

    get warningLabel () {
        return $(SELECTORS.WARNING_LABEL);
    }

    get neverDisplayCheckbox () {
        return $(SELECTORS.NEVER_DISPLAY_CHECKBOX);
    }

    get closeLabel () {
        return $(SELECTORS.CLOSE_LABEL);
    }
}

export default new PC_FirstStartScreen();
