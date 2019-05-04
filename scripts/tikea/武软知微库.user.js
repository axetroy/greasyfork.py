// ==UserScript==
// @name         武软知微库
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       KEAL
// @match        http://125.221.38.2/*
// @match        http://125.221.38.4/*
// @match        http://221.234.230.10/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var str = document.getElementById('zz').innerHTML;
    var re =/start_time\[(.+)\]/g;
    var r = re.exec(str);
    start_time[r[1]] = 99999;
})();