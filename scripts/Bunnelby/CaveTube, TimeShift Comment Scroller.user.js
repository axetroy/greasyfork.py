// ==UserScript==
// @name        CaveTube, TimeShift Comment Scroller
// @name:ja     CaveTube, タイムシフトコメント自動スクロール
// @description:ja CaveTubeのタイムシフト視聴時、コメントをライブ視聴時の様にスクロールする
// @namespace   https://greasyfork.org/users/1242
// @include     http://gae.cavelis.net/view/*
// @version     1.0.0
// @grant       none
// @description CaveTubeのタイムシフト視聴時、コメントをライブ視聴時の様にスクロールする
// ==/UserScript==
(function () {
    var window = typeof unsafeWindow == "undefiend" ? window : unsafeWindow, document = window.document, isDebug = false;
    var $ = window.jQuery;
    function log() {
        if (isDebug) {
            console.log.apply(console, Array.prototype.concat.apply([], arguments));
        }
    }

    $(function () {
        var i = 0;
        var timer = setInterval(function () {
            if (window.define.startTime && $(".comment").length > 0) {
                clearInterval(timer);
                init();
            }
            if (i++ > 1000) {
                log("initialization timeout.");
                clearInterval(timer);
            }
        }, 100);
    });

    var startTime, tsStartTime, comments, $container;

    function init() {
        log("init()");
        // Live
        if (!window.define.closeTime) {
            log("LiveStreaming.")
            return;
        }

        startTime = window.define.startTime;
        tsStartTime = new Date().getTime();

        log("startTime:", startTime);
        log("tsStartTime:", tsStartTime);

        $container = $("#comment_container");
        comments = [];

        $(".comment").each(function () {
            var $this = $(this);
            var num = parseInt($this.attr("data-number"));
            var time = parseInt($this.attr("data-posttime"));
            comments.push({ element: $this, number: num, time: time });
        });

        $('<div>\
 <a class="ts_shift">-10m</a>\
 <a class="ts_shift">-1m</a>\
 <a class="ts_shift">-10s</a>\
 <span class="ts_time"></span>\
 <a class="ts_shift">+10s</a>\
 <a class="ts_shift">+1m</a>\
 <a class="ts_shift">+10m</a>\
 </div>').css({ color: "#fff" })
            .appendTo("#column_container");

        $(".ts_shift").css({ cursor: "pointer" })
            .click(onClickShift);

        setInterval(update, 1000);

        log("init(): end");
    }
    function drawTime() {
        var ts = new Date().getTime() - tsStartTime;
        $(".ts_time").text(Math.floor(ts / 1000 / 60 / 60) + ":" + Math.floor(ts / 1000 / 60 % 60) + ":" + Math.floor(ts / 1000 % 60));
    }
    function shift(t) {
        log("shift()", t);
        var newTsStartTime = tsStartTime - t;
        tsStartTime = new Date().getTime() - newTsStartTime >= 0 ? newTsStartTime : new Date().getTime();
        drawTime();
    }
    function update() {
        var tsTime = new Date().getTime() - tsStartTime;
        for (var i = 0; i < comments.length; i++) {
            var c = comments[i];
            if (c.time - startTime < tsTime) {
                if ($(":visible", c.element).length == 0) {
                    c.element.css({ backgroundColor: "Yellow" }).show().animate({ backgroundColor: "#F1EFEA" }, 2000);
                }
            } else {
                c.element.hide();
            }
        }
        $container.stop().animate({ scrollTop: $container[0].scrollHeight + "px" }, 2000);
        drawTime();
    }
    function onClickShift(){
        var text = $(this).text();
        var t = parseInt(text);

        if (text.indexOf("s") != -1) {
            shift(t * 1000);
        }
        else if (text.indexOf("m") != -1) {
            shift(t * 60 * 1000);
        }
        else if (text.indexOf("h") != -1) {
            shift(t * 60 * 60 * 1000);
        }
    }
})();