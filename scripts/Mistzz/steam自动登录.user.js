// ==UserScript==
// @name         steam自动登录
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://steamcommunity.com/openid/login?*
// @grant        none
// ==/UserScript==

(function() {
    var y = document.getElementById("imageLogin");
    if(y){
        y.click();
    }
})();