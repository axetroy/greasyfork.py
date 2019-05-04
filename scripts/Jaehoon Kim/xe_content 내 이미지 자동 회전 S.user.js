// ==UserScript==
// @name     xe_content 내 이미지 자동 회전 S
// @version  1.1R
// @author	리드(https://www.suyongso.com/)
// @include   https://www.suyongso.com/*
// @grant    GM_addStyle
// @run-at	document-end
// @description image의 style로 exif 회전 정보 반영
// @namespace https://greasyfork.org/users/226807
// ==/UserScript==

var xeImages = document.querySelectorAll(".xe_content img");
var nmt;

for (nmt = 0; nmt < xeImages.length; nmt++) {
   //alert(aaa.length);

   // style.image-oriention 이거 아니고 style.imageOrientation임.
   xeImages[nmt].style.imageOrientation = "from-image";  
} 