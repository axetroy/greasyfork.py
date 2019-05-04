// ==UserScript==
// @name         Btc Heat Auto Spinner
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description Auto Spin 4 Seconds.
// @author       Android Phoneix
// @grant        none
// @include         *://btcheat.com/*
// @include         *://ethcombo.com/*
// ==/UserScript==

setInterval(function () {document.getElementById("playFancy").click();}, 4000);
setTimeout(function () { window.location.replace(window.location.href); }, 70000);