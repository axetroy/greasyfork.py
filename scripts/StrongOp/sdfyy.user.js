// ==UserScript==
// @namespace ATGT
// @name     sdfyy
// @description expand doctor list\
// test multiline description
// @version  1.1.1
// @match    http://fyy.sdfyy.cn/Dept/index?code*
// @match    http://fyy.sdfyy.cn/Dept/index/code*
// @grant    none
// @run-at   document-end
// ==/UserScript==

//alert("hello");
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
(function () {
  var mDoctor = document.querySelector(".m-doctor");
  var doctors = document.querySelector(".doctors");
  
  mDoctor.onmouseover();
  mDoctor.onmouseover = mDoctor.onmouseout = null;
  
  document.querySelector(".intro").style.height = "100%";
  mDoctor.style.overflow = "visible";
  mDoctor.style.height = "100%";
  doctors.style.width = "100%";
  doctors.style.height = "100%";
  
  document.querySelector(".doctor2").remove();
})();  
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
