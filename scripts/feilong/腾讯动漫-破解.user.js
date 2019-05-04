// ==UserScript==
// @name         腾讯动漫-破解
// @version      4.0.7
// @description  腾讯动漫免费看，共享收费动漫。
// @author      feilong
// @match        http://ac.qq.com/ComicView/index/id/*
// @match        http://m.ac.qq.com/chapter/index/id/*
// @grant        none
// @namespace    https://greasyfork.org/users/28687
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...
// 下脚本来自http://www.xker.com/page/e2015/07/212347.html
//
//document.write("<script src=\"https://code.csdn.net/snippets/1576913/master/PC_tencent_image_look.js/raw\"></script>");

//以上脚本失效
//以下脚本自己写的。。。
//服务器是daocloud免费货，凑活用吧。。
//虽然只用js也可以弄，但是数据是别人的，为了保护一下，弄了个php
var mid = location.pathname.match(/\d+/)[0];
var cid = location.pathname.match(/\d+$/)[0];

//base64
//抄自https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

/*
下面那行解析get参数的，(ctrl+c的时候就自带了版权声明...)
作者： 夏日星星 
链接：http://www.imooc.com/article/3096
来源：慕课网
*/
function getQueryString(name) { var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); var r = window.location.search.substr(1).match(reg); if (r != null) { return unescape(r[2]); } return null; }


console.log("mid=" + mid + ",cid=" + cid);
//alert(DATA.picture.length);
//if (DATA.picture.length <= 1)
if (DATA.chapter.canRead !== true) {
    if (getQueryString("nocrack") != "1") {
        console.log('need crack!');
        //top.location.href = "http://feilongf-tx.daoapp.io/?mid="+mid+"&cid="+cid;
        //top.location.href = "http://txcomic.tk:32772/?mid="+mid+"&cid="+cid;//免费12月的域名竟然要收费了
        top.location.href = "http://172.99.77.88:32772/?mid=" + mid + "&cid=" + cid;
    }
} else {
    console.log('comic load success!');
    var xml = new XMLHttpRequest();
    xml.open('POST', 'http://172.99.77.88:32772/save.php', true);
    //xml.open('POST', 'http://localhost/save.php', true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.send("data=" + b64EncodeUnicode(JSON.stringify(DATA)).replace(/\+/g, "%2B"));
}

function goNext() {
    location.href = "http://ac.qq.com/ComicView/index/id/" + (DATA.comic.id) + "/cid/" + (DATA.chapter.nextCid) + "?fromPrev=1";
}

//自动翻页
if (!true) {
    if (DATA.chapter.nextCid == 0) {
        alert("finish");
    } else {
        console.log('load next');
        //location.href="http://ac.qq.com/ComicView/index/id/"+(DATA.comic.id)+"/cid/"+(DATA.chapter.nextCid)+"?fromPrev=1";
        //window.open("http://ac.qq.com/ComicView/index/id/"+(DATA.comic.id)+"/cid/"+(DATA.chapter.nextCid)+"?fromPrev=1");
        //window.close();
        setTimeout(goNext, 2000);
    }
}