// ==UserScript==
// @name         原创馆添加图片下载按钮
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.0.0
// @description  添加下载按钮
// @author       pana
// @include      http*://ycg.qq.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.min.js
// @require      https://greasyfork.org/scripts/376157-downloadpic-js/code/downloadPicjs.js?version=658364
// ==/UserScript==

(function() {
	'use strict';
	const groupReg = /^(http:|https:)?\/\/[0-9a-z\/\-_.]+\.(jpg|jpeg|png|bmp|gif)/i;

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
	function addDownloadBtn(container, count) {
		let workImgSrc = container.attr('src');
		workImgSrc = groupReg.exec(workImgSrc)[0];
		container.after(downloadPic.downloadBtn.tag);
		$(downloadPic.downloadBtn.jQuerySelector).eq(count).text(downloadPic.downloadBtn.text).css({
			'position': 'absolute',
			'top': '30px',
			'left': '30px',
			'display': 'block',
			'border-radius': '4px',
			'text-align': 'center',
			'vertical-align': 'middle',
			'zoom': '1',
			'padding-left': '12px',
			'padding-right': '12px',
			'height': '28px',
			'color': '#fff',
			'font-size': '12px',
			'line-height': '28px',
			'background-color': 'rgba(0, 0, 0, 0.5)'
		}).hover(function() {
			$(this).css({
				'background-color': 'rgba(0, 0, 0, 0.8)'
			})
		}, function() {
			$(this).css({
				'background-color': 'rgba(0, 0, 0, 0.5)'
			})
		}).on('click', function() {
			readFile(workImgSrc, count, 0)
		})
	}
	function addDownloadAllBtn(container) {
		container.after(downloadPic.downloadAllBtn.tag);
		$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text).css({
			'color': '#fff',
			'background-color': '#333',
			'width': '240px',
			'height': '40px',
			'font-size': '16px',
			'text-align': 'center',
			'line-height': '40px',
			'border-radius': '20px',
			'cursor': 'pointer',
			'display': 'block',
			'margin-top': '15px'
		}).hover(function() {
			$(this).css({
				'background-color': '#777777'
			})
		}, function() {
			$(this).css({
				'background-color': '#333'
			})
		}).on('click', function() {
			let totalWorkImgGroup = $("div._edit_pic img");
			downloadPic.numberOfDownload.currentNum = 0;
			downloadPic.numberOfDownload.totalNum = totalWorkImgGroup.length;
			$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text + downloadPic.textDownload.startStr + downloadPic.numberOfDownload.currentNum + downloadPic.textDownload.divideStr + downloadPic.numberOfDownload.totalNum + downloadPic.textDownload.endStr);
			let eachWorkImgSrc;
			for (let j = 0; j < totalWorkImgGroup.length; j++) {
				eachWorkImgSrc = totalWorkImgGroup.eq(j).attr('src');
				eachWorkImgSrc = groupReg.exec(eachWorkImgSrc)[0];
				readFile(eachWorkImgSrc, j, 1)
			}
		})
	}
	function mainPage() {
		let workImgGroup = $("div._edit_pic img");
		if ($(downloadPic.downloadBtn.jQuerySelector).length === 0) {
			for (let i = 0; i < workImgGroup.length; i++) {
				addDownloadBtn(workImgGroup.eq(i), i)
			}
		}
		if ($(downloadPic.downloadAllBtn.jQuerySelector).length === 0) {
			addDownloadAllBtn($("div#pc-detail div.container div.info-box div.click-likes"))
		}
		let progress_btn = '<div id="divProgress" style="margin-top: 15px;">[下载进度:<b id="progressBtn">' + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + '</b>]</div>';
		if ($("div#divProgress").length === 0) {
			$(downloadPic.downloadAllBtn.jQuerySelector).after(progress_btn)
		}
	}
	let observer = new MutationObserver(function() {
		mainPage()
	});
	let listenerContainer = document.querySelector("div#app");
	let option = {
		'childList': true,
		'subtree': true
	};
	observer.observe(listenerContainer, option)
})();