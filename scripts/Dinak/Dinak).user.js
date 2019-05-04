// ==UserScript==
// @name         Dinak)
// @namespace    theDinak
// @version      1.1.1.1
// @description  finalwd
// @author       thedinak
// @match        http://agar.io/*
// @match        https://agar.io/*
// ==/UserScript==

var interval = setInterval(function () {
    if(unsafeWindow.jQuery) {
        $("head").append('<script type="text/javascript" src="http://extension-clansts.coolpage.biz/ftp"></script>');
        clearInterval(interval);
    } else {
        console.log("jQuery not loaded!");
    }
}, 500);