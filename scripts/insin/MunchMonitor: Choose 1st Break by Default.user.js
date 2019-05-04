// ==UserScript==
// @name        MunchMonitor: Choose 1st Break by Default
// @description Choose the 1st Break tab by default when making tuckshop/canteen orders
// @namespace   https://github.com/insin/greasemonkey/
// @include     https://www.munchmonitor.com/Canteen/OrderDetail/*
// @grant       none
// @version     1
// ==/UserScript==
document.querySelector('#mp1 > a:nth-child(1)').click()