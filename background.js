browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from == "content"){

        const URL = browser.runtime.getURL("pages/dist/index.html")

        console.log(URL);

        browser.windows.create({
            url: URL + '?cargoCode=' + message.message,
            type: 'popup'
        }, function(win) {});
    }
});