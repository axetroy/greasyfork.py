// ==UserScript==
// @name         福利吧论坛好孩子看得见
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.2.0
// @description  好孩子才看得见
// @author       pana
// @include      http*://www.wnflb19.com/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
	'use strict';
	const urlReg = /^https?:\/\/[\w\-.,@?^=%;:/~+#]*/;
	const prefixLink = {
		magnet: /^http:\/\/www\.wnflb19\.com\/magnet:\?xt=.*$/i
	};

	function addGoodBoy(container, linkArray, textArray) {
		let goodBoyBtn = '<div class="goodBoy"><p style="font-size: 15px; color: red">好孩子看得见：</p></div>';
		container.after(goodBoyBtn);
		let tempLink;
		if ((linkArray.length + textArray.length) === 0) {
			$('div.goodBoy p').append('无')
		}
		for (let i = 0; i < linkArray.length; i++) {
			tempLink = '<p><a style="font-size: 15px; color: blue;" target="_blank" href="' + linkArray[i] + '">' + linkArray[i] + '</a></p>';
			$('div.goodBoy').append(tempLink)
		}
		for (let j = 0; j < textArray.length; j++) {
			tempLink = '<p><a style="font-size: 15px; color: blue;" target="_blank" href="' + textArray[j] + '">' + textArray[j] + '</a></p>';
			$('div.goodBoy').append(tempLink)
		}
	}
	function managePrefix(inputLink) {
		return prefixLink.magnet.test(inputLink) ? inputLink.replace('http://www.wnflb19.com/', '') : inputLink
	}
	function manageRepeatArray(inputLinkArray) {
		let outputLinkArray = [];
		for (let i = 0, l = inputLinkArray.length; i < l; i++) {
			for (let j = i + 1; j < l; j++) {
				if (inputLinkArray[i] === inputLinkArray[j]) {
					++i;
					j = i
				}
			}
			outputLinkArray.push(inputLinkArray[i])
		}
		return outputLinkArray
	}
	function findLink(container) {
		let link = container.find('a').not($('div.aimg_tip a')).not($('img.zoom').parent().find('div a'));
		let tempArray = [];
		for (let i = 0; i < link.length; i++) {
			let imgTemp = link.eq(i).find('img');
			if (imgTemp.length !== 0) {
				if (imgTemp.attr('src') !== link.eq(i).attr('href')) {
					tempArray.push(managePrefix(link.eq(i).attr('href')))
				}
			} else if (link.eq(i).text() !== link.eq(i).attr('href')) {
				tempArray.push(managePrefix(link.eq(i).attr('href')))
			}
		}
		return manageRepeatArray(tempArray)
	}
	function displayText(container, oldTextColor, newTextColor) {
		let text = container.find('font');
		let tempArray = [];
		for (let i = 0; i < text.length; i++) {
			if (text.eq(i).css('color') === oldTextColor) {
				text.eq(i).css('color', newTextColor);
				if (urlReg.test(text.eq(i).text())) {
					tempArray.push(managePrefix(text.eq(i).text()))
				}
			}
		}
		return manageRepeatArray(tempArray)
	}
	function init() {
		let old_url = location.href;
		if ((old_url.indexOf('page=') === -1) || (old_url.indexOf('page=1') !== -1)) {
			let mainBtn = $('div.cm').eq(0);
			let tdBtn = $('td.t_f').eq(0);
			let textBtn = $('td.t_f:first');
			addGoodBoy(mainBtn, findLink(tdBtn), displayText(textBtn, 'rgb(255, 255, 255)', 'red'))
		}
	}
	init()
})();