// ==UserScript==
// @name         辽宁省干部在线学习网_刷课
// @namespace    lngbzx.gov.cn
// @version      0.4.1
// @description  闲的没事
// @author       qingcaomc@gmail.com
// @license      GPLv3
// @match        http://*.lngbzx.gov.cn/student/enterCourse.do*
// @grant        none
// @icon         https://avatars3.githubusercontent.com/u/25388328
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
(function() {
    'use strict';
    const debug = 1;
    console.log("%c感谢您使用本插件，请自觉使用。", "color: red; font-style: italic");
    $("video").remove()
    $("iframe").remove()
    $("body").append("<h1>视频已屏蔽，正在上课</h1>")
    function sendMessage() {
        var watchId = document.getElementsByName('watchId')[0].value;
        var courseId = document.getElementsByName('courseId')[0].value;
        var courseStudentId = document.getElementsByName('courseStudentId')[0].value;
        $.ajax({
            type: "GET",
            url: "/student/video/json/ajaxRecordCourseWatchingTime.do?_x=" + Math.random() + "&watchId=" + watchId + "&courseId=" + courseId + "&courseStudentId=" + courseStudentId,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus, xhr) {
                console.log(data)
            },
            error: function(msg) {
                console.error(msg)
            }
        });
    }
    for (var i = 0; i <= 100; i++) {
        sendMessage();
        setTimeout("window.close()",1500);
    }
})();