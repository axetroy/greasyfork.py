// ==UserScript==
// @name        教务管理系统增强
// @namespace   no1xsyzy
// @description 修改现代教务管理系统
// @include     /^http://jwc1\.usst\.edu\.cn/xsjxpj\.aspx\?.+$/
// @version     1
// @grant       none
// ==/UserScript==

console.log("HackJWC1 starts");
auto=document.createElement("a");
auto.innerHTML="Auto fill";
auto.setAttribute("href","#");
auto.setAttribute("onclick","se=$('div#divJs select');se.each(function(e){se[e].value='良好';});se[0].value='优秀';");
document.getElementsByTagName("body")[0].appendChild(auto);
console.log("HackJWC1 complete");