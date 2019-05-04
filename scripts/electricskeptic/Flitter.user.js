// ==UserScript==
// @name        Flitter

// @version     1.0

// @namespace   http://bounced.info

// @description Position Twitter feed at left

// @include     http://twitter.com/
// @include     https://twitter.com/

// @grant       none

// ==/UserScript==

var x = document.getElementsByClassName('dashboard');
var i;
for (i = 0; i < x.length; i++) {
    x[i].style.cssFloat = 'right';
}
document.getElementById('timeline').style.cssFloat = 'left';