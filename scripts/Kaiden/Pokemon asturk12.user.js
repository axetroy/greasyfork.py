// ==UserScript==
// @name Pokemon asturk12
// @version 0.1
// @description ...
// @author Erthejosea
// @match http://*.pokemon-vortex.com/*
// @match http://*.pokemon-vortex.com/
// @grant none
// @require http://code.jquery.com/jquery-1.8.3.js
// @namespace https://greasyfork.org/users/36009
// ==/UserScript==

$(function() { var bTimer = true; var hTimer = null; $(document).keyup(function(e) { if(e.which == 45) { setTimeout(function() { bTimer = true; console.log("Battle bot started !"); }, 100); } }); $(document).keyup(function(e) { if(e.which == 46) { setTimeout(function() { bTimer = false; console.log("Battle bot stoped !"); }, 100); } }); hTimer = setInterval(function() { if($("#ajax").html().indexOf("An error has occurred") != -1) { location.reload(); } if(bTimer == true) { $("p").find("input").closest("form").sub­mit(); $("center").find("input").closest("form"­).submit(); $('a[href="/battle.php?bid=110544"]').cl­ick(); // you can change your trainer from here with battle id. } else if(bTimer == false) { clearInterval(hTimer); } }, 1100);
});