// ==UserScript==
// @name css-巴哈姆特文章列表廣告欄位刪除
// @namespace http://tampermonkey.net/
// @version 1.0.0
// @description BAHA NO AD
// @author MinoRaiNy
// @include https://forum.gamer.com.tw*
// @match http://*/*
// @grant none
// ==/UserScript==

(function() {
'use strict';
var elements = document.getElementsByClassName("b-list_ad");
while(elements.length > 0)
{
    elements[0].parentNode.removeChild(elements[0]);
}
})();