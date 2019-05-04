// ==UserScript==
// @name         OkCupid hide all matches button
// @namespace    https://www.okcupid.com/match
// @version      0.1
// @description  Adds a button to the OkCupid browse matches page which hides all matches on the page.
// @author       Aviem Zur
// @match        https://www.okcupid.com/match
// ==/UserScript==

(function() {
    'use strict';

    function okCupidHideAllMatchesBtn() {
        function clickBtn(btn) { btn.click(); }

        var btn = document.createElement("BUTTON")
        btn.innerText = "Hide All"
        btn.id = "randomBtn"
        btn.className = "blue flatbutton"

        btn.onclick = function() { 
            var hideButtons = document.evaluate('//button[@class="card-hide"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
            for (var i = 0; i < hideButtons.snapshotLength; i++) {
                var hideBtn = hideButtons.snapshotItem(i)
                clickBtn(hideBtn)
            }
        }

        var orderBySection = document.evaluate('//span[@class="order-by"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0)
        orderBySection.appendChild(btn)
    }

    if (window.addEventListener) {
        window.addEventListener('load', okCupidHideAllMatchesBtn)
    } else {
        window.attachEvent('onload', okCupidHideAllMatchesBtn)
    }
})();