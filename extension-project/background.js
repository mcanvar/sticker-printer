browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from == "content"){
        browser.windows.create({
            url: 'https://mcanvar.github.io/sticker-printer/page-project/dist/index.html?cargoCode=' + message.message,
            type: 'popup'
        }, function(win) {});
    }
});