// ==UserScript==
// @name         开地图
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      http://*.yytou.cn*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var clickBtnArr = [
    'cmd_click_exits_w2',
    'cmd_click_exits_n2',
    'cmd_click_exits_s2',
    'cmd_click_exits_e2',
    'cmd_click_exits_se2',
    'cmd_click_exits_sw2',
    'cmd_click_exits_ne2',
    'cmd_click_exits_nw2',
    'cmd_click3_find',
    'cmd_click2_find',
    'cmd_click_find'
];
function btnClickFn(){
    $('button').each(function(){
        var This = $(this);
        var btnClass = $(this).attr('class');
        for(var i = 0; i<clickBtnArr.length; i++){
            if(This.hasClass(clickBtnArr[i])){
                $(this).trigger('click');
                return;
            }
        }
    });
}


var clickInterval = setInterval(function(){
    btnClickFn();
}, 1000);
    // Your code here...
})();