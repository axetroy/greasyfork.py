// ==UserScript==
// @name         干掉百度新闻蛋疼版块
// @namespace    wyxhydd
// @version      0.1
// @description  try to take over the world!
// @author       wyxhydd
// @match        http*://news.baidu.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var ids = ["yule", "col-healthy", "col-lady", "shehui", "junshi"];

    function blockSection() {
        for (var i = 0; i < ids.length; i++) {
            var obj = $("#" + ids[i]);
            if (obj.size() == 1) {
                obj.hide();
            }
        }
    }

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MutationObserver(blockSection);
    var option = {
        'childList': true
    };
    document.onreadystatechange = function(){
        if(document.readyState == "complete"){
            observer.observe($("#body")[0], option);
            blockSection();
        }
    };
})();