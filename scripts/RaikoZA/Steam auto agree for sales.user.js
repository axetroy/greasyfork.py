// ==UserScript==
// @name         Steam auto agree for sales
// @version      0.1
// @namespace    https://greasyfork.org/users/90009
// @description  Automatically checks the agree to SSA agreement when selling an item on Steam
// @author       SynTax
// @match        http://steamcommunity.com/id/*
// @include      https://steamcommunity.com/id/*
// @grant        none
// ==/UserScript==

try{
    var agree = document.getElementById("market_sell_dialog_accept_ssa");
    agree.checked = true;
}catch(e){
    console.log(e);
}