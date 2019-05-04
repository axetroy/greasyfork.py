// ==UserScript==
// @name         Automatyczne PVP...
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Atakuje ludzi z którymi masz WARA
// @author       Vomar
// @match        https://kosmiczni.pl/*
// @grant        none
// ==/UserScript==

function attack() {
//if ($(".firstIcon > img[src*='war.png']").length) 
{
    $( "a[id^='quickpvpattack']" ).trigger('click');
	$( "a[id^='npvpattack']" ).trigger('click');
}
}
setInterval(attack,1);
