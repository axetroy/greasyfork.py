// ==UserScript==
// @name        SinaRemoveSpam
// @namespace   SinaRemoveSpam
// @description Remove spam <spans> in sina news
// @include     http://*.sina.com.cn/*.shtml
// @version     1
// @grant       none
// ==/UserScript==

var artibody = document.getElementById('artibody');
var pattern = new RegExp("\\.\\w+{background-color:#FFFFFF");
var className = pattern.exec(artibody.innerHTML)[0].match(/\w+/);

var nodeList = document.getElementsByClassName(className);

for (i=0; i<nodeList.length; i++){
    nodeList[i].innerHTML = '';
}
