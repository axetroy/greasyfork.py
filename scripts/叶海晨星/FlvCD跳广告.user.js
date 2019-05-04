// ==UserScript==
// @name         FlvCD跳广告
// @namespace    FlvCD_叶海晨星
// @version      0.02
// @description  跳过FlvCD解析观看广告的页面
// @author       叶海晨星
// @include      *://www.flvcd.com/parse.php*
// @icon         http://www.flvcd.com/favicon.ico
// ==/UserScript==
if (!document.location.href.match("&Go=1&go=1")){
    document.location.href=document.location.href + "&Go=1&go=1";
}