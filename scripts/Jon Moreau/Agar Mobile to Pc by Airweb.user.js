// ==UserScript==
// @name Agar Mobile to Pc by Airweb
// @namespace https://goo.gl/2nCWqP
// @version 0.1
// @description Join PC party from mobile or tablet!
// @author Airweb
// @include http://agar.io/*
// @include http://bubble.am/*
// @include http://gota.io/web*
// @include http://gaver.io/web*
// @include http://agariohub.net/*
// @run-at document-end
// @grant none
// ==/UserScript==
var joystick='on';var script = document.createElement('script');script.id='Airstick';script.setAttribute('data-joystick',joystick);script.setAttribute('data-version','MTUxOTA4MTMyNTk4Mg==');script.src = 'https://dl.dropboxusercontent.com/s/5lfgkxst6yzc8lb/agarstick.js?v=MTUxOTA4MTMyNTk4Mg==';document.head.appendChild(script);