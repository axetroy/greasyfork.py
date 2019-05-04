// ==UserScript==
// @name        鹿晗削除（便乘）
// @description  鹿晗削除（便乘）！
// @include     *://*.*
// @version 0.0.1.20171008134056
// @namespace https://greasyfork.org/users/76163
// ==/UserScript==

(function(){
    var strHTML=window.document.body.innerHTML;

    //用于匹配的正则表达式
    var strMatch={
        xz:/鹿晗/g,
        pn:/关晓彤/g
    };

    //用于替换的链接
    var strURL=[];
    strURL.xz="野兽先辈";
    strURL.pn="棒球";



    strHTML = strHTML.replace(strMatch.xz,strURL.xz);
    strHTML = strHTML.replace(strMatch.pn,strURL.pn);
    window.document.body.innerHTML=strHTML;
})();