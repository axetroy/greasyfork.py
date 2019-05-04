// ==UserScript==
// @name         江西干部挂机
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  try to take over the world!
// @author       You
// @match        http://www.jxgbwlxy.gov.cn/student/course!list.action*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    var course = $("a[href='javascript:;']").attr('onclick');
    course = course.substring(course.indexOf('(') + 1, course.indexOf(')'));
    $.get('http://www.jxgbwlxy.gov.cn/portal/study!start.action?id=' + course);
    setTimeout(function(){
        $.get('http://www.jxgbwlxy.gov.cn/portal/study!duration.action?id=' + course);
        location.replace(window.location.href);
    }, Math.random()*(900000-600000)+600000);
})();