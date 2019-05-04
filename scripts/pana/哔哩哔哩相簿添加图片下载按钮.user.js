// ==UserScript==
// @name         哔哩哔哩相簿添加图片下载按钮
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.0.0
// @description  添加图片下载按钮
// @author       pana
// @include      http*://h.bilibili.com/*
// @exclude      http*://h.bilibili.com/eden/*
// @exclude      http*://h.bilibili.com/d
// @exclude      http*://h.bilibili.com/p
// @grant        none
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.min.js
// @require      https://greasyfork.org/scripts/376157-downloadpic-js/code/downloadPicjs.js?version=658364
// ==/UserScript==

(function() {
	'use strict';

	function updateProgress(countNum, percentComplete) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.startStr + percentComplete + downloadPic.textDownload.percentEndStr)
	}
	function transferComplete(countNum, allStatus) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.finishStr).attr('title', downloadPic.downloadBtn.finishTitle);
		downloadPic.numberOfDownload.downloadCurrentNum++;
		$('b#progressBtn').text(downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum);
		if (allStatus === 1) {
			downloadPic.numberOfDownload.currentNum++;
			$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text + downloadPic.textDownload.startStr + downloadPic.numberOfDownload.currentNum + downloadPic.textDownload.divideStr + downloadPic.numberOfDownload.totalNum + downloadPic.textDownload.endStr);
			if (downloadPic.numberOfDownload.currentNum === downloadPic.numberOfDownload.totalNum) {
				$(downloadPic.downloadAllBtn.jQuerySelector).attr("title", downloadPic.downloadAllBtn.finishTitle)
			}
		}
	}
	function readFile(imgSrc, countNum, allStatus) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.dotStr);
		downloadPic.numberOfDownload.downloadTotalNum++;
		$("b#progressBtn").text(downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum);
		downloadPic.downloadFile(imgSrc, countNum, allStatus, updateProgress, transferComplete, saveAs)
	}
	function addDownloadBtn(container, countNum) {
		let imgSrc = container.attr('data-photo-imager-src');
		container.wrap("<div class='divImg' style='position: relative;'></div>");
		container.after(downloadPic.downloadBtn.tag);
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text).css({
			'display': 'table',
			'position': 'absolute',
			'top': '30px',
			'left': '30px',
			'border-radius': '4px',
			'text-align': 'center',
			'padding-left': '12px',
			'padding-right': '12px',
			'height': '28px',
			'color': '#fff',
			'font-size': '12px',
			'line-height': '28px',
			'background-color': 'rgba(0, 0, 0, 0.5)',
			'min-width': '72px'
		}).hover(function() {
			$(this).css({
				'background-color': 'rgba(0, 0, 0, 0.8)'
			})
		}, function() {
			$(this).css({
				'background-color': 'rgba(0, 0, 0, 0.5)'
			})
		}).on('click', function(event) {
			event.stopPropagation();
			readFile(imgSrc, countNum, 0)
		})
	}
	function addDownloadAllBtn(container) {
		container.append(downloadPic.downloadAllBtn.tag);
		$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text).css({
			'display': 'block',
			'height': '26px',
			'border': '1px solid #fb7299',
			'border-radius': '4px',
			'background-color': 'transparent',
			'color': '#fb7299',
			'box-sizing': 'border-box',
			'font-size': '18px',
			'text-align': 'center',
			'vertical-align': 'middle'
		}).hover(function() {
			$(this).css({
				'background-color': '#fb7299',
				'color': '#fff'
			})
		}, function() {
			$(this).css({
				'background-color': 'transparent',
				'color': '#fb7299'
			})
		}).on('click', function() {
			let totalWorkImgGroup = $('div.content div.images img');
			downloadPic.numberOfDownload.currentNum = 0;
			downloadPic.numberOfDownload.totalNum = totalWorkImgGroup.length;
			$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text + downloadPic.textDownload.startStr + downloadPic.numberOfDownload.currentNum + downloadPic.textDownload.divideStr + downloadPic.numberOfDownload.totalNum + downloadPic.textDownload.endStr);
			let eachWorkImgSrc;
			for (let j = 0; j < totalWorkImgGroup.length; j++) {
				eachWorkImgSrc = totalWorkImgGroup.eq(j).attr('data-photo-imager-src');
				readFile(eachWorkImgSrc, j, 1)
			}
		})
	}
	function addWorkProgressBtn(container) {
		let progress_btn = '<div id="divProgress">[下载进度:<b id="progressBtn">' + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + '</b>]</div>';
		container.append(progress_btn);
		$("div#divProgress").css({
			'margin-top': '20px',
			'font-size': '16px'
		})
	}
	function MainFunction() {
		let imgGroup = $('div.content div.images img');
		for (let i = 0; i < imgGroup.length; i++) {
			addDownloadBtn(imgGroup.eq(i), i)
		}
		let download_board = '<div class="download-board"></div>';
		$('div.dashboard').after(download_board);
		let downloadBoard = $('div.download-board');
		downloadBoard.css({
			'width': '277px',
			'height': '100px',
			'background-color': '#fff',
			'border': '1px solid #e3e8ec',
			'border-radius': '12px',
			'margin-bottom': '8px',
			'padding': '18px 24px',
			'box-sizing': 'border-box'
		});
		addDownloadAllBtn(downloadBoard);
		addWorkProgressBtn(downloadBoard)
	}
	let observer = new MutationObserver(function() {
		MainFunction()
	});
	let listenerContainer = document.querySelector("h1.article-title");
	let option = {
		'childList': true
	};
	observer.observe(listenerContainer, option)
})();