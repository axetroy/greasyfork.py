// ==UserScript==
 // @name The West Script Button
 // @namespace *
 // @grant none
 // @include http*://*.the-west.*/game.php*
 // @description Chowa przycisk skryptów do opcji
// @version 0.0.1.20170805100807
 // ==/UserScript==
 
 $(document).ready(function()
 {
 var newfunction = String(EscapeWindow.open);
 newfunction = 'EscapeWindow.open='+newfunction+';';
 newfunction = newfunction.replace(/\.setSize\(240\,290\)/g, ".setSize(240, 326)");
 newfunction = newfunction.replace(/window\.open\(Game\.forumURL,'wnd'\+\(new Date\)\.getTime\(\)\);/g, "(window.open(Game.forumURL, 'wnd' + new Date).getTime());}],['Script', function() {TheWestApi.open();");
 eval(newfunction);
 window.setTimeout("$('#ui_scripts').css({'display' : 'none'});", 10000);
 });