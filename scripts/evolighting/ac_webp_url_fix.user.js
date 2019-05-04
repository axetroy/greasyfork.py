// ==UserScript==
// @name        ac_webp_url_fix
// @namespace   fishcan
// @description acfun webp url fix
// @include     http://www.acfun.cn/*
// @version     1.01
// ==/UserScript==
var all_img = document.getElementsByTagName("img")
for (var i=0;i<all_img.length;i++)
{
if (all_img[i].src.endsWith('.webp'))
  {
  all_img[i].src = all_img[i].src.slice(0,-4) + 'jpg'
  console.log("webp")
  }
}


