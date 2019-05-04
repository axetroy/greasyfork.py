// ==UserScript==
// @name          Facebook Toolbar Remover
// @namespace     http://nmtools.com
// @description   Removes the new Facebook apps toolbar
// @include       *apps.facebook.com/*
// @version       1.1
// ==/UserScript==

document.getElementById("toolbarContainer").style.display = "none";