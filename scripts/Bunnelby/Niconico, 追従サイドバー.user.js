// ==UserScript==
// @name           Niconico, 追従サイドバー
// @version        0.4.3
// @namespace      https://greasyfork.org/users/1242
// @description    ユーザーページでサイドバーを追従させます
// @include        http://www.nicovideo.jp/my*
// @include        http://www.nicovideo.jp/user/*
// @run-at         document-end
// @homepageURL    https://greasyfork.org/scripts/1016/
// ==/UserScript==
(function () {
    var w = typeof unsafeWindow == "undefined" ? window : unsafeWindow, document = w.document;
    var VERSION = "0.4.3", TAG = "[fsiup]", DEBUG_MODE = false;
    var log = function () { if (DEBUG_MODE) return w.console.log.apply(w.console, w.Array.prototype.concat.apply([TAG], arguments)); };
    var $ = w.jQuery;
    
    log("start");

    var isMypage = w.location.href.indexOf("http://www.nicovideo.jp/my") != -1;
    var isUserpage = w.location.href.indexOf("http://www.nicovideo.jp/user/") != -1;

    var $window = $(w);
    var $wrapper = $("div.wrapper");
    var $sidebar = isMypage ? $("div.wrapper div.sidebar > ul:first").css({ position: "absolute", top: 0, zIndex: 1000 }) : $("div.wrapper div.sidebar");
    var $siteHeader = $("#siteHeader");

    log($window, $wrapper, $sidebar, $siteHeader);

    var scrolled = function () {
        log("call scrolled()");
    	
        var wh = $window.height();
        var sh = $sidebar.height();
        var wt = $window.scrollTop();
        var st = $sidebar.offset().top;
        var rt = $wrapper.offset().top;
        var hh = $siteHeader.height();
        var hx = $siteHeader.css("position") == "fixed" ? hh : 0;

        log("wh:", wh, "sh:", sh, "wt:", wt, "st:", st, "rt:", rt, "hh:", hh);
        
        var mt;
        if (wt < rt) {
            mt = 0;
        } else if (wt + hx > st + sh || wt + wh < st) {
            mt = wt + hx - rt + 5;
        } else {
            return;
        }

        if (isMypage) {
            $sidebar.animate({ top: mt + "px" }, 250);
        } else {
            $sidebar.animate({ marginTop: mt + "px" }, 250);
        }

        log("move to:", mt);
    }
    
    var threadId;
    $window.scroll(function (ev) {
        $sidebar.stop();
        threadId = clearTimeout(threadId);
        threadId = setTimeout(scrolled, 500);
    });
    
    log("end");
})();