// ==UserScript==
// @name         阿里云日志库列表-跳转旧版
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://sls.console.aliyun.com/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle ( `
div[ui-view=projectDetail] table tbody tr.ng-scope td:first-child {
color:red;
cursor: pointer;
}
` );
(function() {
    'use strict';

    // Your code here...

    $('body').on('click','div[ui-view=projectDetail] table tbody tr.ng-scope td:first-child',function(){
        var projectMatch=/(?<=project\/).+(?=\/categoryList)/;
        var currenturl=window.location.href;
        var projectName=currenturl.match(projectMatch);
        //alert(projectName);
        if(projectName){
            var categoryName=$(this).children('span').text();
            var oldUrl='https://sls.console.aliyun.com/#/project/'+projectName+'/categoryList/detail/?categoryName='+categoryName;
            window.location=oldUrl;
        }

    });

})();