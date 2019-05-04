// ==UserScript==
// @name         爱问知识人查看所有回答
// @namespace    gqqnbig.me
// @version      0.1
// @description  不用再点击“查看更多全部答案”了
// @author       gqqnbig
// @match        https://iask.sina.com.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("#other_answer li").each(function()
    {
        $(this).css("display","");
    })

    $(".item-list-more-page").detach();
    $("#otherAnswerPage").show();
})();