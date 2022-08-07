(function () {

    if (window.printerIconsLocated) {
        return;
    }
    window.printerIconsLocated = true;

    const tag = `printer-${Date.now()}`

    function appendPrinterButton() {
        let cargoCodes = document.getElementsByClassName('cargo-code-number');

        for (let n = 0; n < cargoCodes.length; n++) {

            const cargoCodeSpan = cargoCodes[n];

            if (!cargoCodeSpan.hasAttribute(tag)) {
                let printerImage = document.createElement("img");
                printerImage.setAttribute("src", 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAHYgAAB2IBOHqZ2wAAAQhQTFRFAAAA2QQr2QQr2QQr2QQr2QQr2QQr2QQr2QQr2QQr3C1K5oiV2x9A2QQr2QQr2QQr4U5n/Pz93TVS2QQr2QQryRIzvB07o2Jy3N3gpE1gzg4x2QQr0AsvQ0BLOz9JP0hUXmBLTENJ1Agt2QQr2QQrxg8vOT1HOj9JQkZHOj5HzQwu2QQrzw4yZGt51Qgu2QQr2QQr2QQr2QQr2QQrXWNxWmBuXmVz2QQr2QQr0A0yYGVxiY2VXmRw2QQr2QQrpjFNmT1Wq2198/P08fHy9fX2olptrCxJ2QQr2QQr2QQr9PT18vLz+Pj5476x5sa72QQr4beo5L+z2QQr2QQr2x5A4lZu2hY52QQr34y7eAAAAFh0Uk5TABF7utHPtXALd/L/7GKg/////4R4////////VPL//////+oKev///////1D///+S0rfQtv///4xv/////0js///////////eB1///////0L//2dR6v/fT6kXgFwAAACuSURBVHicVc/XDoJAEEDRsWF3FexdsSsi9oZiL9jr//+JywKJnKedm0yyA4CZzBarjbI7QON0uQmPV519yB8gaMQoczAUjkSJWDiewPvJVFqTyebyLBSKJV25Uq3VwdLg/jR5aBmDAG1j6ACFQ7dH9HEYwHDEceMJMcVBBMdsLi2WK2y9kba7PcABIf9Rlk/nC43QVfkqo4bbnUYP9Zjn6018rvq57JcXOgNxr7x/MPsjyOtmUOsAAAAASUVORK5CYII=');
                printerImage.style.height = "12px";
                printerImage.style.marginTop = "-3px";
                printerImage.className = "printer-image";

                let link = document.createElement('a');
                link.setAttribute('href', 'javascript:void(0)');
                link.onclick = function () {
                    print(cargoCodeSpan.textContent);
                };
                link.appendChild(printerImage);

                cargoCodeSpan.appendChild(link);

                cargoCodeSpan.setAttribute(tag, '');
            }
        }
    }

    function print(cargoCode) {
        browser.runtime.sendMessage({from: 'content', message: cargoCode});
    }

    const observer = new MutationObserver(appendPrinterButton);
    observer.observe(document.body, {subtree: true, childList: true, attributes: true});
})();