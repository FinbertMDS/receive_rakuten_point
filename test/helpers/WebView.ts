export const CONTEXT_REF = {
    NATIVE: 'native',
    WEBVIEW: 'webview',
};
const DOCUMENT_READY_STATE = {
    COMPLETE: 'complete',
    INTERACTIVE: 'interactive',
    LOADING: 'loading',
};

class WebView {
    /**
     * Wait for the webview context to be loaded
     *
     * By default you have `NATIVE_APP` as the current context. If a webview is loaded it will be
     * added to the current contexts and will looks something like this
     * `["NATIVE_APP","WEBVIEW_28158.2"]`
     * The number behind `WEBVIEW` can be any string
     */
    waitForWebViewContextLoaded () {
        driver.waitUntil(
            // @ts-ignore
            () => {
                const currentContexts = this.getCurrentContexts();

                return currentContexts.length > 1 &&
                    currentContexts.find(context => context.toLowerCase().includes(CONTEXT_REF.WEBVIEW));
            }, {
                timeout: 10000,
                timeoutMsg: 'Webview context not loaded',
                interval: 100,
            },
        );
    }

    /**
     * Switch to native or webview context
     *
     * @param {string} context should be native of webview
     */
    switchToContext (context: string) {
        let currentContexts = this.getCurrentContexts();
        if (context === CONTEXT_REF.NATIVE) {
            driver.switchContext(currentContexts[0]);
        } else if (currentContexts.indexOf(context) > -1){
            driver.switchContext(context);
        } else {
            driver.switchContext(currentContexts[currentContexts.length - 1]);
        }
        // driver.switchContext(this.getCurrentContexts()[context === CONTEXT_REF.WEBVIEW ? (this.getCurrentContexts().length - 1) : 0]);
    }

    /**
     * Returns an object with the list of all available contexts
     *
     * @return {string[]} An object containing the list of all available contexts
     */
    getCurrentContexts (): string[] {
        return driver.getContexts();
    }

    /**
     * Wait for the document to be full loaded
     */
    waitForDocumentFullyLoaded () {
        driver.waitUntil(
            () => driver.execute(() => document.readyState) === DOCUMENT_READY_STATE.COMPLETE,
            {
                timeout: 15000,
                timeoutMsg: 'Website not loaded',
                interval: 100,
            },
        );
    }

    /**
     * Wait for the website in the webview to be loaded
     */
    waitForWebsiteLoaded () {
        this.waitForWebViewContextLoaded();
        this.switchToContext(CONTEXT_REF.WEBVIEW);
        this.waitForDocumentFullyLoaded();
        this.switchToContext(CONTEXT_REF.NATIVE);
    }
}

export default WebView;