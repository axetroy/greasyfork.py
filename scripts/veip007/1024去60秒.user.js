// ==UserScript==
// @name         1024去60秒
// @namespace    http://tampermonkey.net/
// @version      1.1.7
// @description  去除1024的60秒屏蔽
// @author       明月天QQ791290123
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
readS= null;
r1eadS= null;
re1adS= null;
rea1dS= null;
read1S= null;
readS1= null;
r2eadS= null;
re2adS= null;
rea2dS= null;
read2S= null;
readS2= null;
r3eadS= null;
re3adS= null;
rea3dS= null;
read3S= null;
readS3= null;
r4eadS= null;
re4adS= null;
rea4dS= null;
read4S= null;
readS4= null;
})();

    //91解析3.2.1
(function() {
    "use strict";
    //当前网址
    var thisSite = window.location.href;

    //91详情页
    if (/view_/i.test(thisSite) && !(/vlog/i.test(thisSite)) && !(/yyxf\.xyz/i.test(thisSite))) {
        var newTd = '<td style="position:relative;width:50px;">' +
            '<div style="position:absolute;left:0px;top:0px;z-index:999;"><table id="newTable"></table></div></td>';
        var btn1 = '<tr id="btn1"><td style="font-size:35px;font-weight:bold;cursor:pointer;color:#FFFF00;">①</td></tr>';
        var btn2 = '<tr id="btn2"><td style="font-size:35px;font-weight:bold;cursor:pointer;color:#FFFF00;">②</td></tr>';
        var msg = '<div style="font-size:20px;font-weight:bold;color:#FFFF00;cursor:default;">' +
            '游客可以通过解析无限观看，部分播放源需要翻墙<br/>登录即是至尊会员，功能包括无限观看、10秒搜索和高清解锁</div>';
        $("#container_video>table td:first").after(newTd);
        $("#newTable").append(btn1, btn2);
        $("#containersearch").append(msg);
        //安卓放大按钮
        if (/Android/i.test(navigator.appVersion)) {
            $("#newTable td").css("font-size", "200px");
        }
        //解析1
        $("#btn1").click(function() {
            window.open("https://www.vlogdownloader.com/#" + thisSite, "_self");
        });
        //解析2
        $("#btn2").click(function() {
            window.open("https://91.yyxf.xyz/vip.php?link=" + thisSite, "_self");
        });
    }

    //vLog主页
    else if (/vlog/i.test(thisSite) && (/view/i.test(thisSite))) {
        $("#vlog").submit();
    }

    //vLogd播放页
    else if (/html/i.test(thisSite)) {
        //模态框背景固定
        $("#exampleModal").attr("data-backdrop", "static");
        $(".btn.btn-primary:eq(10)").click();
        //点击暂停
        $(window).on("click", "video", function() {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });
        //空格键暂停
        $(window).keydown(function(e) {
            var video = $("video")[0];
            if (e.keyCode == 32) {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
    }

    //vLog错误页
    else if (/vlog/i.test(thisSite) && (/403/i.test(thisSite))) {
        history.back();
    }

    //解锁至尊会员
    if (!(/vlog/i.test(thisSite)) && !(/yyxf\.xyz/i.test(thisSite))) {
        document.cookie = "watch_times=0";
        document.cookie = "level=7";
        document.cookie = "user_level=7";
    }
})();