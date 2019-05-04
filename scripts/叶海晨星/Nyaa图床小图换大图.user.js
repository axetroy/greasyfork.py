// ==UserScript==
// @name         Nyaa图床小图换大图
// @namespace    Nyaa_叶海晨星
// @version      0.2.2
// @description  Nyaa宽屏去广告,部分图床小图换大图
// @author       叶海晨星
// @match        *://*.nyaa.se/*
// @run-at       document-body
// @icon         https://files.nyaa.se/favicon.png
// @require      http://code.jquery.com/jquery-1.x-git.min.js
// ==/UserScript==
//匹配列表
var debugmode = true;
var matchlist = {};
matchlist['undefined'] = {small: "/small/", big: "/big/"};

//从Url中获取域名
function gethost(url) {
    var ref = url.match("://(.*?)/");
    if (debugmode) {
        console.log("========== gethost ==========");
        console.log("url:" + url );
        console.log("ref:" + ref );
        console.log("=============================");
    }
    if (ref !== null && ref.length == 2) {
        return ref[1];
    }
    return undefined;
}
//将小图网址换成大图网址
function small2big(url) {
    var host = gethost(url);

    if (matchlist[host] === undefined) {
        host = "undefined";
    }
    var bigurl=url.replace(matchlist[host].small, matchlist[host].big);
    if (debugmode) {
        console.log("========== small2big ==========");
        console.log("host:" + host );
        console.log("bigurl:" + bigurl );
        console.log("===============================");
    }
    if (bigurl == url){
        return  null;
    }
    return bigurl;
}
//移除广告
$("div#main div:not([class])").remove();
//设置宽屏
$("div.content").css("width", "100%");
//遍历获取图片
$(".viewdescription a img").each(function (index) {
    var smallurl = $(this).attr("src");
    var bigurl = small2big(smallurl);

    if (debugmode) {
        console.log("========== img " + index + " ==========");
        console.log("smallurl:" + smallurl );
        console.log("bigurl:" + bigurl );
        console.log("==========================");
    }
    if (bigurl !== null){
        $(this).attr("src", bigurl);
        $(this).css("width","100%");
    }

});