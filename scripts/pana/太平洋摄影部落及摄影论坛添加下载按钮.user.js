// ==UserScript==
// @name         太平洋摄影部落及摄影论坛添加下载按钮
// @namespace    http://tampermonkey.net/
// @homepage     https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.9.0
// @description  添加下载原图按钮及下载全部原图按钮
// @author       pana
// @include      http*://*.pconline.com.cn/photo*
// @include      http*://*.pconline.com.cn/dc*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.min.js
// @require      https://greasyfork.org/scripts/376157-downloadpic-js/code/downloadPicjs.js?version=658364
// ==/UserScript==

(function() {
	'use strict';
	const old_url = location.href;
	const pconlineValue = {
		reg: /\/\/img.pconline.com.cn\/images\/[\S]+\.(jpg|jpeg|png|bmp|gif)/i,
		switchReg: /_[^_]+\.(jpg|jpeg|png|bmp|gif)$/i,
		switchNowReg: /_[^_]+\./i
	};

	function getTrueUrl(imgSrc) {
		imgSrc = pconlineValue.reg.exec(imgSrc)[0];
		let imgSwitchSrc = pconlineValue.switchReg.exec(imgSrc)[0];
		imgSwitchSrc = pconlineValue.switchNowReg.exec(imgSwitchSrc)[0];
		return imgSrc.replace(imgSwitchSrc, ".")
	}
	function updateProgress(countNum, percentComplete) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.startStr + percentComplete + downloadPic.textDownload.percentEndStr)
	}
	function transferComplete(countNum, allStatus) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.finishStr).attr('title', downloadPic.downloadBtn.finishTitle);
		downloadPic.numberOfDownload.downloadCurrentNum++;
		$('p#progressBtn').text(downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum);
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
		$("p#progressBtn").text(downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum);
		imgSrc = imgSrc + '?show';
		downloadPic.downloadFile(imgSrc, countNum, allStatus, updateProgress, transferComplete, saveAs)
	}
	function addDownloadBtn(container, count) {
		let imgSrc = container.attr('oImg');
		container.parent().after('<td>' + downloadPic.downloadBtn.tag + '</td>>');
		$(downloadPic.downloadBtn.jQuerySelector).eq(count).text(downloadPic.downloadBtn.text).css({
			'color': '#47afeb',
			'margin-left': '16px',
			'padding-left': '16px',
			'display': 'inline',
			'height': '16px',
			'background-image': 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik05MjQuNywxMEg3NS4zQzM5LjIsMTAsMTAsMzkuMiwxMCw3NS4zdjg0OS4zYzAsMzYuMSwyOS4yLDY1LjMsNjUuMyw2NS4zaDg0OS4zYzM2LjEsMCw2NS4zLTI5LjIsNjUuMy02NS4zVjc1LjNDOTkwLDM5LjIsOTYwLjcsMTAsOTI0LjcsMTB6IE05NTcuMyw5MDguM2MwLDI3LjEtMjEuOSw0OS00OSw0OUg5MS43Yy0yNy4xLDAtNDktMjEuOS00OS00OVY5MS43YzAtMjcuMSwyMS45LTQ5LDQ5LTQ5aDgxNi43YzI3LjEsMCw0OSwyMS45LDQ5LDQ5VjkwOC4zeiIgc3R5bGU9ImZpbGw6IzgxODE4MSI+PC9wYXRoPjxwYXRoIGQ9Ik02MzAuOSw0MzQuN2gtOTguMlYyNzEuM2gtNjUuM3YxNjMuM2gtOTguMkw1MDAsNTY1LjVMNjMwLjksNDM0Ljd6IiBzdHlsZT0iZmlsbDojODE4MTgxIj48L3BhdGg+PHBhdGggZD0iTTY2My4zLDY2My4zSDMzNi43VjU5OGgtNjUuM3Y2NS4zdjY1LjNoNDU3LjN2LTY1LjNWNTk4aC02NS4zVjY2My4zeiIgc3R5bGU9ImZpbGw6IzgxODE4MSI+PC9wYXRoPjwvZz48L3N2Zz4gIA==)',
			'background-repeat': 'no-repeat',
			'background-position': '0 3px',
			'background-size': '12px'
		}).hover(function() {
			$(this).css({
				'color': '#f60'
			})
		}, function() {
			$(this).css({
				'color': '#47afeb'
			})
		}).on('click', function() {
			readFile(imgSrc, count, 0)
		})
	}
	function addDownloadAllBtn(container) {
		container.after(' | ' + downloadPic.downloadAllBtn.tag);
		$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text).css({
			'color': '#47afeb',
			'font-size': '12px',
			'display': 'inline-block'
		}).hover(function() {
			$(this).css({
				'color': '#f60'
			})
		}, function() {
			$(this).css({
				'color': '#47afeb'
			})
		}).on('click', function() {
			let imgGroup = $(".aView");
			downloadPic.numberOfDownload.currentNum = 0;
			downloadPic.numberOfDownload.totalNum = imgGroup.length;
			$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text + downloadPic.textDownload.startStr + downloadPic.numberOfDownload.currentNum + downloadPic.textDownload.divideStr + downloadPic.numberOfDownload.totalNum + downloadPic.textDownload.endStr);
			let eachImgSrc;
			for (let i = 0; i < imgGroup.length; i++) {
				eachImgSrc = imgGroup.eq(i).attr('oImg');
				readFile(eachImgSrc, i, 1)
			}
		})
	}
	function addProgressBtn(container) {
		let progressBtn = '<div id="divProgress"><p id="progressText">进度:</p><p id="progressBtn">' + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + '</p></div>';
		container.after(progressBtn);
		$("div#divProgress").css({
			'position': 'fixed',
			'display': 'block',
			'margin-left': '525px',
			'left': '50%',
			'bottom': '5px',
			'font-size': '14px',
			'color': '#47afeb',
			'z-index': '9999'
		})
	}
	function bbsPhotoTransferComplete(countNum) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.finishStr).attr('title', downloadPic.downloadBtn.finishTitle)
	}
	function addBbsPhotoDownloadBtn(container) {
		let imgSrc = container.attr('href');
		imgSrc = getTrueUrl(imgSrc);
		container.before(downloadPic.downloadBtn.tag + '<em>|</em>');
		$(downloadPic.downloadBtn.jQuerySelector).text(downloadPic.downloadBtn.text).css({
			'color': '#d1d1d1',
			'margin-right': '5px',
			'float': 'left',
			'font-size': '14px',
			'display': 'block',
			'height': '35px',
			'background-image': 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik05MjQuNywxMEg3NS4zQzM5LjIsMTAsMTAsMzkuMiwxMCw3NS4zdjg0OS4zYzAsMzYuMSwyOS4yLDY1LjMsNjUuMyw2NS4zaDg0OS4zYzM2LjEsMCw2NS4zLTI5LjIsNjUuMy02NS4zVjc1LjNDOTkwLDM5LjIsOTYwLjcsMTAsOTI0LjcsMTB6IE05NTcuMyw5MDguM2MwLDI3LjEtMjEuOSw0OS00OSw0OUg5MS43Yy0yNy4xLDAtNDktMjEuOS00OS00OVY5MS43YzAtMjcuMSwyMS45LTQ5LDQ5LTQ5aDgxNi43YzI3LjEsMCw0OSwyMS45LDQ5LDQ5VjkwOC4zeiIgc3R5bGU9ImZpbGw6I0ZGRkZGRiI+PC9wYXRoPjxwYXRoIGQ9Ik02MzAuOSw0MzQuN2gtOTguMlYyNzEuM2gtNjUuM3YxNjMuM2gtOTguMkw1MDAsNTY1LjVMNjMwLjksNDM0Ljd6IiBzdHlsZT0iZmlsbDojRkZGRkZGIj48L3BhdGg+PHBhdGggZD0iTTY2My4zLDY2My4zSDMzNi43VjU5OGgtNjUuM3Y2NS4zdjY1LjNoNDU3LjN2LTY1LjNWNTk4aC02NS4zVjY2My4zeiIgc3R5bGU9ImZpbGw6I0ZGRkZGRiI+PC9wYXRoPjwvZz48L3N2Zz4gIA==)',
			'background-repeat': 'no-repeat',
			'background-position': '0 12px',
			'background-size': '13px'
		}).on('click', function() {
			$(downloadPic.downloadBtn.jQuerySelector).text(downloadPic.downloadBtn.text + downloadPic.textDownload.dotStr);
			imgSrc = imgSrc + '?show';
			downloadPic.downloadFile(imgSrc, 0, 0, updateProgress, bbsPhotoTransferComplete, saveAs)
		})
	}
	function addBbsDcDownloadBtn(container, countNum) {
		let imgSpanSrc = container.attr("src2");
		if (imgSpanSrc === undefined) {
			imgSpanSrc = container.attr("src")
		}
		imgSpanSrc = getTrueUrl(imgSpanSrc);
		container.before(downloadPic.downloadBtn.tag);
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text).css({
			'color': '#fefefe',
			'position': 'absolute',
			'left': '10px',
			'top': '12px',
			'height': '18px',
			'line-height': '18px',
			'font-size': '16px',
			'display': 'block',
			'background-color': 'rgba(0, 0, 0, 0.7)',
			'border-radius': '4px',
			'padding': '4px 12px',
			'text-decoration': 'none'
		}).hover(function() {
			$(this).css({
				'color': '#f60'
			})
		}, function() {
			$(this).css({
				'color': '#fefefe'
			})
		}).on('click', function() {
			readFile(imgSpanSrc, countNum, 0)
		})
	}
	function addBbsDcDownloadAllBtn(container) {
		container.append(downloadPic.downloadAllBtn.tag);
		$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text).css({
			'color': '#47afeb',
			'font-size': '16px',
			'display': 'inline-block',
			'text-decoration': 'none',
			'margin-left': '50px'
		}).hover(function() {
			$(this).css({
				'color': '#f60'
			})
		}, function() {
			$(this).css({
				'color': '#47afeb'
			})
		}).on('click', function() {
			let imgSpanGroup = $(".topiccontent .LazyloadImg");
			downloadPic.numberOfDownload.currentNum = 0;
			downloadPic.numberOfDownload.totalNum = imgSpanGroup.length;
			$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text + downloadPic.textDownload.startStr + downloadPic.numberOfDownload.currentNum + downloadPic.textDownload.divideStr + downloadPic.numberOfDownload.totalNum + downloadPic.textDownload.endStr);
			let eachImgSrc;
			for (let i = 0; i < imgSpanGroup.length; i++) {
				eachImgSrc = imgSpanGroup.eq(i).attr('src2');
				if (eachImgSrc === undefined) {
					eachImgSrc = imgSpanGroup.eq(i).attr('src')
				}
				eachImgSrc = getTrueUrl(eachImgSrc);
				readFile(eachImgSrc, i, 1)
			}
		})
	}
	function addBbsDcProgressBtn(container) {
		let progressBtn = '<div id="divProgress"><p id="progressText">进度:</p><p id="progressBtn">' + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + '</p></div>';
		container.after(progressBtn);
		$("div#divProgress").css({
			'position': 'fixed',
			'display': 'block',
			'margin-left': '570px',
			'left': '50%',
			'bottom': '20px',
			'font-size': '16px',
			'color': '#47afeb'
		})
	}
	if (old_url.indexOf("dp.pconline.com.cn/photo/") !== -1) {
		let imgContainer = $(".aView");
		for (let i = 0; i < imgContainer.length; i++) {
			addDownloadBtn(imgContainer.eq(i), i)
		}
		if (old_url.indexOf("/list_") !== -1) {
			addDownloadAllBtn($(".btn22H").eq(0));
			addProgressBtn($("div#Jguide"))
		}
	}
	if (old_url.indexOf("itbbs.pconline.com.cn/photo") !== -1) {
		addBbsPhotoDownloadBtn($(".topiclinks .icon-1"))
	}
	if (old_url.indexOf("itbbs.pconline.com.cn/dc/") !== -1) {
		let imgSpan = $(".topiccontent .LazyloadImg");
		for (let k = 0; k < imgSpan.length; k++) {
			addBbsDcDownloadBtn(imgSpan.eq(k), k)
		}
		addBbsDcDownloadAllBtn($(".mainfloor-cont .tit"));
		addBbsDcProgressBtn($("div#Jguide"))
	}
})();