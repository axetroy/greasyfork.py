// ==UserScript==
// @name         Ver link de identi
// @namespace    http://identi.li
// @version      0.4
// @description  es para ver los link de identi, no sirve si el post usa JD
// @author       script creado por los usuarios de identi
// @match *://*.identi.li/*
// @match *://*.udenti.li/*
// ==/UserScript==

/* aca pongo script */

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*365*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 

setCookie('ads_accepted', '1', 5);