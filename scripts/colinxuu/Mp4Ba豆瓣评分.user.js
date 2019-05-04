// ==UserScript==
// @name          Mp4Ba豆瓣评分
// @description   Mp4Ba网站添加豆瓣评分
// @namespace     colinxuu
// @run-at        document-end
// @grant         GM_xmlhttpRequest
// @grant         GM_addStyle
// @include       http://www.mp4ba.com/?*
// @include       http://www.mp4ba.com/index.php?*
// @include       http://www.mp4ba.com/
// @include       http://www.mp4ba.com/index.php
// @require       https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @version       1.4.1
// ==/UserScript==


var href = window.location.host;
var para = window.location.search;
var mpba = "www.mp4ba.com";
var dbapi = "https://api.douban.com/v2/movie/search?q=";
var detail_pattern = /\?m=vod-detail.+/;
var list_pattern = /\?m=vod-type.+/;
var search_pattern = /\?m=vod-search.+/;
var storage = window.localStorage;

var xhr = function (url, cb) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function (result) {
            var json = eval('(' + result.responseText + ')');
            var url = json.subjects[0].alt;
            var average = json.subjects[0].rating.average;
            cb(url, average);
        },
        onerror: function (e) {
            console.log(e);
        }
    });
};


var xhri = function (url, iw, cb) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function (result) {
            var json = eval('(' + result.responseText + ')');
            var url = json.subjects[0].alt;
            var average = json.subjects[0].rating.average;
            var iiw = iw;
            cb(url, average, iiw);
        },
        onerror: function (e) {
            console.log(e);
        }
    });
};


function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


function getone(href) {
    var title = document.title;
    var arr = new Array();
    arr = title.replace("《", '').split(".");
    var name = arr[0];
    var fullurl = dbapi + name;
    var local = storage.getItem(name);
    var target, newElement;
    target = document.getElementById('download').parentNode;
    newElement = document.createElement('p');
    newElement.className = 'douban';
    if (!local) {
        console.log('use net');
        xhr(fullurl, function (url, average) {
            storage.setItem(name, average + '-' + url);
            newElement.innerHTML = '<img src="https://img3.doubanio.com/favicon.ico" style="width:16px;height:16px;"/><a target="_blank" href="' + url + '">豆瓣详情 ' + average + '分</a>';
            target.parentNode.insertBefore(newElement, target.nextSibling);
        });
    } else {
        console.log('use local');
        var rating = local.split('-');
        var url = rating[1];
        var average = rating[0];
        newElement.innerHTML = '<img src="https://img3.doubanio.com/favicon.ico" style="width:16px;height:14px;"/><a target="_blank" href="' + url + '">豆瓣详情 ' + average + '分</a>';
        target.parentNode.insertBefore(newElement, target.nextSibling);
    }

    addStyle('.douban a{margin-left: 6px;font-size:12px;}.douban img{line-height:16px;}');

};


function keepclosure(fullurl, i, name) {
    var doubanRating;
    var local = storage.getItem(name);
    doubanRating = i.parentNode.parentNode.getElementsByTagName("td");
    if (!local) {
        console.log('use net');
        xhri(fullurl, i, function (url, average, iw) {
            storage.setItem(name, average + '-' + url);
            doubanRating[6].innerHTML = '<a target="_blank" href="' + url + '">豆瓣 ' + average + '分</a>';
        });
    } else {
        console.log('use local');
        var rating = local.split('-');
        var url = rating[1];
        var average = rating[0];
        doubanRating[6].innerHTML = '<a target="_blank" href="' + url + '">豆瓣 ' + average + '分</a>';
    }

}


function getall(href) {
    $('.l8').text('豆瓣');
    var eles = document.getElementById("data_list").getElementsByTagName("a");
    for (var i = 0; i < eles.length; i++) {
        var el = eles[i];
        if (detail_pattern.test(el.href)) {
            var name = el.text.split('.')[0].trim();
            var fullurl = dbapi + name;
            keepclosure(fullurl, el, name);
        }
    }
}


function getDownUrl(){
    var magent_target=document.getElementsByClassName("at-do");
    var thunder_target=document.getElementById("s3p0");
    var down_target=document.getElementById("download").parentElement.nextElementSibling;
    if(thunder_target){
        var thunder=thunder_target.firstChild.href;
        var down_btn_2=document.createElement('li');
        down_btn_2.innerHTML='<a href="'+thunder+'">迅雷下载</a>';
        down_target.insertBefore(down_btn_2,down_target.firstElementChild);
    }
    if(magent_target.length!=0){
        var magent=magent_target[0].href;
        var down_btn_1=document.createElement('li');
        down_btn_1.innerHTML='<a href="'+magent+'">磁力链接</a>';
        down_target.insertBefore(down_btn_1,down_target.firstElementChild);
    }
}


if (href == mpba && !(detail_pattern.test(para))) {
    getall(href);
}
else {
    addStyle('body{font-size:12px}');
    getDownUrl();
    getone(href);
}