// ==UserScript==
// @name         PSO2攻略Wiki コメントページ詳細
// @description コメントページにコメント数や流速を表示します
// @namespace    https://github.com/unarist/
// @version      0.2
// @author       unarist
// @match        http://pso2.swiki.jp/index.php?Comments%2F*
// @grant        none
// ==/UserScript==

var container = $('<div>').insertAfter('#page_title');

$('<p>').text(
    'tree: ' + $('.list1 > li').length + ' ' +
    'node: ' + $('.list1 li').length
).appendTo(container);

var comments = $('.comment_date').map(function(){
    return Date.parse($(this).text().match(/.+\d/));
}).toArray();

comments.sort(function(a, b) {
    return a - b;
});
comments.reverse();

var fmt_dur = function(sec) {
    var fmt = function(div) { return Math.round(sec / div); };
    if(sec <= 60)
        return fmt(1) + '秒';
    else if (sec <= 3600)
        return fmt(60) + '分';
    else if (sec <= 24 * 3600)
        return fmt(3600) + '時間';
    else
        return fmt(24 * 3600) + '日';
};

var speed = function(count) {
    var real_count = Math.min(count, comments.length);
    var target_time = comments[real_count - 1];
    var dur_sec = (Date.now() - target_time) / 1000;
    return fmt_dur(dur_sec) + '前 (' + Math.round(real_count / dur_sec * 3600) + ' res/h)';
};

$('<p>').text(
    'last100: ' + speed(100) + ' ' +
    'last500: ' + speed(500) + ' ' +
    'all: ' + speed(comments.length)
).appendTo(container);