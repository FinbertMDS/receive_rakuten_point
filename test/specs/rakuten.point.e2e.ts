import config from '../../config';
import campaignPage from '../pageobjects/campaign.page';
import kujiPage from '../pageobjects/kuji.page';
import loginPage from '../pageobjects/login.page';
import rakutencardPage from '../pageobjects/rakutencard.page';
import websearchPage from '../pageobjects/websearch.page';

describe('Rakuten', () => {
    beforeEach(async function () {
        const windows = await browser.getWindowHandles();
        await browser.switchToWindow(windows[0]);
    })

    async function credentials() {
        await loginPage.open();
        await loginPage.login(config.RAKUTEN_USERNAME, config.RAKUTEN_PASSWORD);

        // await credentialsForWebSearch();

        await rakutencardPage.open();
        await browser.pause(5000);
        if (await rakutencardPage.isNeedLogin()) {
            await rakutencardPage.loginV2(config.RAKUTEN_USERNAME, config.RAKUTEN_PASSWORD)
        }
    }

    async function credentialsForWebSearch() {
        await websearchPage.open();
        await browser.pause(config.DEFAULT_TIMEOUT);
        if (await websearchPage.isNeedLogin()) {
            await websearchPage.loginV2(config.RAKUTEN_USERNAME, config.RAKUTEN_PASSWORD);
        }
    }

    // it('rakuten_search_get_point', async () => {
    //     await credentials();
    //     await credentialsForWebSearch();
    //     await websearchPage.open();
    //     await websearchPage.search();
    //     await browser.pause(2000)
    // });

    it('rakuten_click_link_get_point', async () => {
        await credentials();
        await rakutencardPage.open();
        await browser.pause(5000);
        let labelclickPointCountTxt = await rakutencardPage.getLableClickPointCountTxt();
        await rakutencardPage.handleClickPointCountLink();
        console.log("labelclickPointCountTxt: ", labelclickPointCountTxt);
        for (let index = labelclickPointCountTxt - 1; index >= 0; index--) {
            // let clickPointListCount = await rakutencardPage.getClickPointListCount();
            // console.log("getClickPointListCount: ", clickPointListCount);
            let canClickNew = await rakutencardPage.canClickPointNewIndex(index);
            console.log("canClickNew--- " + index + ": ", canClickNew);
            if (canClickNew) {
                const currentWindows = await browser.getWindowHandle();
                await rakutencardPage.handleClickPointNewIndex(index);
                await browser.pause(2000);
                await browser.switchToWindow(currentWindows);
            }
        }

        await rakutencardPage.handleClickShoppingLink();
        let canClickShoppingReceivePoint = await rakutencardPage.canClickShoppingReceivePointFromBtn();
        console.log("canClickShoppingReceivePoint: ", canClickShoppingReceivePoint);
        if (canClickShoppingReceivePoint) {
            await rakutencardPage.handleClickShoppingReceivePoint();
            await browser.pause(5000);
        }
        await browser.pause(2000)
    });

    it('rakuten_kuji_default_get_point', async () => {
        await credentials();
        for (let index = 0; index < config.KUJI_DEFAULT_LINK.length; index++) {
            await kujiPage.open(config.KUJI_DEFAULT_LINK[index]);
            await kujiPage.handleProcessAfterClickKuji(index, true);
        }
        await browser.pause(2000)
    });

    it('rakuten_kuji_get_point', async () => {
        await credentials();
        await kujiPage.open();
        let kujiCount = await kujiPage.getKujiCount()
        if (kujiCount > 0) {
            for (let index = 0; index < kujiCount; index++) {
                await kujiPage.open();
                let clickedKuji = await kujiPage.handleClickKujiElementIndex(index);
                if (clickedKuji) {
                    await kujiPage.handleProcessAfterClickKuji(index, false);
                }
            }
        }
        await browser.pause(2000)
    });

    // it('rakuten_view_video_get_point_one_day_monthly', async () => {
    //     let currentDate = new Date().getDate();
    //     if (currentDate !== config.DAY_VIEW_VIDEO_GET_POINT) {
    //         console.log(`only view video in day ${config.DAY_VIEW_VIDEO_GET_POINT}`);
    //         return;
    //     }
    //     await credentials();
    //     await rakutencardPage.open();
    //     if (await rakutencardPage.isNeedLogin()) {
    //         await rakutencardPage.login(config.RAKUTEN_USERNAME, config.RAKUTEN_PASSWORD)
    //         await rakutencardPage.open()
    //     }
    //     await rakutencardPage.handleClickPointCountLink();

    //     await rakutencardPage.handlClickVideo();
    // });

    it('rakuten_entry_campaign', async () => {
        await credentials();
        await campaignPage.entryCampaign();
    });

    it('rakuten_websearch_entry_get_point', async () => {
        await credentials();
        await credentialsForWebSearch();
        await websearchPage.entryCampaign();
        await browser.pause(2000)
    });
});


