// ==UserScript==
// @name        Board Game Arena - Skip last replay
// @namespace   http://pazziaumana.blogspot.it/
// @description This script skips the last moves replay of turn-based game of boardgamearena.com
// @match       http://*.boardgamearena.com/*
// @match       https://*.boardgamearena.com/*
// @version     1
// @grant       none
// ==/UserScript==

"use strict";

var url = window.location.href;
var rerepl = /(&|\?)replayLastTurn=1/i;
var retbl = /(&|\?)table=(\d+)/i;
var retbl_res;
var reurl = /(https?:\/\/([\w\d-]+\.)*boardgamearena\.com\/[^\?]+)\?/i;
var reurl_res;

if (rerepl.test(url))
{
    retbl_res = retbl.exec(url);
    if (retbl_res.length > 2)
    {
        reurl_res = reurl.exec(url);
        if (retbl_res.length > 1)
        {
           window.location = reurl_res[1] + "?table=" + retbl_res[2];
        }
    }
}
