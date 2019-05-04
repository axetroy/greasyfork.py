// ==UserScript==
// @name         直播吧NBA直播实时比分
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  在页面标题或者标签栏显示比赛的实时比分
// @author       You
// @match        https://www.zhibo8.cc/zhibo/nba/*.htm
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var ttlIntrvl = setInterval(function() {
        showScoreTitle();
    }, 3000);
    showScoreTitle();
})();

function showScoreTitle() {
    var $vt = $('.bf_top .team_1 .visit_team_name a');
    var $vs = $('.bf_top .bf_box.tmtop .time_score .visit_score');
    var $ht = $('.bf_top .team_2 .home_team_name a');
    var $hs = $('.bf_top .bf_box.tmtop .time_score .host_score');

    if (
        $vt.length < 1 ||
        $vs.length < 1 ||
        $ht.length < 1 ||
        $hs.length < 1
    ) {
        console.log('PARSE ERROR!');
        return;
    }

    document.title = $vt.text() + " " + $vs.html() + " ➲ " + $hs.html() + " " + $ht.text();
}