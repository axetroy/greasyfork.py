// ==UserScript==
// @name         Steam Market Auto-Agree
// @author       http://steamcommunity.com/id/marshall73401
// @version      0.1
// @description  Auto-check the I AGREE checkbox in the Steam Marketplace
// @include        http://steamcommunity.com/market/*
// @include        https://steamcommunity.com/market/*
// @namespace    https://greasyfork.org/users/9274
// ==/UserScript==

document.getElementById("market_buyorder_dialog_accept_ssa").checked=true;