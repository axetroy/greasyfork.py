// ==UserScript==
// @name     知乎去隐私政策浏览
// @version  1.0.3
// @grant    none
// @match  *://*.zhihu.com/*
// @require  http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @namespace https://greasyfork.org/users/182453
// @description 在不同意新的隐私获取政策前提下去掉强制的覆盖在页面的隐私政策协议，以便在不同意的前提下保证浏览以前的内容
// ==/UserScript==
(function(){
  
window.onload =
function(){
  $('.Modal-wrapper').remove();
  console.log('asdf');
  z = $("html");
  window.z=z;
  console.log(z);
  console.log(z[0].style);
  z[0].style.overflow = '';
  console.log(z);
};
  
})();
