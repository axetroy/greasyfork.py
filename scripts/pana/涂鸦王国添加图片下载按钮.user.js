// ==UserScript==
// @name         涂鸦王国添加图片下载按钮
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.1.1
// @description  添加图片下载按钮
// @author       pana
// @include      http*://www.gracg.com/works/view/*
// @grant        none
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.min.js
// @require      https://greasyfork.org/scripts/376157-downloadpic-js/code/downloadPicjs.js?version=658364
// ==/UserScript==

(function() {
	'use strict';
	const groupReg = /^[a-z:\-\/.]+\/[0-9a-z\/\-_]+\.(jpg|jpeg|png|bmp|gif)/i;

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
		container.wrap("<div class='divImg'></div>");
		container.parent().css({
			'position': 'relative'
		});
		let imgWidth = parseInt(container.css("width"));
		let parentWidth = parseInt($("div.workPage-images").css("width"));
		let btnWidth = (parentWidth - imgWidth) / 2 + 30;
		let btnWidthString = String(btnWidth) + "px";
		container.after(downloadPic.downloadBtn.tag);
		$(downloadPic.downloadBtn.jQuerySelector).eq(count).text(downloadPic.downloadBtn.text).css({
			'display': 'table',
			'position': 'absolute',
			'top': '30px',
			'left': btnWidthString,
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
			readFile(workImgSrc, count, 0)
		});
		container.on('load', function() {
			imgWidth = parseInt($(this).css("width"));
			parentWidth = parseInt($("div.workPage-images").css("width"));
			btnWidth = (parentWidth - imgWidth) / 2 + 30;
			btnWidthString = String(btnWidth) + "px";
			$(downloadPic.downloadBtn.jQuerySelector).eq(count).css({
				'left': btnWidthString
			})
		})
	}
	function addDownloadAllBtn(container) {
		container.after(downloadPic.downloadAllBtn.tag);
		$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text).css({
			'display': 'block',
			'position': 'absolute',
			'color': '#fff',
			'background-color': '#666',
			'padding': '5px',
			'font-size': '15px',
			'text-align': 'center',
			'border-radius': '2px',
			'margin-left': '1130px',
			'margin-top': '10px',
			'float': 'right',
			'min-width': '106px',
			'width': 'auto',
			'white-space': 'nowrap'
		}).on('click', function() {
			let totalWorkImgGroup = $("div.workPage-images img");
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
	function addWorkProgressBtn(container) {
		let progress_btn = '<div id="divProgress">[下载进度:<b id="progressBtn">' + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + '</b>]</div>';
		container.after(progress_btn);
		$("div#divProgress").css({
			'position': 'relative',
			'display': 'inline-block',
			'top': '14px',
			'margin-left': '20px',
			'font-size': '14px',
			'color': 'orange'
		})
	}
	let workImgGroup = $("div.workPage-images img");
	for (let i = 0; i < workImgGroup.length; i++) {
		addDownloadBtn(workImgGroup.eq(i), i, 1)
	}
	addDownloadAllBtn($("div.tit_wrapper div.toolbtns"));
	addWorkProgressBtn($("ul.menu"))
})();