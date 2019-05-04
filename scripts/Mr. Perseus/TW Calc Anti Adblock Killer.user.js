// ==UserScript==
// @name        TW Calc Anti Adblock Killer
// @author      Mr. Perseus
// @namespace   tw-perseus
// @description Disables the Anti Adblocker on tw-calc.net
// @include     /http[s]{0,1}://tw-calc.net/*
// @version     0.0.2
// @grant       none
// ==/UserScript==

/*globals $*/
(function (fn) {
    const script = document.createElement("script");
    script.setAttribute("type", "application/javascript");
    script.textContent = `(${fn})();`;
    document.body.appendChild(script);
    document.body.removeChild(script);
}(() => {
    $(document).ready(() => {
        try {
            let counter = 0;
            const gallery = document.getElementsByClassName("galleryOverlay");
            const popup = document.getElementsByClassName("popUpOverlay");
            const cookie = document.getElementsByClassName("cookie");

            const galleryDone = false;
            const popupDone = false;
            const cookieDone = false;

            const removeOverlay = function (dom, done) {
                while (dom.length > 0) {
                    dom[0].parentNode.removeChild(dom[0]);
                    done = true;
                }

                if (document.getElementsByTagName("html")[0].style["overflow-y"] !== "scroll") {
                    document.getElementsByTagName("html")[0].style = "overflow-y:scroll;";
                }

                if (!done && counter < 15) {
                    setTimeout(() => removeOverlay(dom, done), 1000);
                }
            };

            removeOverlay(gallery, galleryDone);
            removeOverlay(popup, popupDone);
            removeOverlay(cookie, cookieDone);
        } catch (err) {
            console.log(err.stack);
        }
    });
}));