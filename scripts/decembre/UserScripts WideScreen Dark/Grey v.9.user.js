(function () {

// ==UserScript==
// @name          UserScripts WideScreen Dark/Grey v.9
// @namespace     http://userscripts.org/users/5161
// @icon          http://www.gravatar.com/avatar/317bafeeda69d359e34f813aff940944?r=PG&s=48&default=identicon
// @description   Custom Widescreen CSS theme for userscripts.org
// @copyright     2011+, decembre (http://userscripts.org/users/5161)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       9

// @homepage        http://userscripts.org/scripts/show/182721

// @include       http://userscripts.org/*
// @include       http://userscripts-mirror.org/*
// @include       http://userscripts.org:8080/*

//
// @require       https://greasyfork.org/libraries/GM_setStyle/0.0.15/GM_setStyle.js
// @resource      css http://pastebin.com/raw.php?i=MNNMVxWg
//
// @grant         GM_getResourceText
//
// ==/UserScript==

  let styleNode = GM_setStyle({
    data: GM_getResourceText("css")
  });

})();