// ==UserScript==
// @name         灯塔视频学习助手
// @namespace    https://github.com/Cheese-Yu/dtAutoStudy
// @version      0.1
// @description  [灯塔视频][灯塔学习]
// @author       CheeseYu
// @match        *dyjy.dtdjzx.gov.cn/resourcedetailed*
// ==/UserScript==
returnTime=true;
var userId;
var project = JSON.parse($("#script_course").html());
var courseId = project.courseId;
var courseDuration = project.courseDuration;

(function() {
    'use strict';
    $.postJSON("/bintang/getUserId", {}).then(
	function(data) {
		userId = data;
		var userCookie = getCookie("USERID"+userId);
		if(userCookie!=null){
			var arrCookie = userCookie.split('|');
			if(arrCookie.length>1){
				courseId = arrCookie[0];
			}
		}
        click_video();
        setTimeout(function () {
            $.postJSON("/bintang/learntime", {
                timelength: courseDuration,
                courseId: courseId,
                userId:userId,
                studyTimes:courseDuration*60})
                .then(function(data) {
                if(data==false){
                    returnTime = true;
                }
                console.log(data);
            });
        }, 3000);
	});
})();