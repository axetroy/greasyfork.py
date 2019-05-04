// ==UserScript==
// @name               Facebook Cleaner (people you may know)
// @description        So far, only the FIRST instance of people you may know is hidden
// @version            1.0
// @include            http://www.facebook.com/*
// @include            https://www.facebook.com/*
// @namespace https://greasyfork.org/users/153157
// ==/UserScript==

document.getElementById('substream_0').style.display = 'none';