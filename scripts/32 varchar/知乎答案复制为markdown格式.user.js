// ==UserScript==
// @name         知乎答案复制为markdown格式
// @namespace    https://github.com/nameldk/user-script
// @version      0.1
// @description  把知乎的答案复制为markdown格式
// @icon         https://pic1.zhimg.com/2e33f063f1bd9221df967219167b5de0_m.jpg
// @author       nameldk
// @match        https://www.zhihu.com/question/*
// @require      https://unpkg.com/turndown/dist/turndown.js
// @require      https://unpkg.com/jquery@3.3.1/dist/jquery.min.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let turndownService = new TurndownService();
    let isAnswerPage = window.location.href.match(/www.zhihu.com\/question\/\d+\/answer\/\d+/);

    function bind() {
        $('.List-item, .AnswerCard').each(function () {
            let $thisItem = $(this);
            let $btn = $('<button type="button" class="btn-html2md Button Button--blue" style=" position: absolute; right: 20px; top: 10px;">copy2md</button>');
            let $author = $thisItem.find(".AuthorInfo");
            if (isAnswerPage) {
                $btn.css({
                    "position": "relative",
                    "float": "right"
                });
            }
            $thisItem.prepend($btn);
            $btn.on("click", function () {
                let $rich = $thisItem.find(".RichContent-inner");
                if ($rich.length) {
                    let markdown = turndownService.turndown($rich.get(0));
                    markdown = markdown.replace(/<img.+?>/g, "");
                    markdown += "\n> 作者：" + $author.children('meta[itemprop="name"]').attr("content") || '';
                    markdown += '\n> 链接：' + $thisItem.find('meta[itemprop="url"][content*="/answer/"]').attr('content') || '';
                    // console.log(markdown);
                    if (copyToClipboard(markdown)) {
                        let $t = $('<div style="position: absolute;width: 80px;padding-top: 2px;height: 24px;right: 40%;background: #68af02;color: #fff;text-align: center;border-radius: 5px;margin-left: 300px;">复制成功</div>');
                        if (isAnswerPage) {
                            $t.css({
                                "margin-top": "10px",
                                "right": "auto",
                                "margin-top": "10px"
                            });
                        }
                        $thisItem.prepend($t);
                        setTimeout(function () {
                            $t.remove();
                        }, 1500);
                    } else {
                        console.error("操作失败");
                    }
                }
            });
        });
    }

    function copyToClipboard(text) {
        const input = document.createElement('textarea');
        input.style.position = 'fixed';
        input.style.opacity = 0;
        input.value = text;
        document.body.appendChild(input);
        input.select();
        let res = document.execCommand('Copy');
        document.body.removeChild(input);
        return res;
    }

    setTimeout(function () {
        bind();
    }, 1000);
})();