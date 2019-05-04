// ==UserScript==
// @name         高校邦视频自动播放器
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动播放高校邦视频，防止自动暂停，并自动答题。
// @author       BUAA1873
// @match        https://*.class.gaoxiaobang.com/class/*/unit/*/chapter/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    
    function executeUntilSuccess(func, trySpan) {
        let xs = function () {
            let succ = true;
            try {
                func();
            }
            catch (ex) {
                succ = false;
            }
            if (!succ) {
                setTimeout(xs, trySpan);
            }
        };
        setTimeout(xs, 0);
    }

    let rep = window.addEventListener;
    window.addEventListener = function (type, listener, options) {
        if (type !== "blur") {
            rep(type, listener, options);
        }
        else {
            console.log("Hooked!");
        }
    };

    function checkNonVideo(token) {
        let result = jQuery(".curFilmPlay").prev().prev();
        if (result.length == 0)
            return null;
        else {
            if (!result.hasClass("video-status-ico")) {
                let result = jQuery("a:has(span.titleVideo)").filter(function () { return !$(this).prev().hasClass("gxb-icon-end"); });
                if (result.length > 0) {
                    result.first().click();
                }
                else {
                    clearInterval(token);
                    alert("放完了！");
                }
            }
        }
    }

    executeUntilSuccess(function () {
        if (typeof jQuery == 'undefined') {
            throw "No jQuery";
        }

        let token = setInterval(() => checkNonVideo(token), 500);

        executeUntilSuccess(function () {
            let result = jQuery('.player-video');
            if (result.length == 0) {
                throw "No video element";
            }
            setInterval(function () {
                let r2 = jQuery("#video_player_html5_api");
                if (r2.length > 0) {
                    r2.get(0).play();
                }
            }, 500);

            window.eventSet = false;
            jQuery('.player-video').bind('DOMSubtreeModified', function (e) {
                if (jQuery(this).children(".gxb-video-quiz-warp").length > 0) {
                    if (!window.eventSet) {
                        window.eventSet = true;
                        console.log("Event created.");
                        setTimeout(function () {
                            var classFix = document.getElementsByClassName("gxb-icon-check unchecked");
                            //勾选正确答案
                            let correctAnswer = $(".correctAnswer").attr("data");
                            for (let k = 0; k < correctAnswer.length; k++) {
                                for (let i = 0; i < classFix.length; i++) {
                                    let Fix = classFix[i];
                                    if (jQuery(Fix).parent().text().includes(correctAnswer.charAt(k))) {
                                        jQuery(Fix).click();
                                    }
                                }
                            }

                            //提交
                            var oBtn = document.getElementsByClassName('gxb-btn_ submit');
                            for (let i = 0; i < oBtn.length; i++) {
                                let click = oBtn[i];
                                click.click();
                            }
                            //继续观看
                            var oBtn2 = document.getElementsByClassName('gxb-btn_ player');
                            for (let i = 0; i < oBtn2.length; i++) {
                                let clk2 = oBtn2[i];
                                clk2.click();

                            }

                            window.eventSet = false;
                        }, 1000);
                    }
                }
            });
        });
    }, 100);
})();