// ==UserScript==
// @name         创意审核-商品绑笔记快捷键
// @namespace    hotkey
// @version      1.1
// @description  小红书笔记审核快捷
// @author       myxw94
// @match        https://noah.xiaohongshu.com/noah/bound_approve/note/*
// @grant        none
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function() {
    /*

highlight v5

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/

    jQuery.fn.highlight = function(pat) {
        function innerHighlight(node, pat) {
            var skip = 0;
            if (node.nodeType == 3) {
                var pos = node.data.toUpperCase().indexOf(pat);
                pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
                if (pos >= 0) {
                    var spannode = document.createElement('span');
                    spannode.className = 'highlight';
                    var middlebit = node.splitText(pos);
                    var endbit = middlebit.splitText(pat.length);
                    var middleclone = middlebit.cloneNode(true);
                    spannode.appendChild(middleclone);
                    middlebit.parentNode.replaceChild(spannode, middlebit);
                    skip = 1;
                }
            } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                for (var i = 0; i < node.childNodes.length; ++i) {
                    i += innerHighlight(node.childNodes[i], pat);
                }
            }
            return skip;
        }
        return this.length && pat && pat.length ? this.each(function() {
            innerHighlight(this, pat.toUpperCase());
        }) : this;
    };

    jQuery.fn.removeHighlight = function() {
        return this.find("span.highlight").each(function() {
            this.parentNode.firstChild.nodeName;
            with(this.parentNode) {
                replaceChild(this.firstChild, this);
                normalize();
            }
        }).end();
    };

    function copy(text) //复制函数
    {
        var oInput = document.createElement('input');
        oInput.value = text;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        //alert('复制成功:' + text);
    }

    function getSelectText() //获取选中的文字
    {
        return window.getSelection ? window.getSelection().toString() : document.selection.createRange().text;
    }
    document.onkeydown = function(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 67) { // 按c
            //  alert("press c");
            //copy($(".item-info--name").text().split(" ")[6]) //复制 第一个关键字
            // document.execCommand("Copy")//执行复制
            //$('body').highlight($(".item-info--name").text().split(" ")[6]);
            $('body').removeHighlight().highlight(getSelectText());
            $(".highlight").css("background-color", "yellow") //先设置高颜色
        }
        if (e && e.keyCode == 88) { // 按X
            //alert("press X");
            window.setTimeout(function() {
                $(".yam-btn.--danger").click();
            },
            500); //延迟半秒点拒绝过按钮
        }
        if (e && e.keyCode == 86) { // 按V
            alert("暂无功能!");
        }
        if (e && e.keyCode == 32) { // 按空格
            // alert("press Space");
            window.setTimeout(function() {
                $(".yam-btn.--primary").click();
            },
            500); //延迟半秒点击通过按钮
        }
        if (e && e.keyCode == 72) { // 按H的打开帮助
            alert("-----------------笔记审核快捷说明-----------------\n C    选中文字后按C并高亮关键词,再次按C 取消高亮 \n X    拒绝商品\n V    暂无其他功能 \n H   打开帮助 \n 空格[SPACE]    通过审核 \n 注意:输入文字时请调整汉字输入模式,否则会触发功能!");

        }
    };

})();