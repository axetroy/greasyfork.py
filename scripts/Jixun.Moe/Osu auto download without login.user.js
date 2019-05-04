// ==UserScript==
// @name        Osu auto download without login
// @namespace   http://jixun.org/
// @description Auto download map from loli.al mirror.
// @include     http://osu.ppy.sh/b/*
// @include     http://osu.ppy.sh/s/*
// @version     1.0
// @grant       none
// ==/UserScript==

if (!document.referrer) location.host = 'loli.al';