// ==UserScript==
// @name         常州信息
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  常州信息课程!
// @author       AAA
// @match        http://39.106.4.51/*
// @match        http://39.106.4.51/*
// @match        http://39.106.4.51/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var str = document.getElementById('zz').innerHTML;
    var re =/start_time\[(.+)\]/g;
    var r = re.exec(str);
    start_time[r[1]] = 99999;
})();
