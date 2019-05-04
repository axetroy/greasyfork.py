// ==UserScript==
// @name         迅雷离线界面优化
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  优化迅雷离线界面，方便多选
// @author       You
// @match        http://dynamic.cloud.vip.xunlei.com/user_task?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("<style>.rwbox .rw_list { position: relative; }\n.rw_list .w01 { background: rgba(94,160,222,.1); position: absolute; left: 0; top: 0; height: 100%; }\n.rw_list .w01sel { padding: 20px 0 0 16px; }\n.rw_list .w02 { margin-left: 40px; }</style>").appendTo(document.head);
    var tid = null;
    $("div.rwbox").live("DOMSubtreeModified", function() {
        if (tid) {
            window.clearTimeout(tid);
        }
        tid = window.setTimeout(function() {
            tid = null;
            console.log("hoho");
            $("div.rwbox .w01").click(function(e) {
                var $target = $(e.target);
                e.stopImmediatePropagation();
                e.stopPropagation();
                //console.log(e, $target);
                $target.find(":checkbox").trigger("click");
            });
        }, 10);
    });
})();