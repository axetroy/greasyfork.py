// ==UserScript==
// @name         南信大自动评教
// @namespace    myetyet
// @version      0.2
// @description  南京信息工程大学学分制教学管理系统评教页面自动勾选8分并提交
// @author       myetyet
// @match        http://wlkt.nuist.edu.cn/*/student/wspjdf.aspx*
// @run-at       document-end
// @grant        none
// ==/UserScript==

const mark = 8;

(function() {
    'use strict';
    var x = 1;
    while (true){
        var rname = ++x < 10 ? "GridView1_ctl0" : "GridView1_ctl";
        rname += String(x) + "_RadioButton" + String(10 - mark + 1)
        var rd = document.getElementById(rname)
        if (rd){
            rd.checked = true;
        } else {
            break;
        }
    }
    var btn = document.getElementById("Button2");
    if (btn){
        btn.click();
    }
})();