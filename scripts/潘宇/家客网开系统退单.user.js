// ==UserScript==
// @name         家客网开系统退单
// @namespace    [url=mailto:552397723@qq.com]552397723@qq.com[/url]
// @version      0.2.1
// @description [四川移动][家客网开][自动退单]
// @author       潘宇_QQ552397723_TEL18380123411
// @match        http://10.101.58.238:8130/om/plugins/main/index/login.ilf
/*关闭页面 */
// @run-at       document-start
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';
(function() {
    'use strict';
     setTimeout(function () {
    document.getElementsByTagName("iframe")[0].contentDocument.getElementsByClassName("iconfont icon-gongdandiaozheng")[0].click()
    setInterval(function () {
         setTimeout(function () {
               document.getElementsByTagName("iframe")[0].contentDocument.getElementsByClassName("app-frame")[0].contentDocument.getElementsByClassName("col-md-12 app-grid-title ng-binding")[0].click()
               setTimeout(function () {
               document.getElementsByTagName("iframe")[0].contentDocument.getElementsByClassName("app-frame")[0].contentDocument.getElementsByTagName("iframe")[0].contentDocument.getElementsByClassName("btn btn-info btn-flow")[0].click();
            },1000);
         },2000);
    },3000);
     },1000);
    // Your code here...
})();