// ==UserScript==
// @name         显示lofter.com图片的原图网址
// @namespace    https://saber.love/?p=4073
// @version      0.1
// @description  在lofter.com的文章页，显示图片的原图网址，方便下载。
// @author       雪见仙尊 xuejianxianzun
// @match        *.lofter.com/post/*
// @icon 		http://ssf91.lofter.com/favicon.ico
// @run-at		document-end
// ==/UserScript==

'user strict';

let pic_urls = '';
let pic_elements = document.querySelectorAll('.imgclasstag');
if (pic_elements.length > 0) {
	for (const e of pic_elements) {
		pic_urls += e.getAttribute('bigimgsrc').split('?')[0] + '<br>';
	}
	pic_elements[0].parentNode.parentNode.parentNode.parentNode.insertAdjacentHTML('afterbegin', pic_urls);
}