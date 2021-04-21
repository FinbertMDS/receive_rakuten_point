import config from '../../config';
import Gestures from '../helpers/Gestures';
import rFirststartScreen from '../screenobjects/recipe/r.firststart.screen';
import rHomeSettingScreen from '../screenobjects/recipe/r.home.setting.screen';
import rLoginScreen from '../screenobjects/recipe/r.login.screen';
import rMypageScreen from '../screenobjects/recipe/r.mypage.screen';
import rRewardScreen from '../screenobjects/recipe/r.reward.screen';
import rTabBar from '../screenobjects/recipe/r.tab.bar';
import sHomeModalScreen from '../screenobjects/superpointscreen/s.home.modal.screen';

describe('rakuten_recipe', () => {
    beforeAll(() => {
        driver.activateApp(config.RAKUTEN_RECIPE_APP_ID);
        driver.pause(5000);
    })

    function handleFirstTimeEnterApp (completeServey: boolean = false) {
        rFirststartScreen.waitForStartLablelIsShown();
        if (!rFirststartScreen.startLabel.isDisplayed()) {
            return;
        }
        rFirststartScreen.startLabel.click();
        rHomeSettingScreen.waitForIsShown();
        if (rHomeSettingScreen.scrollView.isDisplayed()) {
            if (completeServey) {
                rHomeSettingScreen.choice1Option1.click();
                Gestures.swipeUp();
                rHomeSettingScreen.choice2Option1.click();
                rHomeSettingScreen.choice3Option1.click();
                
                console.log("click ok button");
                
                rHomeSettingScreen.serveyOkButton.click();
                rHomeSettingScreen.waitForRecommendedIsShown();
                rHomeSettingScreen.serveyOkButton.click();
                rHomeSettingScreen.waitForRecommendedIsShown();
                rHomeSettingScreen.serveyOkButton.click();
                rHomeSettingScreen.waitForCompletionMessagesShown();
                rHomeSettingScreen.serveyCompletionButton.click();

            } else {
                console.log("click cancel button");
                rHomeSettingScreen.serveyCancelButton.click();
            }
        }
        driver.pause(10000);
    }

    function handleOpenTabMyPageAndLogin () {
        rTabBar.waitForTabBarShown();
        rTabBar.openMyPage();

        driver.pause(2000);
        if (rMypageScreen.loginButton.isDisplayed()) {
            rMypageScreen.loginButton.click();

            handleFirstTimeLogin();
        }
    }

    function handleFirstTimeLogin () {
        rLoginScreen.waitForIsShown();
        rLoginScreen.userid.setValue(config.RAKUTEN_USERNAME);
        rLoginScreen.password.setValue(config.RAKUTEN_PASSWORD);
        rLoginScreen.loginButton.click();
        rLoginScreen.waitForLoggedIn();
        console.log("logged in");
    }

    function handleCloseModal () {
        driver.pause(3000);
        if (sHomeModalScreen.modalContainer.isDisplayed()) {
            sHomeModalScreen.modalNotShowButton.click();
            sHomeModalScreen.closeButton.click();
            driver.pause(3000);
        }
    }

    function openRewardScreen () {
        Gestures.swipeUp(0.7);
        rMypageScreen.rewardButton.click();

        rRewardScreen.waitForIsShown();
        rRewardScreen.waitForSuggestProductIsShown();
        let retryLableIsShown = rRewardScreen.retryLabel.isDisplayed();
        while (retryLableIsShown) {
            rRewardScreen.retryLabel.click();
            driver.pause(parseInt(String(config.DEFAULT_TIMEOUT / 2)));
            retryLableIsShown = rRewardScreen.retryLabel.isDisplayed();
        }
        rRewardScreen.waitForSuggestProductIsShown();
        let needLoginMoreTimeButton = rRewardScreen.needLoginButton;
        if (needLoginMoreTimeButton.isDisplayed()) {
            rRewardScreen.closeButton.click();
            return false
        }
        return true;
    }
    
    function clickUnclaimButton () {
        driver.pause(parseInt(String(config.DEFAULT_TIMEOUT / 3)));
        let unclaimBox = rRewardScreen.unclaimBox;
        if (unclaimBox.isDisplayed()) {
            unclaimBox.click();

            rRewardScreen.waitForUnclaimListIsShown();
            rRewardScreen.waitForUnclaimListItemsIsShown();
            let unclaimListCount = rRewardScreen.getUnclaimListItems?.length
            console.log("unclaimListCount: ", unclaimListCount);
            
            if (unclaimListCount) {
                for (let index = 0; index < unclaimListCount; index++) {
                    if (index !== 0) {
                        rRewardScreen.waitForUnclaimBoxIsShown();
                        unclaimBox.click();
                        rRewardScreen.waitForUnclaimListIsShown();
                        rRewardScreen.waitForUnclaimListItemsIsShown();
                    }
                    let unclaimListIndexButton = rRewardScreen.getUnclaimListIndexButton(0);
                    if (unclaimListIndexButton) {
                        console.log("unclaimText: ", rRewardScreen.getUnclaimListIndexButton(index)?.getText());
                        unclaimListIndexButton.click();
                        
                        let loginAgain = handleLoginRequireAgain();
                        if (loginAgain) {
                            return true;
                        }
                        rRewardScreen.waitForGetPointDoneLabelIsShown();
                        console.log("getPointDoneLabel: ", rRewardScreen.getPointDoneLabel.getText());

                        rRewardScreen.backButton.click();
                    }
                }                
            }
        }
        rRewardScreen.closeButton.click();
        return false;
    }

    function handleLoginRequireAgain () {
        driver.pause(5000);
        if (!rRewardScreen.requireLoginLabel.isDisplayed()) {
            return false;
        }
        Gestures.swipeUp(0.7);
        rRewardScreen.userid.setValue(config.RAKUTEN_USERNAME);
        rRewardScreen.password.setValue(config.RAKUTEN_PASSWORD);
        rRewardScreen.loginButton.click();
        rRewardScreen.waitForLoggedIn();
        console.log("logged in one again");
        return true;
    }

    it('r_first_login', () => {
        driver.pause(7000);
        
        handleFirstTimeEnterApp();
        handleOpenTabMyPageAndLogin();
        handleCloseModal();
        let loggedIn = openRewardScreen();
        while (!loggedIn) {
            loggedIn = openRewardScreen();
        }
        let requireLoginAgain = clickUnclaimButton();
        if (requireLoginAgain) {
            requireLoginAgain = clickUnclaimButton();
        }
    });

});

