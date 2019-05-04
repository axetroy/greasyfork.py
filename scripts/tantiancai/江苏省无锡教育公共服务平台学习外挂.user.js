// ==UserScript==
// @name         江苏省无锡教育公共服务平台学习外挂
// @namespace    https://greasyfork.org/zh-CN/users/41249-tantiancai
// @version      0.8
// @description  自动挂机学习，轻松达到1000分钟的学习要求。
// @author       Tantiancai
// @match        http://learn.wxjy.com.cn/lms/learning/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    function getUnsafeWindow() {
        if(this)
        {
            console.log(this);
            if (typeof(this.unsafeWindow) !== "undefined") {//Greasemonkey, Scriptish, Tampermonkey, etc.
                return this.unsafeWindow;
            } else if (typeof(unsafeWindow) !== "undefined" && this === window && unsafeWindow === window) {//Google Chrome natively
                var node = document.createElement("div");
                node.setAttribute("onclick", "return window;");
                return node.onclick();
            }else
            {
            }
        } else {//Opera, IE7Pro, etc.
            return window;
        }
    }
    var myUnsafeWindow = getUnsafeWindow();
    var processTimer = null;
    var cntRetry = 0;

    function TimeProcess()
    {
        myUnsafeWindow.process += 60;
        myUnsafeWindow.currentPosition = myUnsafeWindow.process;

        if(videoTotalTime == 0)
        {
            var duration = myUnsafeWindow.player.getDuration();
            videoTotalTime = parseInt(duration);
            cntRetry++;
            console.log('Retry:' + cntRetry);
            if(cntRetry >3)
            {
                myUnsafeWindow.location.reload();
            }
        }

        if (videoTotalTime > 0)
        {
            myUnsafeWindow.player.stop();
            if (process >= videoTotalTime)
            {
                myUnsafeWindow.process = videoTotalTime;
                myUnsafeWindow.currentPosition = videoTotalTime;
                myUnsafeWindow.learningSave();
                myUnsafeWindow.document.getElementById('nextSectionLink').click();
                myUnsafeWindow.clearInterval(processTimer);
                console.log('Complete');
            }
            else
            {
                myUnsafeWindow.learningSave();
                myUnsafeWindow.clearInterval(saveTimer);
                console.log('SaveTime');
            }
        }
        else if(videoTotalTime < 0)
        {
            myUnsafeWindow.document.getElementById('nextSectionLink').click();
            myUnsafeWindow.clearInterval(processTimer);
            console.log('Error');

        }
    }
    if (typeof (player) !== 'undefined')
    {
        myUnsafeWindow.clearInterval(clockTimer);
        processTimer = myUnsafeWindow.setInterval(TimeProcess, 60000);
    }
    else
    {
        myUnsafeWindow.document.getElementById('nextSectionLink').click();
    }
}) ();
