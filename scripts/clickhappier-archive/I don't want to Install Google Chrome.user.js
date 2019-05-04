// ==UserScript==
// @name           I don't want to Install Google Chrome
// @namespace      VRonin
// @include        http://www.google.*/?gws_rd*
// @include        https://www.google.*/?gws_rd*
// @include        https://encrypted.google.com/?gws_rd*
// @include        http://www.google.*/
// @include        https://www.google.*/
// @include        https://encrypted.google.com/
// @version        0.5
// @grant          none
// @description Hides the "Install Google Chrome" message.
// ==/UserScript==


window.setTimeout(function(){
google.promos&&google.promos.pushdown&& google.promos.pushdown.pd_dp('gpx');
google.promos&&google.promos.toast&& google.promos.toast.cpc();
// document.getElementById('pushdown').style.visibility = 'hidden';
},500);


