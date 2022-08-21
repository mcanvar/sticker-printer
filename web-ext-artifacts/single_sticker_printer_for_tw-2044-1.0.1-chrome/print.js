(function () {
    setTimeout(function () {
        // document.getElementsByTagName('button')[0].click();
    }, 500);

    window.addEventListener("afterprint", (event) => {
        setTimeout(function () {
            window.close();
        }, 1500);
    });
})();