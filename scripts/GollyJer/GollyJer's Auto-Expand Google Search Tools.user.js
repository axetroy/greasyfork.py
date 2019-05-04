// ==UserScript==
// @name        GollyJer's Auto-Expand Google Search Tools
// @description Show the "search tools"" menu on Google search results instead of result-count and query-speed.
// @namespace   gollyjer.com
// @version     1.2
// @include     /^https?\:\/\/(www|news|maps|docs|cse|encrypted)\.google\./
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require     https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @grant       GM_addStyle
// ==/UserScript==

// Hide the Search Tools button.
GM_addStyle("#hdtb-tls { display: none !important; }");

// Speed up visibility of the Seach Tools menu by removing the animation.
GM_addStyle("#hdtbMenus { transition: none !important; }");

// Show the Search Tools menu.
waitForKeyElements ("#hdtb-tls", clickNodeUntilItSticks);

function clickNodeUntilItSticks (jNode) {
    var searchToolbar = $("#hdtbMenus")[0];
    var sanityCount = 1;
    var menusVisiblePoller = setInterval ( function () {
            if (sanityCount < 20  &&  searchToolbar.offsetWidth === 0  &&  searchToolbar.offsetHeight === 0) {
                jNode[0].click()
            } else {
                clearInterval (menusVisiblePoller);
            }
        },
        88
    );
}