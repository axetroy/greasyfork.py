// ==UserScript==
// @name        智慧树全能助手
// @description 课程和见面课自动挂机、自动1.5倍速、标清、静音。 章测试和考试解除复制限制。
// @namespace	http://tampermonkey.net/
// @version	20181225
// @author     b1456089826
// @match   *://study.zhihuishu.com/learning/videoList;jsessionid*
// @match   *://study.zhihuishu.com/learning/videoList?courseId*
// @match   *://course.zhihuishu.com/learning/videoList?courseId*
// @match   *://course.zhihuishu.com/learning/videoList;jsessionid*
// @match   *://online.zhihuishu.com/CreateCourse/learning/videoList?courseId*
// @match  *://study.zhihuishu.com/learning/videoList?recruitAndCourseId*
// @match  *://exam.zhihuishu.com/onlineExam/*
// @match	    *://lc.zhihuishu.com/live/vod_room.html?t*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
function course() {
	if ($("#popbox_title").length > 0) {
		$(".popboxes_close")[0].click();
		console.log('关闭窗口');
	}

	if ($("#chapterList .time_ico.fl").nextAll()[2].children[0].style.width === "100%" || $("video").get(0).ended) {
		var num = -1;
		var text = $("#chapterList .time_ico.fl").parent().nextAll()[++num].id;
		while (text === "" ||
			text.substr(0, 5) != "video" ||
			text.substr(0, 7) === "video-0") {
			text = $("#chapterList .time_ico.fl").parent().nextAll()[++num].id;
		}
		$("#chapterList .time_ico.fl").parent().nextAll()[num].click();
	}

	if ($("video").length > 0 && $("video").get(0).playbackRate != 1.5) {
	var biaoqing = document.getElementsByClassName("line1bq")[0];
		console.log('切换到1.5倍');
		$(".speedTab15")[0].click();
		biaoqing.click();
	}

	if ($("video").get(0).volume > 0) {
		$(".volumeIcon").click();
	}
}

    function liveCourse() {
        $(".video_con").off('contextmenu');

        if($(".curVideo:not(.disNo)").prev().text() === "100%" || $("video")[0].ended) {
            var selector = $(".videomenu.current_player").next();
            var text = selector.text();
            if(text !== "") {
                selector.click();
            }
        }

        if($(".definiLines .active")[0].className === "line1gq active") {
            console.log('切换到标清');
            $(".line1bq")[0].click();
        }

        if ($("video").length > 0 && $("video")[0].playbackRate != 1.5) {
            console.log('切换到1.5倍');
            $(".speedTab15")[0].click();
        }

        if ($("video")[0].volume > 0) {
            $(".volumeIcon").click();
        }
        // 关弹幕
        $("#danmu").removeClass("bulletSwitchOn").addClass("bulletSwitchOff");
        // 签到达标则停止定时器的运行(你也可取消以下84行的代码注释来实现签到达标则直接关闭页面)
        if($(".finish_tishi")[0].className.indexOf("disNo") === -1) {
            window.clearInterval(liveQuery);
            $(".pauseButton").click();
            // window.close();
        }

    }
      if(window.location.href.indexOf("exam.zhihuishu.com/onlineExam/") !== -1){
        document.querySelector('.myschool_ewcon').onselectstart = null;
        document.querySelector('.myschool_ewcon').oncontextmenu = null;
        document.querySelector('.grayBg').onselectstart = null;
        document.querySelector('.grayBg').oncontextmenu = null;
        document.oncontextmenu = null;
        document.onselectstart = null;
         }        else  if(window.location.href.indexOf("lc.zhihuishu.com/live/vod_room.html") !== -1) {
        window.setInterval(liveCourse, 1000);
            } else  {
        window.setInterval(course, 1000);
    }

})();