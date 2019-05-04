// ==UserScript==
// @name         Change stinger in air battles
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.erepublik.com/en
// @grant        none
// ==/UserScript==

var $ = jQuery;

(function() {
    var weaponLink = $("li.q10 img").attr("src");
    if (weaponLink != "/images/icons/industry/2/q10.png")
    {
        $(".weapon_link")[0].click();
    }
})();