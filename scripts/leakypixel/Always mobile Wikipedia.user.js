// ==UserScript==
// @name        Always mobile Wikipedia
// @namespace   https://gist.github.com/leakypixel
// @description Redirect desktop Wikipedia to mobile
// @author      leakypixel
// @include     http://*.wikipedia.org/*
// @include     https://*.wikipedia.org/*
// @version     0.2.1
// @grant       none
// ==/UserScript==
'use strict';

var m = /^(https?:\/\/[a-z]+)(\.wikipedia\.org\/.*)/.exec(location.href);
if (m) { window.location = m[1] + ".m" + m[2] };