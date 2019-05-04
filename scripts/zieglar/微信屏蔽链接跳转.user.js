// ==UserScript==
// @name        微信屏蔽链接跳转
// @namespace    http://zieglar.at
// @version      0.1
// @description  从微信中点开的被屏蔽链接直接跳转正常页面
// @author       zieglar
// @match        *://weixin110.qq.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var getURLParameter = function(name){
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    };
    var url = getURLParameter('url');
    location.href = url;
})();