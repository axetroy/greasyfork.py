// ==UserScript==
// @name         Yobpos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://forums.somethingawful.com/forumdisplay.php?forumid=268
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var oldcss = document.getElementsByTagName("link").item(14);

    var newcss = document.createElement("link");
    newcss.setAttribute("rel","stylesheet");
    newcss.setAttribute("type","text/css");
    newcss.setAttribute("href","https://forums.somethingawful.com/css/219.css?1408492539");

    document.getElementsByTagName("body").item(0).replaceChild(newcss, oldcss);
})();