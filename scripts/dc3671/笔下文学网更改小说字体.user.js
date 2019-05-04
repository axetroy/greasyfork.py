// ==UserScript==
// @name        笔下文学网更改小说字体
// @namespace   https://greasyfork.org/
// @author      Dash Chen
// @include     http://www.bxwx.org/
// @version     1.0.1
// @description 修改笔下文学小说网站正文的字体
// @grant       none
// ==/UserScript==
(function() {
    var css = "#content{font-family: 方正启体简体,Tahoma,Verdana,Microsoft YaHei,sans-serif !important;font-size: 27px; letter-spacing: 0.2em; color:#555}";
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    }
})();
