// ==UserScript==
// @name        AdHelper
// @namespace   AdHelper
// @description AdHelper clicks on advertisements automatically in the background so you can support reddit
// @include     *reddit.com*
// @version     3
// @grant       GM_xmlhttpRequest
// ==/UserScript==

window.onload = function () {
    var spLinks = document.querySelectorAll(".promoted a.title");
    for (i = 0; i < spLinks.length; i++)
    {
        spLinks[i] && spLinks[i].href && GM_xmlhttpRequest({method: "GET", url: spLinks[i].href});
    }
};