// ==UserScript==
// @name         默认雅黑字体
// @version      1.3
// @description  修改默认字体为 微软雅黑（Microsoft YaHei）
// @author       QIQI
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @namespace https://greasyfork.org/users/16216
// ==/UserScript==
(function(){
    var prependChild = function(o,s){
        if(s.hasChildNodes()){
            s.insertBefore(o,s.firstChild);
        }else{
            s.appendChild(o);
        }
    };
    var element = document.createElement("link");
    element.rel="stylesheet";
    element.type="text/css";
    element.href="data:text/css,*{font-family:\"Microsoft YaHei\"}";
    if(window.location.href=="http://tool.chinaz.com/regex" || window.location.href=="http://tool.chinaz.com/regex/"){
        element.href+=" #inputText,#inputBg,#searchText,#searchBg,#inputBg *,#searchBg *{font: 100% \"courier new\",monospace;}";
    }else if(window.location.hostname=="tv.daoapp.io" && window.location.search.indexOf("?editor/edit")!=-1){
        element.href+=" .edit_body *{ font-family: Consolas, \"Liberation Mono\", Menlo, Courier, monospace !important;}";
    }
    prependChild(element,document.documentElement);
})();