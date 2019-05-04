// ==UserScript==
// @namespace      https://greasyfork.org/users/10250
// @name           网页字体替换为微软雅黑+阴影
// @description    网页字体替换为微软雅黑并加入text-shadow
// @include        *:*
// @author         heartnn
// @homepage       https://www.heartnn.com/
// @supportURL     https://greasyfork.org/zh-CN/scripts/374194
// @version        1.02
// ==/UserScript==
(function() {
    function addStyle(rules) {
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        styleElement.appendChild(document.createTextNode(rules));
    }

    addStyle('* {font-family : -apple-system,"Merriweather","Noto Sans","Helvetica Neue",Helvetica,Arial,"PingFang SC","Hiragino Sans GB","Noto Sans CJK SC","Microsoft YaHei","Wenquanyi Micro Hei","WenQuanYi Zen Hei","ST Heiti",SimHei,"Open Sans",Inconsolata,genericons,iconfont,FontAwesome,sans-serif:not([gulim])}');
    addStyle('*:not([class*="bilibili-danmaku"]):not([style*="background: rgba"]){text-shadow: 0 0 0.01em rgba(0,0,0,0.5) !important;}');
})();