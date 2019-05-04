// ==UserScript==
// @name         Karnage Fast fire(Might Not Work)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Fire bullets without Cool Down.
// @author       Lexi
// @match        http://karnage.io/*
// @grant        none
// ==/UserScript==

$("#cvs").mousedown(function(c){1==c.which&&shootBullet(player)});