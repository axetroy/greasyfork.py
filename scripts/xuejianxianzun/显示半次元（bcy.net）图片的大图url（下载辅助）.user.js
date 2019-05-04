// ==UserScript==
// @name         显示半次元（bcy.net）图片的大图url（下载辅助）
// @namespace    http://www.saber.xn--6qq986b3xl/?p=3013
// @version      0.6
// @description  显示半次元图片的大图url，可以复制下来使用下载软件批量下载
// @author       雪见仙尊
// @match        https://bcy.net/*/detail/*
// @grant        none
// @run-at		document-end
// ==/UserScript==

/*
 *@作者：雪见仙尊
 *@博客：https://saber.love
 *@转载重用请保留此信息
 *@QQ群：562729095
 */

document.body.insertAdjacentHTML('beforeend', `<div id="shouUrl" style="position: fixed; right: 0px; top: 100px; padding: 15px 20px; background: rgb(46, 178, 234); color: rgb(255, 255, 255); border-radius: 5px; text-align: center; line-height: 24px; font-size: 16px; cursor: pointer;">显示大图url</div>`);
document.querySelector("#shouUrl").addEventListener("click", () => {
	let newW = window.open();
	document.querySelectorAll(".img-wrap img").forEach(el => {
		newW.document.write(/.*(\.jpg|\.jpeg|\.png)/.exec(el.src)[0].replace(/p\d.*banciyuan/, 'img-bcy-qn.pstatp.com') + '<br>');
	});
});