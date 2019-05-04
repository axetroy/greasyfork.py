// ==UserScript==
// @name         Chat for Kissanime & Kissmanga Forum
// @namespace    http://cl.1ck.me/projects/chat
// @version      0.53
// @description  Chat for Kissanime-Forum
// @author       TheTh0rus
// @match        http://forum.kissanime.com/index.php
// @match        http://forum.kissanime.com
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';
var version = "0-53";
document.getElementsByClassName("titleBar")[0].innerHTML = document.getElementsByClassName("titleBar")[0].innerHTML + '<iframe src="http://cl.1ck.me/projects/chat/index.php?nick='+document.getElementsByClassName("accountUsername")[0].innerHTML+'&pic='+ document.getElementsByClassName("avatar")[0].children[0].src.replace("http://forum.kissanime.com/data/avatars/", "") + '&version='+version+'" width="100%" height="260px" style="border:none;"></iframe>';