// ==UserScript==
// @name         MouseHunt - SEH Loot Counter for Hunting Log
// @author       Jia Hao (Limerence#0448 @Discord)
// @namespace    https://greasyfork.org/en/users/165918-jia-hao
// @version      1.1
// @description  Counts the number of unique loot you have in your daily hunting log.
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// ==/UserScript==

//Appends loot count into the journal entry itself
function countLoot() {
    var logEntry = $("a:contains('More details')");
    if (logEntry.length == 0) return;

    //Find the JSON string for the loot obtained. Parse into JSON and iterate to count the loot
    var lootRawString = logEntry.attr('onclick').match(/{.*?}/gm)[2];
    var lootJSON = JSON.parse(lootRawString);
    var counter = 0;
    for (var loot in lootJSON) counter++;

    //HTML magic
    var htmlString = `
    <tr>
      <td class="spacer goldPointsSpacer" colspan="4"></td>
    </tr>
    <tr>
      <td class='field leftSide loot' colspan='2'></td>
	  <td class='field rightSide loot' colspan='2'>
	    <div class='fieldHeader right'>
          <b>Loot</b>
        </div>
	  </td>
    </tr>
    <tr>
	  <td class='field leftSide'></td><td class='value leftSide'></td>
      <td class='field rightSide'>Total:</td>
      <td class='value rightSide uniqueLoot'>` + counter + `</td>
    </tr>`;
    var parentTr = logEntry.parent().parent();
    if ($(".uniqueLoot").length == 0) $(htmlString).insertBefore(parentTr);
}

//Appends loot count into the sub-header in the loot journal
function lootWindow() {
    if ($(".default.hunting_summary").length == 0) return;
    $(".lootContainer .label").append(" (Total = " + $(".uniqueLoot").text() + ")");
}

//If loot window is opened, append the total count into the sub-header.
$(document).ajaxSuccess(lootWindow);
$(document).ready(function() {
    //If current page is main camp or journal
    var pageTitle = hg.utils.PageUtil.getCurrentPageTemplateType();
    if (pageTitle.includes("Camp") || pageTitle.includes("Journal") || pageTitle.includes("HunterProfile")) {
        countLoot();
    }
});
