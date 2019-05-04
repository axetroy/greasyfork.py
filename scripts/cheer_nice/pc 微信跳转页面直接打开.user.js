// ==UserScript==
// @name        pc 微信跳转页面直接打开
// @namespace   https://greasyfork.org/zh-CN
// @version     2016.12.09
// @author      wangruijie
// @description pc上从微信打开taobao等页面 还要手动复制粘贴，表示不爽
// @include     https://support.weixin.qq.com/cgi-bin/mmsupport-bin/readtemplate*
// @grant       none
// @require http://cdn.bootcss.com/jquery/2.1.0/jquery.min.js
// ==/UserScript==

function run ()
{
    $url = $('div .url').text();
    console.info($url);
    window.location.href= $url;
}

run();