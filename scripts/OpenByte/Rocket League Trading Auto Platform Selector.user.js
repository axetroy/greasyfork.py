// ==UserScript==
// @name        		Rocket League Trading Auto Platform Selector
// @namespace   		openbyte/rltaps
// @description 		Automatically selects your Platform on rocket-league.com
// @author          OpenByte
// @icon            https://image.ibb.co/g9caQm/rocket_league_garage_footer.png
// @require         https://greasyfork.org/scripts/34555-greasemonkey-4-polyfills/code/Greasemonkey%204%20Polyfills.js?version=227108
// @require         https://greasyfork.org/scripts/28366-userscript-config-page-api/code/Userscript%20Config%20Page%20API.js?version=227297
// @include     		http*://rocket-league.com/*
// @include     		http*://*.rocket-league.com/*
// @include     		http*://greasyfork.org/*/scripts/28698-rocket-league-trading-auto-platform-selector*
// @include     		http*://*.greasyfork.org/*/scripts/28698-rocket-league-trading-auto-platform-selector*
// @version     		1.3.0
// @noframes
// @run-at      		document-idle
// @grant       		GM_setValue
// @grant       		GM_getValue
// @grant       		GM.setValue
// @grant       		GM.getValue
// ==/UserScript==



(async () => {

    const opts = [{
            label: "Steam",
            value: "Steam"
        }, {
            label: "PlayStation 4",
            value: "PlayStation 4"
        }, {
            label: "Xbox One",
            value: "Xbox One"
        }
    ];

    await CONFIG.GREASYFORK.init(28698, [await CONFIG.generateSelectOption("_platform", "Platform: ", "Steam", 1, opts)]);

    const p = await CONFIG.getValue("_platform");

    if (!CONFIG.isConfigPage) {
        let c = document.getElementById("platform_chosen") || document.getElementById("filterPlatform_chosen");
        if (c) {
            triggerMouseEvent(c, "mousedown");
            let o = c.querySelectorAll(".active-result[data-option-array-index]");
            if (o.length) {
                for (let e of o)
                    if (e.innerText.trim().toLowerCase() === p.toLowerCase()) {
                        o = e;
                        break;
                    }
            }
            if (o)
                triggerMouseEvent(o, "mouseup");
        }
    }

    function triggerMouseEvent(node, eventType) {
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        node.dispatchEvent(clickEvent);
    }

})();