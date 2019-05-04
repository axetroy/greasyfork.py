// ==UserScript==
// @name         March of History - List SearchBox
// @version      0.5
// @description  this script allow you to use a searchbox on family and prestigious title list
// @author       Gohan89
// @match        http://www.marchofhistory.com/*
// @require      https://greasyfork.org/scripts/10393-search-liste-engine/code/Search%20Liste%20engine.js?version=56659
// @grant        none
// @namespace https://greasyfork.org/users/12186
// ==/UserScript==

$(document).on("change keyup paste", ".searchbox > input", function(){
    var name=$(this).val();
    var alllist = $(".listeStrategie").children();
    var list;
    list = $(alllist).find(":contains('"+$(this).val()+"')").parents(".action");
    $(alllist).show();
    if($(this).val()!="") $(alllist).not($(list)).hide();
});