// ==UserScript==
// @name         GoogleFullSearchButton
// @name:zh-CN   谷歌全面搜索按钮
// @namespace    http://www.coofly.com/
// @version      1.4
// @description  Add to the Google Full Search button.
// @description:zh-cn 给Google添加上全面搜索按钮，点击后可以关闭不良信息过滤。
// @author       Coofly
// @match        http://tampermonkey.net/scripts.php
// @include      /^https?://.+\.google\..+/.*$/
// @exclude      https://plus.google.*/*
// @exclude      http://plus.google.*/*
// @grant        none
// ==/UserScript==

(function(){
    var intervalId = -1;
    var waitTime = 0;
    console.log('GoogleFullSearchButton执行, url = ' + location.href);
    
    function InsertButton(abCtls)
    {
        var targetUrl = '';
        var btnClass = '';
        var btnTitle = '';
        if (location.href.indexOf('&safe=off') >= 0)
        {
            targetUrl = location.href.replace('&safe=off', '');
            btnClass = 'ab_button selected';
            btnTitle = '取消全面搜索'
        }
        else
        {
            targetUrl = location.href + '&safe=off';
            btnClass = 'ab_button';
            btnTitle = '全面搜索'
        }
        console.log('targetUrl = ' + targetUrl);
        var buttonHtml = '<li class="ab_ctl" id="full_search_btn"><a href="' + targetUrl + '" class="' + btnClass + '">' + btnTitle + '</a></li>';
        abCtls.insertAdjacentHTML('afterbegin', buttonHtml);
    }
    
    function CheckAndInsert ()
    {
        var abCtls = document.getElementById('ab_ctls');
        if (null === abCtls) return;

        var fullSearchElem = document.getElementById('full_search_btn');
        if (null === fullSearchElem) InsertButton(abCtls);      
    }
    
    var abCtls = document.getElementById('ab_ctls');
    if(null === abCtls)
    {
        intervalId = setInterval(CheckAndInsert, 200);
        console.log('intervalId = ' + intervalId);
        return;
    }
    else
    {
        CheckAndInsert();
    }
})();