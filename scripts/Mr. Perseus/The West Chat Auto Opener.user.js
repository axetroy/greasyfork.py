// ==UserScript==
// @name        The West Chat Auto Opener
// @author      Mr. Perseus
// @namespace   tw-perseus
// @description Automatically opens the alliance chat on startup.
// @include     https://*.the-west.*/game.php*
// @include     http://*.the-west.*/game.php*
// @include     https://*.tw.innogames.*/game.php*
// @include     http://*.tw.innogames.*/game.php*
// @version     0.0.3
// @grant       none
// ==/UserScript==

"use strict";(function(a){var b=document.createElement("script");b.setAttribute("type","application/javascript"),b.textContent="("+a+")();",document.body.appendChild(b),document.body.removeChild(b)})(function(){var a={version:"0.0.3"};a.InitUpdater=function(){setTimeout(function(){$.getScript("https://glcdn.githack.com/knom_retsam/the-west-public/raw/master/script-updater.js",function(){if(scriptUpdater.TWCAO>a.version)var b=new west.gui.Dialog("Update: The West Chat Auto Opener","<span>Update Available<br><br><b>v"+scriptUpdater.TWCAO+":</b><br>"+scriptUpdater.TWCAONew+"</span>",west.gui.Dialog.SYS_WARNING).addButton("Update",function(){b.hide(),location.href="https://greasyfork.org/scripts/44030-the-west-chat-auto-opener/code/The%20West%20Chat%20Auto%20Opener.user.js"}).addButton("cancel").show()})},5e3)},a.OpenChat=function(){var a=new west.gui.Dialog("The West Chat Auto Opener","<span>Do you want to open the alliance chat?<br></span>",west.gui.Dialog.SYS_QUESTION).addButton("Yes",function(){a.hide(),$("div[id^=\"room_alliance_\"] .row_title").trigger("click")}).addButton("cancel").show()},$(document).ready(function(){try{a.InitUpdater(),setTimeout(a.OpenChat,2e3)}catch(a){console.log(a.stack)}})});