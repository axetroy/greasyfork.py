// ==UserScript==
// @name         购房登记自动填写-查询
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://171.221.172.13:8888/lottery/accept/searchResult
// @grant        none
// @run-at       document-end
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    var text = $("body").text();
    if(text.indexOf("购房登记申请结果") == -1){
        $("input#cardId").val("身份证号码");
        $("input#telephone").val("手机号");
        $("#bt_query").click();
    }

})();