// ==UserScript==
// @name         游侠客摄影网添加下载按钮
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.0.0
// @description  添加图片下载按钮
// @author       pana
// @include      http*://www.youxiake.net/album/*
// @grant        none
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.min.js
// @require      https://greasyfork.org/scripts/376157-downloadpic-js/code/downloadPicjs.js?version=658364
// ==/UserScript==

(function() {
	'use strict';
	const numReg = /[0-9]+$/i;

	function updateProgress(imgNum, percentComplete) {
		if ($("progress#progressId" + imgNum.toString()).length === 0) {
			let download_progress = '<progress max="100" class="downloadProgress" id="progressId' + imgNum.toString() + '" style="position: absolute; bottom: 0; width: 115px; height: 6px;"></progress>';
			$("span.ps-item").eq(imgNum - 1).css('position', 'relative').append(download_progress)
		}
		$("progress#progressId" + imgNum.toString()).attr('value', percentComplete)
	}
	function transferComplete(imgNum, allStatus) {
		if ($("progress#progressId" + imgNum.toString()).length === 0) {
			let download_progress = '<progress max="100" class="downloadProgress" id="progressId' + imgNum.toString() + '" style="position: absolute; bottom: 0; width: 115px; height: 6px;"></progress>';
			$("span.ps-item").eq(imgNum - 1).css('position', 'relative').append(download_progress)
		}
		$("progress#progressId" + imgNum.toString()).attr('value', 100);
		downloadPic.numberOfDownload.downloadCurrentNum++;
		$("b#progressBtn").text(downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum);
		if (allStatus === 1) {
			downloadPic.numberOfDownload.currentNum++;
			$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text + downloadPic.textDownload.startStr + downloadPic.numberOfDownload.currentNum + downloadPic.textDownload.divideStr + downloadPic.numberOfDownload.totalNum + downloadPic.textDownload.endStr);
			if (downloadPic.numberOfDownload.currentNum === downloadPic.numberOfDownload.totalNum) {
				$(downloadPic.downloadAllBtn.jQuerySelector).attr("title", downloadPic.downloadAllBtn.finishTitle)
			}
		}
	}
	function readFile() {
		let imgNum = numReg.exec($('span.ps-item.ps-selected').parent().attr('class'))[0];
		let imgSrc = $('div.image-wrap img').eq(imgNum - 1).attr('src');
		if ($("progress#progressId" + imgNum.toString()).length === 0) {
			let download_progress = '<progress max="100" class="downloadProgress" id="progressId' + imgNum.toString() + '" style="position: absolute; bottom: 0; width: 115px; height: 6px;"></progress>';
			$("span.ps-item").eq(imgNum - 1).css('position', 'relative').append(download_progress)
		}
		downloadPic.numberOfDownload.downloadTotalNum++;
		$("b#progressBtn").text(downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum);
		downloadPic.downloadFile(imgSrc, imgNum, 0, updateProgress, transferComplete, saveAs)
	}
	function readAllFile() {
		let totalAlbumImgGroup = $("div.image-wrap img");
		downloadPic.numberOfDownload.currentNum = 0;
		downloadPic.numberOfDownload.totalNum = totalAlbumImgGroup.length;
		$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text + downloadPic.textDownload.startStr + downloadPic.numberOfDownload.currentNum + downloadPic.textDownload.divideStr + downloadPic.numberOfDownload.totalNum + downloadPic.textDownload.endStr);
		let eachAlbumImgSrc;
		for (let i = 0; i < totalAlbumImgGroup.length; i++) {
			eachAlbumImgSrc = totalAlbumImgGroup.eq(i).attr('src');
			if ($("progress#progressId" + (i + 1).toString()).length === 0) {
				let download_progress = '<progress max="100" class="downloadProgress" id="progressId' + (i + 1).toString() + '" style="position: absolute; bottom: 0; width: 115px; height: 6px;"></progress>';
				$("span.ps-item").eq(i).css('position', 'relative').append(download_progress)
			}
			downloadPic.numberOfDownload.downloadTotalNum++;
			$("b#progressBtn").text(downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum);
			downloadPic.downloadFile(eachAlbumImgSrc, i + 1, 1, updateProgress, transferComplete, saveAs)
		}
	}
	function addDownloadBtn(container) {
		container.append(downloadPic.downloadBtn.tag);
		$(downloadPic.downloadBtn.jQuerySelector).text(downloadPic.downloadBtn.text).css({
			'color': '#333333',
			'background-color': '#ffc900',
			'display': 'block',
			'padding': '0 18px',
			'line-height': '28px',
			'border-radius': '6px',
			'text-decoration': 'none',
			'text-align': 'center',
			'left': '10px',
			'height': '28px',
			'font-size': '13px'
		}).on('click', function() {
			readFile()
		})
	}
	function addDownloadAllBtn(container) {
		container.append(downloadPic.downloadAllBtn.tag);
		$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text).css({
			'color': '#333333',
			'background-color': '#ffc900',
			'display': 'block',
			'padding': '0 18px',
			'line-height': '28px',
			'border-radius': '6px',
			'text-decoration': 'none',
			'text-align': 'center',
			'left': '10px',
			'height': '28px',
			'font-size': '13px',
			'margin-top': '15px'
		}).on('click', function() {
			readAllFile()
		})
	}
	function addProgressBtn(container) {
		let progress_btn = '<div id="divProgress"><b id="progressText">下载进度:</b><b id="progressBtn">' + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + '</b></div>';
		container.after(progress_btn);
		$("div#divProgress").css({
			'position': 'absolute',
			'display': 'block',
			'font-size': '15px',
			'color': '#47afeb',
			'left': '1600px',
			'height': '20px',
			'line-height': '20px',
			'margin-top': '18px'
		})
	}
	function imgPage() {
		if ($(downloadPic.downloadBtn.jQuerySelector).length === 0) {
			let aside_download = '<div class="aside-download bottom-line" style="position: relative; padding: 20px 0 20px 16px; line-height: 1;"></div>';
			$('div.aside-icon-box.bottom-line').after(aside_download);
			let asidejQ = $('div.aside-download.bottom-line');
			addDownloadBtn(asidejQ);
			addDownloadAllBtn(asidejQ);
			addProgressBtn($("div.me"))
		}
	}
	let observer = new MutationObserver(function() {
		imgPage()
	});
	let listenerContainer = document.querySelector("div.bgcolor-3");
	let option = {
		'childList': true,
		'subtree': true
	};
	observer.observe(listenerContainer, option)
})();