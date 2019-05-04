// ==UserScript==
// @name         POCO摄影图片社区添加下载按钮
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      2.1.1
// @description  添加下载原图按钮
// @author       pana
// @include      http*://www.poco.cn/works/*
// @include      http*://www.poco.cn/activity/*
// @grant        none
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.min.js
// @require      https://greasyfork.org/scripts/376157-downloadpic-js/code/downloadPicjs.js?version=658364
// ==/UserScript==

(function() {
	'use strict';
	const old_url = location.href;
	var open_title = '';
	var numArray = [];
	const pocoValue = {
		borderColor: {
			mouseleave: '#ddd',
			mouseenter: '#46d233'
		},
		backgroundColor: {
			mouseleave: 'rgba(0, 0, 0, 0.4)',
			mouseenter: 'rgba(0, 0, 0, 0.6)'
		},
		reg: {
			group: /_[a-z][0-9]+\.(jpg|jpeg|png|bmp|gif)$/i,
			trueGroup: /_[a-z][0-9]+\./i
		},
		iconUrl: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik0yNTIuNSw1MzIuNUw1MDAsNzgwbDI0Ny41LTI0Ny41TDY5OCw0ODNMNTM1LDY0NlYxMGgtNzB2NjM2TDMwMiw0ODNMMjUyLjUsNTMyLjV6IiBzdHlsZT0iZmlsbDojRkZGRkZGIj48L3BhdGg+PHBhdGggZD0iTTkyMCw2NDB2MjgwSDgwVjY0MEgxMHYzNTBoOTgwVjY0MEg5MjB6IiBzdHlsZT0iZmlsbDojRkZGRkZGIj48L3BhdGg+PC9nPjwvc3ZnPiAg)'
	};
	const urlListener = {
		works: 'poco.cn/works/works_list',
		activity: 'poco.cn/activity/detail'
	};

	function updateProgress(imgNum, percentComplete) {
		if ($("progress#progressId" + imgNum.toString()).length === 0) {
			let download_progress = '<progress max="100" class="downloadProgress" id="progressId' + imgNum.toString() + '" style="position: absolute; bottom: 0; width: 90px; height: 6px;"></progress>';
			$("li.cc_thumbs_item").eq(imgNum - 1).append(download_progress)
		}
		$("progress#progressId" + imgNum.toString()).attr('value', percentComplete)
	}
	function transferComplete(imgNum, allStatus) {
		if ($("progress#progressId" + imgNum.toString()).length === 0) {
			let download_progress = '<progress max="100" class="downloadPro" id="progressId' + imgNum.toString() + '" style="position: absolute; bottom: 0; width: 90px; height: 6px;"></progress>';
			$("li.cc_thumbs_item").eq(imgNum - 1).append(download_progress)
		}
		$("progress#progressId" + imgNum.toString()).attr('value', 100);
		if ($.inArray(imgNum, numArray) === -1) {
			numArray.push(imgNum)
		}
		downloadPic.numberOfDownload.downloadCurrentNum++;
		$("span#textProgress").text(downloadPic.textProgress.startStr + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + downloadPic.textProgress.endStr);
		if (allStatus === 1) {
			downloadPic.numberOfDownload.currentNum++;
			$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text + downloadPic.textDownload.startStr + downloadPic.numberOfDownload.currentNum + downloadPic.textDownload.divideStr + downloadPic.numberOfDownload.totalNum + downloadPic.textDownload.endStr);
			if (downloadPic.numberOfDownload.currentNum === downloadPic.numberOfDownload.totalNum) {
				$(downloadPic.downloadAllBtn.jQuerySelector).attr("title", downloadPic.downloadAllBtn.finishTitle)
			}
		}
	}
	function blogUpdateProgress(countNum, percentComplete) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.startStr + percentComplete + downloadPic.textDownload.percentEndStr)
	}
	function blogTransferComplete(countNum, allStatus) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.finishStr).attr('title', downloadPic.downloadBtn.finishTitle);
		downloadPic.numberOfDownload.downloadCurrentNum++;
		$('p#progressBtn').text(downloadPic.textProgress.startStr + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + downloadPic.textProgress.endStr);
		if (allStatus === 1) {
			downloadPic.numberOfDownload.currentNum++;
			if (downloadPic.numberOfDownload.currentNum === downloadPic.numberOfDownload.totalNum) {
				$(downloadPic.downloadAllBtn.jQuerySelector).attr("title", downloadPic.downloadAllBtn.finishTitle)
			}
		}
	}
	function getTrueUrl(imgUrl) {
		let imgAddress = pocoValue.reg.group.exec(imgUrl)[0];
		imgAddress = pocoValue.reg.trueGroup.exec(imgAddress)[0];
		return imgUrl.replace(imgAddress, '.')
	}
	function displayPic() {
		let imgUrl = $("img.cc_cur_big").attr("src");
		if (imgUrl !== undefined) {
			imgUrl = getTrueUrl(imgUrl);
			return imgUrl
		}
		return 'javascript:;'
	}
	function readFile() {
		let imgUrl = $("img.cc_cur_big").attr("src");
		if (imgUrl !== undefined) {
			let imgNum = Number($("div.cc_page_number span").eq(0).text());
			if ($("progress#progressId" + imgNum.toString()).length === 0) {
				let download_progress = '<progress max="100" class="downloadProgress" id="progressId' + imgNum.toString() + '" style="position: absolute; bottom: 0; width: 90px; height: 6px;"></progress>';
				$("li.cc_thumbs_item").eq(imgNum - 1).append(download_progress)
			}
			imgUrl = getTrueUrl(imgUrl);
			downloadPic.numberOfDownload.downloadTotalNum++;
			$("span#textProgress").text(downloadPic.textProgress.startStr + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + downloadPic.textProgress.endStr);
			downloadPic.downloadFile(imgUrl, imgNum, 0, updateProgress, transferComplete, saveAs)
		}
	}
	function readAllFile() {
		let imgGroup = $("li.cc_thumbs_item img");
		downloadPic.numberOfDownload.totalNum = imgGroup.length;
		downloadPic.numberOfDownload.currentNum = 0;
		$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text + downloadPic.textDownload.startStr + downloadPic.numberOfDownload.currentNum + downloadPic.textDownload.divideStr + downloadPic.numberOfDownload.totalNum + downloadPic.textDownload.endStr);
		for (let i = 0; i < imgGroup.length; i++) {
			let imgSrc = imgGroup.eq(i).attr("src");
			imgSrc = getTrueUrl(imgSrc);
			if ($("progress#progressId" + (i + 1).toString()).length === 0) {
				let download_progress = '<progress max="100" class="downloadProgress" id="progressId' + (i + 1).toString() + '" style="position: absolute; bottom: 0; width: 90px; height: 6px;"></progress>';
				$("li.cc_thumbs_item").eq(i).append(download_progress)
			}
			downloadPic.numberOfDownload.downloadTotalNum++;
			$("span#textProgress").text(downloadPic.textProgress.startStr + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + downloadPic.textProgress.endStr);
			downloadPic.downloadFile(imgSrc, i + 1, 1, updateProgress, transferComplete, saveAs)
		}
	}
	function blogReadFile(blogImgSrc, countNum, allStatus) {
		$(downloadPic.downloadBtn.jQuerySelector).eq(countNum).text(downloadPic.downloadBtn.text + downloadPic.textDownload.dotStr);
		downloadPic.numberOfDownload.downloadTotalNum++;
		$("p#progressBtn").text(downloadPic.textProgress.startStr + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + downloadPic.textProgress.endStr);
		downloadPic.downloadFile(blogImgSrc, countNum, allStatus, blogUpdateProgress, blogTransferComplete, saveAs)
	}
	function addDisplayBtn(container) {
		downloadPic.displayBtn.addClass('gp_button');
		container.after(downloadPic.displayBtn.tag);
		$(downloadPic.displayBtn.jQuerySelector).text(downloadPic.displayBtn.text).css({
			'border': '1px solid',
			'border-color': pocoValue.borderColor.mouseleave,
			'width': '300px',
			'height': '40px'
		}).hover(function() {
			$(this).css({
				'border-color': pocoValue.borderColor.mouseenter
			})
		}, function() {
			$(this).css({
				'border-color': pocoValue.borderColor.mouseleave
			})
		}).on('mousedown', function() {
			this.href = displayPic()
		})
	}
	function addDownloadBtn(container) {
		downloadPic.downloadBtn.addClass('gp_button');
		container.after(downloadPic.downloadBtn.tag);
		$(downloadPic.downloadBtn.jQuerySelector).text(downloadPic.downloadBtn.text).css({
			'border': '1px solid',
			'border-color': pocoValue.borderColor.mouseleave,
			'width': '300px',
			'height': "40px"
		}).hover(function() {
			$(this).css({
				'border-color': pocoValue.borderColor.mouseenter
			})
		}, function() {
			$(this).css({
				'border-color': pocoValue.borderColor.mouseleave
			})
		}).on('click', function() {
			readFile()
		})
	}
	function addDownloadAllBtn(container) {
		downloadPic.downloadAllBtn.addClass('gp_button');
		container.after(downloadPic.downloadAllBtn.tag);
		if (downloadPic.numberOfDownload.totalNum > 0) {
			$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text + downloadPic.textDownload.startStr + downloadPic.numberOfDownload.currentNum + downloadPic.textDownload.divideStr + downloadPic.numberOfDownload.totalNum + downloadPic.textDownload.endStr);
			if (downloadPic.numberOfDownload.currentNum === downloadPic.numberOfDownload.totalNum) {
				$(downloadPic.downloadAllBtn.jQuerySelector).attr("title", downloadPic.downloadAllBtn.finishTitle)
			}
		} else {
			$(downloadPic.downloadAllBtn.jQuerySelector).text(downloadPic.downloadAllBtn.text)
		}
		$(downloadPic.downloadAllBtn.jQuerySelector).css({
			'border': '1px solid',
			'border-color': pocoValue.borderColor.mouseleave,
			'width': '300px',
			'height': "40px"
		}).hover(function() {
			$(this).css({
				'border-color': pocoValue.borderColor.mouseenter
			})
		}, function() {
			$(this).css({
				'border-color': pocoValue.borderColor.mouseleave
			})
		}).on('click', function() {
			readAllFile()
		})
	}
	function addBlogDownloadBtn(container, count) {
		let blogImgSrc = container.attr('data-src');
		blogImgSrc = getTrueUrl(blogImgSrc);
		container.after(downloadPic.downloadBtn.tag);
		container.parent().css({
			'position': 'relative'
		});
		$(downloadPic.downloadBtn.jQuerySelector).eq(count).text(downloadPic.downloadBtn.text).css({
			'position': 'absolute',
			'top': '30px',
			'left': '90px',
			'display': 'block',
			'border-radius': '4px',
			'text-align': 'center',
			'padding-left': '12px',
			'padding-right': '12px',
			'height': '28px',
			'color': '#fff',
			'font-size': '12px',
			'line-height': '28px',
			'background-color': pocoValue.backgroundColor.mouseleave
		}).hover(function() {
			$(this).css({
				'background-color': pocoValue.backgroundColor.mouseenter
			})
		}, function() {
			$(this).css({
				'background-color': pocoValue.backgroundColor.mouseleave
			})
		}).on('click', function() {
			blogReadFile(blogImgSrc, count, 0)
		})
	}
	function addBlogDownloadAllBtn(container) {
		container.after(downloadPic.downloadAllBtn.tag);
		$(downloadPic.downloadAllBtn.jQuerySelector).css({
			'display': 'block',
			'position': 'fixed',
			'right': '40px',
			'bottom': '110px',
			'width': '44px',
			'height': '44px',
			'background-color': pocoValue.backgroundColor.mouseleave,
			'z-index': '100',
			'background-image': pocoValue.iconUrl,
			'background-repeat': 'no-repeat',
			'background-size': '32px auto',
			'background-position': 'center'
		}).hover(function() {
			$(this).css({
				'background-color': pocoValue.backgroundColor.mouseenter
			})
		}, function() {
			$(this).css({
				'background-color': pocoValue.backgroundColor.mouseleave
			})
		}).on('click', function() {
			let totalBlogImgGroup = $("div.vw_detail_bimg img");
			downloadPic.numberOfDownload.currentNum = 0;
			downloadPic.numberOfDownload.totalNum = totalBlogImgGroup.length;
			let eachBlogImgSrc;
			for (let i = 0; i < totalBlogImgGroup.length; i++) {
				eachBlogImgSrc = totalBlogImgGroup.eq(i).attr('data-src');
				eachBlogImgSrc = getTrueUrl(eachBlogImgSrc);
				blogReadFile(eachBlogImgSrc, i, 1)
			}
		})
	}
	function imgMainFunction() {
		if ($(downloadPic.downloadBtn.jQuerySelector).length === 0) {
			let gpBtn = $("a.gp_button_nowidth").eq(1);
			addDownloadAllBtn(gpBtn);
			addDownloadBtn(gpBtn);
			addDisplayBtn(gpBtn);
			let progress_text = '<span id="textProgress" style="font-size: 14px;"></span>';
			$("div.cc_right_bottom").prepend(progress_text);
			$("span#textProgress").text(downloadPic.textProgress.startStr + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + downloadPic.textProgress.endStr);
			let download_progress;
			for (let x in numArray) {
				download_progress = '<progress max="100" class="downloadPro" id="progressId' + numArray[x].toString() + '" style="position: absolute; bottom: 0; width: 90px; height: 6px;" value="100"></progress>';
				$("li.cc_thumbs_item").eq(numArray[x] - 1).append(download_progress)
			}
		}
	}
	function blogMainFunction() {
		let blogImgGroup = $("div.vw_detail_bimg img");
		for (let i = 0; i < blogImgGroup.length; i++) {
			addBlogDownloadBtn(blogImgGroup.eq(i), i)
		}
		addBlogDownloadAllBtn($("div.work_wrap h4").eq(0));
		let progress_btn = '<div id="divProgress"><p id="progressBtn">' + downloadPic.textProgress.startStr + downloadPic.numberOfDownload.downloadCurrentNum + downloadPic.textProgress.divideStr + downloadPic.numberOfDownload.downloadTotalNum + downloadPic.textProgress.endStr + '</p></div>';
		$("span.cc_nav_discover").after(progress_btn);
		$("div#divProgress").css({
			'position': 'relative',
			'display': 'inline-block',
			'top': '22px',
			'margin-left': '20px',
			'font-size': '15px',
		})
	}
	function init() {
		if ($("div.w_poco_image_preview_v2").length !== 0) {
			imgMainFunction();
			let screenchange = new MutationObserver(function() {
				imgMainFunction()
			});
			let screenchangeContainer = document.querySelector('div.w_poco_image_preview_v2');
			let screenchangeOption = {
				'childList': true
			};
			screenchange.observe(screenchangeContainer, screenchangeOption)
		}
		if ($("div.cc_detail_blog").length !== 0) {
			blogMainFunction()
		}
	}
	init();
	for (let i in urlListener) {
		if (old_url.indexOf(urlListener[i]) !== -1) {
			let observer = new MutationObserver(function() {
				let new_title = $("h4.cc_info_title").text();
				if (new_title !== '') {
					if (open_title !== new_title) {
						open_title = new_title;
						numArray = []
					}
					init()
				}
			});
			let listenerContainer = document.querySelector("div.w_poco_works_detail");
			let option = {
				'childList': true
			};
			observer.observe(listenerContainer, option)
		}
	}
})();