// ==UserScript==
// @name         高顿点餐系统
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://d.gaodun.cn/f/l7Bn3j
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //自动选择高顿网校
    document.getElementsByName('entry[field_6]')[0].checked="true";
    //自动填写工号
    document.getElementById('entry_field_11').value = '15189';
    //加班原因，默认选择加班
    document.getElementsByName('entry[field_10]')[0].checked="true";
    //套餐默认选择A
    document.getElementsByName('entry[field_3]')[0].checked="true";
    //绑定回车
    document.onkeydown = function(e)
    {
        if(!e){
            e = window.event;
        }
        if((e.keyCode || e.which) == 13){
            document.getElementsByName('commit')[0].click();
        }
    }
})();