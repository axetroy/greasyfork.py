// ==UserScript==
// @name         uraaka-joshi.com downloader
// @namespace    https://saber.love/?namespace=uraaka-joshi.com
// @version      0.2
// @description  uraaka-joshi.com downloader, 100 pages each time. 下载 uraaka-joshi.com 的图片和视频，每次抓取100页。
// @author       saber
// @match        https://www.uraaka-joshi.com/*
// @grant        none
// @run-at document-body
// ==/UserScript==

let img_result = [];
let video_result = [];
let now_no;
if (!location.href.includes('.html')) { // 没有页码
	now_no = 1; // 第一页
} else {
	now_no = parseInt(/\d*\d\./.exec(location.href)[0]); // 当前页码
}
let start_url = location.href.split('pages/')[0];
let parser = new DOMParser();
let max = now_no + 100;
let tipbar;

function start() {
	fetch(getUrl())
		.then(res => {
			if (res.status === 404) {
				tipbar.innerHTML = '已到达最后一页';
				showResult();
				return false;
			}
			res.text()
				.then(res => {
					let _DOM = parser.parseFromString(res, 'text/html');
					// 添加图片网址
					let imgs = _DOM.querySelectorAll('.photo-content img');
					let imgurls = Array.from(imgs).map(el => {
						return el.src.replace('d_thumb_', '');
					});
					img_result = img_result.concat(imgurls);
					// 添加视频网址
					let videos = _DOM.querySelectorAll('.adaptive-video video');
					let videourls = Array.from(videos).map(el => {
						return el.src;
					});
					video_result = video_result.concat(videourls);
					// 开始下一页
					tipbar.innerHTML = '页码 ' + now_no + ' 抓取完毕';
					now_no++;
					if (now_no > max) {
						tipbar.innerHTML = '已达到每次抓取最大页数：' + max;
						showResult();
						return false;
					}
					start();
				})
		})
}

function getUrl() {
	if (now_no === 1) {
		return start_url;
	} else {
		return start_url + 'pages/' + now_no + '.html';
	}
}

function showResult() {
	console.log(img_result);

	document.querySelectorAll('#xzd textarea')[0].innerHTML = [...new Set(img_result)].reduce((total, url) => {
		return total + '\r\n' + url
	});
	document.querySelectorAll('#xzd textarea')[1].innerHTML = [...new Set(video_result)].reduce((total, url) => {
		return total + '\r\n' + url
	});
}

document.addEventListener('DOMContentLoaded', () => {
	let pageno = document.querySelector('.pagination');
	if (pageno) {
		let xzdBtn = `<button id="xzdBtn" style="background: #89c8f9;">开始下载</button>`;
		let xzdhtml = `<div id="xzd" style="display:none;">
		<p>进度提示</p>
		<fieldset>
			<legend>图片 url</legend>
			<textarea style="width:500px;height:100px;"></textarea>
		</fieldset>
		<fieldset>
			<legend>视频 url</legend>
			<textarea style="width:500px;height:100px;"></textarea>
		</fieldset>
	</div>`;
		document.querySelector('.content-main').insertAdjacentHTML('afterbegin', xzdhtml);
		document.querySelector('.content-main').insertAdjacentHTML('afterbegin', xzdBtn);
		document.querySelector('#xzdBtn').onclick = function () {
			start();
			this.disabled = true;
			document.querySelector('#xzd').style.display = "block";
			tipbar = document.querySelector('#xzd p');
		}
	}
})