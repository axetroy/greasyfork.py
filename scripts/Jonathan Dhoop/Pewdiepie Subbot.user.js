// ==UserScript==
// @name         Pewdiepie Subbot
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/user/PewDiePie
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let button = document.getElementsByClassName("ytd-subscribe-button-renderer")[0];
    let property = "subscribed";
    if(button.hasAttribute(property)){}
else
{
    button.click();
}
})();