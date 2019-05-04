// ==UserScript==
// @name         Joe Ellis helper
// @version      0.1
// @description  Marks "Neutral" and "No" for all
// @author       Tjololo
// @match        https://www.mturkcontent.com/dynamic/hit*
// @require      http://code.jquery.com/jquery-latest.min.js
// @grant        none
// @namespace https://greasyfork.org/users/710
// ==/UserScript==

$("input").each(function() {
    console.log($(this));
    if ($(this).attr("type")=="checkbox" && $(this).val() == "Neutral")
        $(this).click();
    if ($(this).attr("type")=="radio" && $(this).val() == 0)
        $(this).click();
});