// ==UserScript==
// @name         Neopets: Vending Machine
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Plays vending machine if you have nerkmids.
// @author       Nyu (clraik)
// @match        http://www.neopets.com/vending.phtml*
// @match        http://www.neopets.com/vending2.phtml*
// @match        http://www.neopets.com/vending3.phtml*
// ==/UserScript==


// Set min and max to wait between clicks.
var minToWait=100;//100 = 0.1 second
var maxToWait=5000;//5000 = 5 seconds
var wait=Math.floor(Math.random() * (maxToWait - minToWait + 1)) + minToWait; //This will generate a random number between min and max

if(document.URL.indexOf("vending.phtml") != -1) {
	setTimeout(function(){ $("[value='Press me to Continue!']").click();},wait);
}
if(document.URL.indexOf("vending2.phtml") != -1) {
	$('select[name="nerkmid_id"] option:eq(1)').attr('selected', 'selected');
	var r1=Math.floor(Math.random() * (3 - 1 + 1)) + 1;
	var r2=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	var r3=Math.floor(Math.random() * (5 - 1 + 1)) + 1;
	var r4=Math.floor(Math.random() * (7 - 1 + 1)) + 1;
	$('select[name="large_button"] option:eq('+r1+')').attr('selected', 'selected');
	$('select[name="small_button"] option:eq('+r2+')').attr('selected', 'selected');
	$('select[name="button_presses"] option:eq('+r3+')').attr('selected', 'selected');
	$('select[name="lever_pulls"] option:eq('+r4+')').attr('selected', 'selected');
	setTimeout(function(){$("[value='GO!!!']").click();},wait);
}
if(document.URL.indexOf("vending3.phtml") != -1) {
	setTimeout(function(){$("[value='Play Again!']").click();},wait);
}