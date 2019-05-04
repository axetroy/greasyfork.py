// ==UserScript==
// @name         漫画台PC浏览
// @namespace    http://idrunk.net/
// @version      1.0
// @description  在PC上看漫画
// @author       Drunk
// @match        http://*.manhuatai.com/*
// ==/UserScript==
// @require      http://code.jquery.com/jquery-1.11.0.min.js


(() => {
    'use strict';

    let scheme = {
        timer (callback, time) {
            if (this.stoped) return;
            if (!time) time = 100;
            window.setTimeout(() => {
                callback.call();
                scheme.timer.call(this, callback, time);
            }, time);
        },

        stop () {
           this.stoped = 1;
        }
    };

    $(() => {
        $('body').prepend('<style>#mh_member{display:none;}</style>'); // 关闭遮罩
        scheme.timer(() => {
            let layer = $('#mh_member');
            if (layer.length) {
                layer.remove(); // 移除遮罩
                $('body').css('overflow', 'auto'); // 开启滚动
                $(document).off("contextmenu"); // 开启右键
                scheme.stop(); // 停止任务
            }
        }, 10);
    });
})();