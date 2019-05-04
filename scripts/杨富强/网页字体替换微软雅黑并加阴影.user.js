// ==UserScript==
// @name     网页字体替换微软雅黑并加阴影
// @namespace  star29
// @description 网页字体替换成微软雅黑并加上阴影
// @include        *:*
// @author        star29
// @homepage  
// @version       0.2
// ==/UserScript==
(function() {
    function addStyle(rules) {
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        styleElement.appendChild(document.createTextNode(rules));
    }
    addStyle('* {font-family : "Microsoft YaHei","iconfont","FontAwesome"}');
    addStyle('* {text-shadow : 0.01em 0.01em 0.01em #999999}');
})();