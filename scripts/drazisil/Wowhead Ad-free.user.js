// ==UserScript==
// @name           Wowhead Ad-free
// @namespace      //www.wowhead.com/
// @description    Remove the annoying advertisements from Wowhead pages
// @include        http://*.wowhead.com/*
// @include        https://*.wowhead.com/*
// @version 0.0.1.20170310202049
// ==/UserScript==

ad1 = document.getElementById("ad-horizontal")
ad1.parentNode.removeChild(ad1)
ad2 = document.getElementById("ad-vertical")
ad2.parentNode.removeChild(ad2)
