// ==UserScript==
// @name        51job定时器
// @namespace    https://baidu.com
// @version      0.1.0
// @description  try to take over the world!
// @author       You
// @match        http://jobs.51job.com/*
// @grant        none
// ==/UserScript==

(function() {
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    var oneday = 1000 * 60 * 60 * 24;
    var settime = 8.5 * 60 * 60 * 1000;
    //今天0点的时间戳
    // console.log(today - 0);
    // 明天0点的时间戳
    // console.log(yesterday - 0);
    var hours = new Date().getHours();
    var time = 0;
    if (hours >= 9) {
        //拿到第二天早上8:30的时间戳
        time = new Date(today - 0 + oneday) - 0 + settime;

    } else {
        //拿到今天早上8:30的时间戳
        time = today - 0 + settime;
    }
    time = time - Date.now();
    // console.log(time);
    setTimeout(function () {
        $('#app_ck').click();
    }, time);
})();