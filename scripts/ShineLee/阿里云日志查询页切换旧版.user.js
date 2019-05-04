// ==UserScript==
// @name         阿里云日志查询页切换旧版
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://sls.console.aliyun.com/*logsearch*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var projectMatch=/(?<=project\/).+(?=\/logsearch\/)/;
    var logMatch=/(?<=logsearch\/)[^?]+/i;
    var currenturl=window.location.href;
    var projectName=currenturl.match(projectMatch);
    var categoryName=currenturl.match(logMatch);
    if(projectName && categoryName){
        var oldUrl='https://sls.console.aliyun.com/#/project/'+projectName+'/categoryList/detail/?categoryName='+categoryName;
        var $link=$('<a>切换旧版</a>');
        $link.attr('href',oldUrl);

        $('.right div:first').prepend($link);

    }
    // Your code here...
})();