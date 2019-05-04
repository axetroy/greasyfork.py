// ==UserScript==
// @name         Robux PIN Finder
// @namespace    chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/options.html#nav=dashboard
// @version      1.3.4 BETA (licensed)
// @description  Go to buy 400 robux, click "redeem roblox card",click continue and watch as the system starts to decode unused robux PINS :) [Obtain Free unused Robux PINS] WATCH THIS FOR PROOF! https://youtu.be/UeJ4hFc-8Hw
// @author       TayDaGoat
// @match        https://web.roblox.com/upgrades/redeem?ap=42&pm=redeemCard&selectedUpsellProductId=0
// @grant        none
// @license      Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
// ==/UserScript==

(function() {
    'use strict';

    alert("Click the button to start the PIN Finder. Thank you for using and subscribe on yt @TayDaGoat!");
var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function main() {
var key = ((nums[Math.floor(Math.random() * nums.length)].toString()) + (Math.floor((Math.random() * 10)).toString()) + (Math.floor((Math.random() * 10)).toString()));
var key2 = ((Math.floor((Math.random() * 10)).toString()) + (Math.floor((Math.random() * 10)).toString()) + (Math.floor((Math.random() * 10)).toString()));
var key3 = ((Math.floor((Math.random() * 10)).toString()) + (Math.floor((Math.random() * 10)).toString()) + (Math.floor((Math.random() * 10)).toString()) + (Math.floor((Math.random() * 10)).toString()));
var code = (key + " " + key2 + " " + key3);
document.getElementById("pin").value = code;
Roblox.GameCard.redeemCode(true)
}
setInterval(function() {
main();
}, 2);
})();