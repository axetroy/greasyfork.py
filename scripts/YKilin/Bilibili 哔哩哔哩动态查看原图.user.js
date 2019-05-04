// ==UserScript==
// @name         Bilibili 哔哩哔哩动态查看原图
// @icon         https://t.bilibili.com/favicon.ico
// @namespace    https://lolico.moe/
// @version      1.1
// @description  使哔哩哔哩动态可以查看原图以保存图片等，同时也支持空间中的动态
// @author       Jindai Kirin
// @match        https://t.bilibili.com/
// @match        https://space.bilibili.com/*/dynamic
// @license      GPL-3.0
// @grant        none
// @run-at       document-end
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function () {
	'use strict';

	let datav = {
		t: '0a8e5084',
		space: '2dd69243'
	};
	let domain = window.location.href.match(/(?<=\/\/)[^.]+/)[0];
	let origBtnHtml = `<li class="bp-v-middle orig-btn" data-v-${datav[domain]}><i data-v-${datav[domain]} class="bp-icon-font icon-ss-dynamic bp-v-middle"></i><span data-v-${datav[domain]}>查看原图</span></li>`;

	//添加按钮
	function setOrigBtn() {
		$('.imagesbox').each((i, ele) => {
			let $ele = $(ele);
			//完成标志
			if ($ele.hasClass('orig-done')) return;
			else $ele.addClass('orig-done');
			//按钮
			function removeBtn() {
				$ele.find('.orig-btn').remove();
				(function cardClick() {
					let $card = $ele.find('.card');
					if ($card.length === 0) {
						setTimeout(cardClick, 0);
						return;
					}
					$card.click(addBtn);
				})();
			}
			function addBtn() {
				let $bc = $ele.find('.boost-control');
				//等待DOM完成渲染
				if ($bc.length === 0) {
					setTimeout(addBtn, 0);
					return;
				}
				if ($bc.find('.orig-btn').length === 0) {
					$($bc.children()[1]).after(origBtnHtml);
					$bc.find('.orig-btn').click(() => {
						window.open($ele.find('.boost-img>img').attr('src').replace(/@.*/, ''));
					});
					$bc.find('.bp-v-middle:first').click(removeBtn);
					$ele.find('.boost-img').click(removeBtn);
				}
			}
			//点击监听事件
			$ele.find('.card').click(addBtn);
		});
	}

	let running = false;

	function run() {
		if (running) return;
		running = true;
		(function waitReady() {
			if ($('.imagesbox').length === 0) {
				setTimeout(waitReady, 100);
				return;
			}
			setOrigBtn();
			setTimeout(function () {
				running = false;
			}, 2000);
		})();
	}

	run();
	window.onscroll = run;
})();