// ==UserScript==
// @name        OVSEmbedded
// @namespace   OVSEmbedded
// @langue      french
// @description Supprime les pubs et traceurs d'OVS,sans désactiver Adblock
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include     https://addons.mozilla.org/fr/firefox/addon/greasemonkey/
// @include     http://*.onvasortir.com/*
// @version     1
// @run-at      document-start
// @grant       none
// ==/UserScript==



function fuckJamirokai()
{
$("script").each(function(){
  var content=this.innerHTML;
  if (content.contains("sas") 
  || content.contains("smart")
  || content.contains("eStat_")
  || content.contains("analytics")
  || content.contains("ubicon"))
  {
    $(this).remove();
  }
});
}


document.addEventListener('DOMContentLoaded', fuckJamirokai, false);
window.addEventListener ("load", pageFullyLoaded);