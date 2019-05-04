// ==UserScript== 
// @name remove_ad & difficulty frame
// @namespace https://bitcoinwisdom.com/
// @version 0.05
// @source https://greasyfork.org/ 
// @description This script remove annoying ad  & difficulty frame
// @include https://bitcoinwisdom.com/* 
// ==/UserScript==

var element = document.getElementById("leftbar_outer");
element.parentNode.removeChild(element);

function removeElementsByClass(mname){
var elements = document.getElementsByClassName(mname);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
removeElementsByClass("difficulty");
