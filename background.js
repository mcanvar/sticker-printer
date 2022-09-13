browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from == "content"){

        const URL = browser.runtime.getURL("pages/dist/index.html")

        browser.windows.create({
            url: URL + '?cargoCode=' + message.message.code + '&marketplace=' + message.message.marketplace,
            type: 'popup'
        }, function(win) {});
    }
});