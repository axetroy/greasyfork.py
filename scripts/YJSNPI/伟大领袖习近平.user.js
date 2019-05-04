// ==UserScript==
// @name         伟大领袖习近平
// @namespace    http://www.gov.cn/
// @version      0.2.2
// @description  全面贯彻落实习近平新时代中国特色社会主义理论体系
// @author       Anonymous
// @match        https://*/*
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var xuexi = function() {
        var validedTagNames = [
            "p",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "code",
            "a",
            "strong",
            "em",
            "b",
            "i",
            "div",
            "span"
        ];
        for (var i = 0; i < validedTagNames.length; i++) {
            validedTagNames[i] = validedTagNames[i].toUpperCase();
        }
        var tmpNodes = document.all;
        var nodes = [];
        for (var i = 0; i < tmpNodes.length; i++) {
            var node = tmpNodes[i];
            nodes[i] = node;
        }
        tmpNodes = null;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (!checkNode(node)) { continue; }
            node.innerHTML = node.innerHTML.replace(/习近平/g, '<b style="font-size:150%;background-color:#fff;color:red">习近平</b>');
        }

        function checkNode(node) {
            if (node.tagName == 'script') { return false; }
            for (var i = 0; i < validedTagNames.length; i++) {
                if (node.tagName == validedTagNames[i]) {
                    if (node.innerHTML.indexOf("<") != -1) { return false; }
                    return true;
                }
            }
            return false;
        }
    }

    xuexi();
    //setTimeout('xuexi()', 2200);
})();