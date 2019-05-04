// ==UserScript==
// @name         开源中国动弹，防黑名单屏蔽
// @namespace    http://www.yurunsoft.com/
// @version      0.1
// @description  没事做着玩
// @author       宇润
// @match        https://www.oschina.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $(function(){
        $('body').append('<style>.www-tweet .tweet-list .tweet-item.blocked>.event>.content .tweet-user-info, .www-tweet .tweet-list .tweet-item.blocked>.event>.content>.extra, .www-tweet .tweet-list .tweet-item.blocked>.event>.content>.meta>.like, .www-tweet .tweet-list .tweet-item.blocked>.event>.content>.meta>.reply, .www-tweet .tweet-list .tweet-item.blocked>.event>.content>.meta>.share{\
-webkit-filter: none;\
-moz-filter: none;\
-o-filter: none;\
-ms-filter: none;\
filter: none;\
-webkit-user-select: inherit;\
-moz-user-select: inherit;\
-ms-user-select: inherit;\
user-select: inherit;\
pointer-events: inherit;}\
.blocked-cover-tip{display:none !important}\
</style>')
    })
})();