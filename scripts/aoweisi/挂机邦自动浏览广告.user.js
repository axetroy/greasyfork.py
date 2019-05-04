// ==UserScript==
// @name         挂机邦自动浏览广告
// @namespace    
// @version      0.1
// @description  挂机邦自动浏览广告 打开网页即可自动浏览
// @author       慕梓
// @match        http://www.guajibang.com/?browsead.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $("a.btn-url").each(function(){
        $(this)[0].click();
    })
})();