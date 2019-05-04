// ==UserScript==
// @name         yy-auto-redir
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  redirect yy security warning page
// @author       LYC
// @include      http://redir.yy.duowan.com/warning.php?url=*
// @grant        none
// ==/UserScript==
/* jshint -W097 */

document.location.href = unescape(document.location.href.match("url=(.*?)$")[1]);