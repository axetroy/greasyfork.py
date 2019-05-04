// ==UserScript==
// @name        Bilibili播放器全屏、网页全屏按钮交换
// @namespace   niu541412
// @match       *://www.bilibili.com/video/av*
// @match       *://bangumi.bilibili.com/anime/*/play*
// @match       *://www.bilibili.com/bangumi/play/ep*
// @match       *://bangumi.bilibili.com/movie/*
// @exclude     *://bangumi.bilibili.com/movie/
// @version     5.4
// @author      niu541412@gmail.com
// @icon        data:image/gif;base64,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
// @license     MIT License
// @description html5播放器中，交换“网页全屏”和“全屏”按钮的功能。新链接自动滚动至播放窗口。
// ==/UserScript==
if (!location.pathname.match(/movie/gi)) {
    document.getElementsByClassName("info")[0].scrollIntoView(); //自动滚动至播放窗口
}

var fullwin_state = 0; //0:初始窗口; 1:网页全屏; 2:全屏
var icon, btn1, btn2;

function waitLoad(success) {
    if (!location.href.match(/bangumi/gi)) {
        var gettingPlayer = setInterval(function() {
            if (document.querySelectorAll("div[name=browser_fullscreen]").length >= 1) {
                clearInterval(gettingPlayer);
                gettingPlayer = null;
                icon = document.querySelectorAll("div[name=browser_fullscreen]")[0];
                btn1 = document.querySelectorAll("i[name=browser_fullscreen]")[0];
                btn2 = document.querySelectorAll("i[name=web_fullscreen]")[0];
                fullwin_state = 0;
                success.call(this);
                //} else {
                //console.info('Player not ready');
            }
        }, 100);
    } else {
        var frameNo, bangumiId;
        if (!location.hostname.match(/bangumi/gi)) {
            frameNo = 2;
            bangumiId = location.pathname.match(/ep\d*/gi)[0].slice(2);
        } else {
            frameNo = 1;
            bangumiId = location.hash.slice(1);
        }
        var gettingIframe = setInterval(function() {
            if (document.querySelectorAll("iframe.bilibiliHtml5Player").length >= 1) {
                clearInterval(gettingIframe);
                gettingIframe = null;
                var gettingPlayer = setInterval(function() {
                    if (window.frames[frameNo].document.getElementsByClassName("bilibili-player-video-control").length >= 1) {
                        var iframeSrc = document.querySelectorAll("iframe.bilibiliHtml5Player")[0].getAttribute("src");
                        if (location.pathname.match(/movie/gi) || iframeSrc.match(/episodeId=\d*/gi)[0].slice(10) == bangumiId) {
                            //console.log(iframeSrc.match(/episodeId=\d*/gi)[0].slice(10), location.hash.slice(1));
                            clearInterval(gettingPlayer);
                            gettingPlayer = null;
                            icon = window.frames[frameNo].document.querySelectorAll("div[name=browser_fullscreen]")[0];
                            btn1 = window.frames[frameNo].document.querySelectorAll("i[name=browser_fullscreen]")[0];
                            btn2 = window.frames[frameNo].document.querySelectorAll("i[name=web_fullscreen]")[0];
                            fullwin_state = 0;
                            window.frames[frameNo].document.addEventListener('keydown', function(e) {
                                if (e.key == 'Escape' && fullwin_state == 1) {
                                    exitFullscreen();
                                }
                            }, false);
                            success.call(this);
                        }
                        //} else {
                        //console.info('Player not ready');
                    }
                }, 300);
                //} else {
                //console.info('Iframe not ready');
            }
        }, 100);
    }
}

function switch_icon() {
    //console.log("state", fullwin_state, "\nBTN1  ", btn1.getAttribute("class").match(/icon-\w*/gi), "\nBTN2  ", btn2.getAttribute("class").match(/icon-\w*/gi));
    btn1.classList.replace("icon-24fullscreen", "icon-24webfull");
    btn1.setAttribute("data-text", "网页全屏");
    btn2.classList.replace("icon-24webfull", "icon-24fullscreen");
    btn2.setAttribute("data-text", "进入全屏");
    icon.addEventListener('click', function(e) {
        //console.log("click " ,e.target,"\ntrust:",e.isTrusted);
        if (e.isTrusted) {
            if (e.target.getAttribute('name') == 'web_fullscreen') {
                btn1.click();
                //console.log("state1",fullwin_state,"btn1  ",btn1.classList,"\nbtn2  ",btn2.classList);
                btn1.classList.remove("icon-24webfull");
                btn1.classList.remove("icon-24exitwebfull");
                btn1.classList.add("icon-24exitfullscreen");
                btn1.setAttribute("data-text", "退出全屏");
                btn2.classList.remove("icon-24fullscreen");
                btn2.setAttribute("data-text", "网页全屏");
                fullwin_state = 2;
                //console.log("state2",fullwin_state,"btn1  ",btn1.classList,"\nbtn2  ",btn2.classList);
                //console.log(fullwin_state, "应该进入全屏\n========================="); //此后btn2不显示
            } else if (!icon.classList.contains("video-state-fullscreen-off")) {
                btn1.click();
                exitFullscreen();
                //console.log(fullwin_state, "应该退出全屏\n=========================");
            } else if (fullwin_state === 0) {
                btn2.click();
                btn1.classList.remove("icon-24webfull");
                btn1.classList.add("icon-24exitwebfull");
                btn1.setAttribute("data-text", "退出网页全屏");
                btn2.classList.remove("icon-24exitwebfull");
                btn2.setAttribute("data-text", "进入全屏");
                fullwin_state = 1;
                //console.log(fullwin_state, "应该网页全屏\n=========================");
            } else {
                btn2.click();
                exitFullscreen();
                //console.log(fullwin_state, "应该退出网页全屏\n=========================");
            }
            e.stopPropagation();
        }
    }, true);
}

function exitFullscreen() {
    //console.clear();
    //console.log("退出全屏");
    fullwin_state = 0;
    btn1.classList.remove("icon-24exitfullscreen");
    btn1.classList.add("icon-24webfull");
    var waitBtn2 = setInterval(function() {
        //console.log(btn2.getAttribute("class").match(/icon-\w*/gi), Date.now());
        if (btn2.classList.contains("icon-24fullscreen") && !btn2.classList.contains("icon-24webfull")) {
            clearInterval(waitBtn2);
            waitBtn2 = null;
        }
        btn2.classList.remove("icon-24webfull");
        btn2.classList.add("icon-24fullscreen");
        btn1.setAttribute("data-text", "网页全屏");
        btn2.setAttribute("data-text", "进入全屏");
    }, 20);
}

document.addEventListener("webkitfullscreenchange", function(event) {
    if (!document.webkitFullscreenElement) {
        exitFullscreen();
    }
}, false);
document.addEventListener("mozfullscreenchange", function(event) {
    if (!document.mozFullScreenElement) {
        exitFullscreen();
    }
}, false);
document.addEventListener("msfullscreenchange", function(event) {
    if (!document.msFullscreenElement) {
        exitFullscreen();
    }
}, false);
document.addEventListener('keydown', function(e) {
    if (e.key == 'Escape' && fullwin_state == 1) {
        exitFullscreen();
    }
}, false);


waitLoad(switch_icon);

if (location.pathname.match(/bangumi/gi)) {
    var epPathname = location.pathname;
    var epList = document.getElementsByClassName("episode-list")[0];
    epList.addEventListener("click", function(e) {
        if (location.pathname != epPathname) {
            epPathname = location.pathname;
            waitLoad(switch_icon);
        }
    });
} else {
    addEventListener('hashchange', function() {
        waitLoad(switch_icon);
    });
}