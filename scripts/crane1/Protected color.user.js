// ==UserScript==
// @name     Protected color
// @version  1
// @grant    none
// @namespace https://greasyfork.org/zh-CN/users/169070-crane1
// @description 添加文档保护色
// @include * 
// ==/UserScript==

window.setTimeout(function(){
  var bodyarray = document.getElementsByTagName("body")
  for(x in bodyarray){
  	 bodyarray[x].style.backgroundColor = "#CCE8CF";
  }
   
},60
)