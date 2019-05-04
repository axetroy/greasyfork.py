// ==UserScript==
// @name         智慧树考试辅助脚本-20190323
// @namespace    http://exam.zhihuishu.com/
// @version      1.2
// @description  破解右键菜单,文本选取,复制,剪切,粘贴屏蔽脚本.支持考试页面内获取百度搜索结果.
// @author       wjn & LengSword
// @match        *://examh5.zhihuishu.com/*
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// ==/UserScript==

/* jshint esversion: 6 */
(function() {
    'use strict';

    const _this = unsafeWindow;

    function main() {
        if(_this.jQuery) {
            const $ = _this.jQuery;

            document.oncontextmenu = null;
            document.onselectstart = null;
            document.oncopy = null;
            document.oncut = null;
            document.onpaste = null;

            const maxItemNum = 2;
            $(".examPaper_subject").each(function(){
                // console.log($(this).find(".subject_describe").text());
                let questionText_selector = $(this).find(".subject_describe");
                let questionText = questionText_selector.text().trim().replace(/（.*）/, "");

                let answerArray = $(this).find(".examquestions-answer").map(function(){
                    return $(this).text().trim();
                }).filter(function(){
                    return this != '对' && this != '错' && this != '正确' && this != '错误';
                }).get();
                //console.log(answerArray);
                for(let i = 0; i < answerArray.length + 1; i++) {

                    let answerText = answerArray[i] || questionText;

                    let requestText = answerText;
                    // 使用GM_xmlhttpRequest来对百度发起请求搜索关键字
                    if(answerText.length == 1) {
                        requestText = questionText;
                    }

                    GM_xmlhttpRequest({
                        method: "GET",
                        url: 'https://www.baidu.com/s?wd=' + requestText,
                        onload: function (XMLHttpRequest) {
                            let response = XMLHttpRequest.response;
                            questionText_selector.append("<h3>=====" + requestText + "=====</h3>");
                            // 列出前4条
                            for(let i = 1; i <= maxItemNum; i++) {
                                let resultTitle = $(response).find("#\\3"+ i + " > h3 > a").text();
                                let resultContent = $(response).find("#\\3"+ i + " > div .c-abstract").text() || $(response).find("#\\3"+ i + " > div.c-abstract").text();

                                questionText_selector.append("<p>" + resultContent + "</p>");
                            }
                        },
                        onerror: function (e) {
                            console.log(e);
                        }
                    });//end  GM_xmlhttpRequest
                }

            });
        }
    }

    setTimeout(main, 3000);

})();