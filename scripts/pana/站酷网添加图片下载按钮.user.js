// ==UserScript==
// @name         站酷网添加图片下载按钮
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.0.0
// @description  添加下载按钮
// @author       pana
// @include      http*://www.zcool.com.cn/work/*
// @grant        none
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.min.js
// @require      https://greasyfork.org/scripts/376157-downloadpic-js/code/downloadPicjs.js?version=658364
// ==/UserScript==

(function() {
	'use strict';
	const zcoolValue = {
		groupReg: /^(http:|https:)?\/\/img\.zcool\.cn\/[0-9a-z\/\-_.]+\.(jpg|jpeg|png|bmp|gif)/i,
		downloadBtn: {
			iconUrl: 'url(https://static.hellorf.com/v180817115700/hellorf/images/iconpic-r-cache-hover.svg)',
			backgroundColor: {
				mouseleave: 'rgba(0, 0, 0, 0.5)',
				mouseenter: 'rgba(0, 0, 0, 0.8)'
			}
		},
		downloadAllBtn: {
			backgroundImage: {
				mouseleave: 'url(https://static.hellorf.com/v180817115700/hellorf/images/iconpic-r-cache.svg)',
				mouseenter: 'url(https://static.hellorf.com/v180817115700/hellorf/images/iconpic-r-cache-hover.svg)'
			},
			backgroundColor: {
				mouseleave: '#eee',
				mouseenter: '#ea4335'
			},
			backgroundPosition: {
				mouseleave: '10px center',
				mouseenter: '74px center'
			},
			width: {
				mouseleave: '36px',
				mouseenter: '100px'
			},
			text: {
				mouseleave: '',
				mouseenter: '下载全部'
			}
		},
		progressBtn: {
			backgroundColor: {
				mouseleave: '#eee',
				mouseenter: '#ea4335'
			},
			width: {
				mouseleave: '36px',
				mouseenter: '100px'
			},
			textColor: {
				mouseleave: '#818181',
				mouseenter: '#fff'
			},
			text: {
				mouseleave: '',
				mouseenter: '下载进度:'
			}
		}
	};

	function updateProgress(countNum, percentComplete) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.startStr + percentComplete + downloadPic.textDownload.percentEndStr)
	}
	function transferComplete(countNum, allStatus) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.finishStr).attr('title', downloadPic.downloadBtn.finishTitle);
		downloadPic.numberOfDownload.downloadCurrentNum++;
		$('p#progressBtn').text(downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum);
		if (allStatus === 1) {
			downloadPic.numberOfDownload.currentNum++;
			if (downloadPic.numberOfDownload.currentNum === downloadPic.numberOfDownload.totalNum) {
				$(downloadPic.downloadAllBtn.jQuerySelector).attr("title", downloadPic.downloadAllBtn.finishTitle)
			}
		}
	}
	function readFile(imgSrc, count, allStatus) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(count).text(downloadPic.downloadBtn.text + downloadPic.textDownload.dotStr);
		downloadPic.numberOfDownload.downloadTotalNum++;
		$("p#progressBtn").text(downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum);
		downloadPic.downloadFile(imgSrc, count, allStatus, updateProgress, transferComplete, saveAs)
	}
	function addDownloadBtn(container, count) {
		let workImgSrc = container.attr('src');
		workImgSrc = zcoolValue.groupReg.exec(workImgSrc)[0];
		container.after(downloadPic.downloadBtn.tag);
		container.parent().css({
			'position': 'relative'
		});
		$(downloadPic.downloadBtn.jQuerySelector).eq(count).text(downloadPic.downloadBtn.text).css({
			'position': 'absolute',
			'top': '30px',
			'left': '30px',
			'display': 'block',
			'border-radius': '4px',
			'text-align': 'center',
			'vertical-align': 'middle',
			'zoom': '1',
			'padding-left': '36px',
			'padding-right': '12px',
			'height': '28px',
			'color': '#fff',
			'font-size': '12px',
			'line-height': '28px',
			'background-color': zcoolValue.downloadBtn.backgroundColor.mouseleave,
			'background-image': zcoolValue.downloadBtn.iconUrl,
			'background-repeat': 'no-repeat',
			'background-position': '13px center',
			'background-size': '16px 14px'
		}).hover(function() {
			$(this).css({
				'background-color': zcoolValue.downloadBtn.backgroundColor.mouseenter
			})
		}, function() {
			$(this).css({
				'background-color': zcoolValue.downloadBtn.backgroundColor.mouseleave
			})
		}).on('click', function() {
			readFile(workImgSrc, count, 0)
		})
	}
	function addDownloadAllBtn(container) {
		container.after(downloadPic.downloadAllBtn.tag);
		$(downloadPic.downloadAllBtn.jQuerySelector).text(zcoolValue.downloadAllBtn.text.mouseleave).css({
			'position': 'fixed',
			'display': 'block',
			'width': zcoolValue.downloadAllBtn.width.mouseleave,
			'height': '36px',
			'right': '15px',
			'bottom': '106px',
			'background-image': zcoolValue.downloadAllBtn.backgroundImage.mouseleave,
			'background-size': '16px auto',
			'background-repeat': 'no-repeat',
			'background-position': zcoolValue.downloadAllBtn.backgroundPosition.mouseleave,
			'background-color': zcoolValue.downloadAllBtn.backgroundColor.mouseleave,
			'border-radius': '4px',
			'text-indent': '-26px',
			'font-size': '12px',
			'line-height': '36px',
			'text-align': 'center',
			'color': '#fff',
			'z-index': '9999'
		}).hover(function() {
			$(this).css({
				'width': zcoolValue.downloadAllBtn.width.mouseenter,
				'background-image': zcoolValue.downloadAllBtn.backgroundImage.mouseenter,
				'background-color': zcoolValue.downloadAllBtn.backgroundColor.mouseenter,
				'background-position': zcoolValue.downloadAllBtn.backgroundPosition.mouseenter,
			});
			$(this).text(zcoolValue.downloadAllBtn.text.mouseenter)
		}, function() {
			$(this).css({
				'width': zcoolValue.downloadAllBtn.width.mouseleave,
				'background-image': zcoolValue.downloadAllBtn.backgroundImage.mouseleave,
				'background-color': zcoolValue.downloadAllBtn.backgroundColor.mouseleave,
				'background-position': zcoolValue.downloadAllBtn.backgroundPosition.mouseleave,
			});
			$(this).text(zcoolValue.downloadAllBtn.text.mouseleave)
		}).on('click', function() {
			let totalWorkImgGroup = $("div.work-show-box img");
			downloadPic.numberOfDownload.currentNum = 0;
			downloadPic.numberOfDownload.totalNum = totalWorkImgGroup.length;
			let eachWorkImgSrc;
			for (let j = 0; j < totalWorkImgGroup.length; j++) {
				eachWorkImgSrc = totalWorkImgGroup.eq(j).attr('src');
				eachWorkImgSrc = zcoolValue.groupReg.exec(eachWorkImgSrc)[0];
				readFile(eachWorkImgSrc, j, 1)
			}
		})
	}
	let workImgGroup = $("div.work-show-box img");
	for (let i = 0; i < workImgGroup.length; i++) {
		addDownloadBtn(workImgGroup.eq(i), i)
	}
	addDownloadAllBtn($("div.details-fixed-wrap"));
	let progress_btn = '<div id="divProgress"><p id="progressText"></p><p id="progressBtn">' + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + '</p></div>';
	$("div.details-fixed-wrap").after(progress_btn);
	$("p#progressText").css({
		'text-align': 'center',
		'display': 'inline'
	});
	$("p#progressBtn").css({
		'text-align': 'center',
		'display': 'inline'
	});
	$("div#divProgress").css({
		'position': 'fixed',
		'display': 'block',
		'width': zcoolValue.progressBtn.width.mouseleave,
		'height': '36px',
		'right': '15px',
		'bottom': '60px',
		'background-color': zcoolValue.progressBtn.backgroundColor.mouseleave,
		'border-radius': '4px',
		'font-size': '12px',
		'line-height': '36px',
		'text-align': 'center',
		'color': zcoolValue.progressBtn.textColor.mouseleave,
		'z-index': '9999'
	}).hover(function() {
		$(this).css({
			'width': zcoolValue.progressBtn.width.mouseenter,
			'color': zcoolValue.progressBtn.textColor.mouseenter,
			'background-color': zcoolValue.progressBtn.backgroundColor.mouseenter
		});
		$("p#progressText").text(zcoolValue.progressBtn.text.mouseenter)
	}, function() {
		$(this).css({
			'width': zcoolValue.progressBtn.width.mouseleave,
			'color': zcoolValue.progressBtn.textColor.mouseleave,
			'background-color': zcoolValue.progressBtn.backgroundColor.mouseleave
		});
		$("p#progressText").text(zcoolValue.progressBtn.text.mouseleave)
	});
	let laypage_next = $("a.laypage_next");
	if (laypage_next.length !== 0) {
		let aNextPage = '<a id="aNextPage"></a>';
		$("div.work-center-con").append(aNextPage);
		$("a#aNextPage").css({
			'display': 'inline-block',
			'width': '52px',
			'height': '52px',
			'position': 'fixed',
			'text-decoration': 'underline',
			'float': 'right',
			'right': '0',
			'top': '50%',
			'color': '#474747',
			'background': 'url(https://tu.heiguang.com/img/common/bg.png) no-repeat',
			'background-color': '#f6f6f6',
			'background-position': '-85px -294px',
			'z-index': '4',
			'border-radius': '6px'
		}).hover(function() {
			$(this).css({
				'background-position': '-85px -338px',
				'background-color': '#c2c2c2'
			})
		}, function() {
			$(this).css({
				'background-position': '-85px -294px',
				'background-color': '#f6f6f6'
			})
		}).attr('href', laypage_next.attr("href")).attr('title', '下一页')
	}
	let laypage_prev = $("a.laypage_prev");
	if (laypage_prev.length !== 0) {
		let aPrevPage = '<a id="aPrevPage"></a>';
		$("div.work-center-con").append(aPrevPage);
		$("a#aPrevPage").css({
			'display': 'inline-block',
			'width': '52px',
			'height': '52px',
			'position': 'fixed',
			'text-decoration': 'underline',
			'float': 'left',
			'left': '0',
			'top': '50%',
			'color': '#474747',
			'background': 'url(https://tu.heiguang.com/img/common/bg.png) no-repeat',
			'background-color': '#f6f6f6',
			'background-position': '-30px -294px',
			'z-index': '4',
			'border-radius': '6px'
		}).hover(function() {
			$(this).css({
				'background-position': '-30px -338px',
				'background-color': '#c2c2c2'
			})
		}, function() {
			$(this).css({
				'background-position': '-30px -294px',
				'background-color': '#f6f6f6'
			})
		}).attr('href', laypage_prev.attr("href")).attr('title', '上一页')
	}
})();