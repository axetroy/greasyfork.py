// ==UserScript==
// @name         信奥一本通测评记录页面高亮自己的记录
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  信奥一本通测评记录页面高亮自己的记录方便查看
// @author       abc2237512422
// @match        http://ybt.ssoier.cn:8088/status.php*
// @match        https://ybt.ssoier.cn:8088/status.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var s=document.getElementsByTagName("a");
    for(var i=0;i<s.length;i++){
        if (s[i].href.indexOf("show_source.php")>0){
            var ele=s[i].parentElement.parentElement;
            ele.style="background: rgba(0,150,136,0.2);";
        }
    }
})();