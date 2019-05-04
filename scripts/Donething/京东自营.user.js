// ==UserScript==
// @name         京东自营
// @namespace    http://donething.net/
// @version      0.1
// @description  京东只搜索自营商品
// @author       Donething
// @match        https://search.jd.com/Search*
// @grant        none
// @run-at       document-start

// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var href = location.href;

    // 将URL中?后的字符串打散为键值对的
    var searchObj = parseQueryString(href);
    // 搜索词已包含“自营”，退出
    if(searchObj.keyword.indexOf("自营") >= 0){
        return
    }

    // 搜索词后添加" 自营"，并编码
    searchObj.keyword = encodeURIComponent(searchObj.keyword + " 自营");

    // 将path和搜索合并为URL
    var hostPath = href.substring(0,href.indexOf("?"));
    var url = createURL(hostPath, searchObj);

    // 跳转
    window.location.href = url;
})();

// 解析url 拿到参数对象
// https://blog.csdn.net/candy_yl/article/details/79501161
function parseQueryString(url) {
    var result = {};
    if (url.indexOf('?') > -1) {
        var str = url.split('?')[1];
        var temp = str.split('&');
        for (var i = 0; i < temp.length; i++) {
            var temp2 = temp[i].split('=');
            result[decodeURIComponent(temp2[0])] = decodeURIComponent(temp2[1]);
        }
    }
    return result;
}

// 将一个对象拼接在url的后面
// https://blog.csdn.net/candy_yl/article/details/79501161
function createURL(url, param) {
    var urlLink = "";
    var tmp = "";
    for(var key in param){
        tmp = "&" + key + "=" + param[key]
        urlLink += tmp;
    }
    urlLink = url + "?" + urlLink.substr(1);
    return urlLink.replace(' ', '');
}