// ==UserScript==
// @name         Bangumi 股市
// @namespace    https://github.com/bangumi/scripts/liaune
// @version      0.2
// @description  跳转到netaba.re查看条目排名涨跌情况
// @author       Liaune
// @include     /^https?://(bgm\.tv|chii\.in|bangumi\.tv)/*
// @grant        none
// ==/UserScript==
(function() {
    //首页添加查看当月涨跌榜链接

    $("#prgCatrgoryFilter").append('<li><a id="dailyRcmdBtn" href="https://netaba.re/trending">BGM股市</a></li>');

    //条目页面添加查看条目的排名，收藏等变化趋势链接
     if(window.location.href.match(/\/subject\/\d+/)){       
        let trending = 'https://netaba.re'+window.location.href.match(/\/subject\/\d+/)[0];
        $("#headerSubject").find("[class='navTabs clearit']").append("<li><a href="+trending+">行情走势</a></li>");
    }
})();