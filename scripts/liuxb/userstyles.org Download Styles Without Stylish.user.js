// ==UserScript==
// @name           userstyles.org Download Styles Without Stylish
// @namespace      http://greasyfork.org
// @author         NightsoN
// @description    This scripts allows you to download style directly without stylish installed.
// @include        http*://userstyles.org/styles/*
// @exclude        *.css
// @version        0.0.1.20141025045448
// @run-at         document-end
// @grant          none
// ==/UserScript==

(function () {
    var url = document.querySelector('link[rel="stylish-update-url"]').href;
    var solveCheck = setInterval(function() {
        clearInterval(solveCheck);
        document.getElementById("install_button").innerHTML = '<a id="download-button" class = "alternate-install" style="text-decoration:none;" href="' + url + '">Download This Style</a>';
        }, 2000);
}());