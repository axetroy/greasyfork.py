// ==UserScript==
// @name         豆瓣电影：详情页面添加查看原图按钮 | Movie.Douban.com: HD Poster Btn added
// @namespace    https://github.com/IAMEVANHE
// @version      1.0.0
// @description  try to take over the world!
// @author       iamevanhe
// @match        https://movie.douban.com/subject/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
	'use strict';

	// page identifier
	let posterAnchor = document.querySelector('#mainpic > a');

	if(posterAnchor){
		// get the posters page's URL via movie.douban.com's customs
		let url = window.location.href;
		let urlTrimmed = url.slice(0, 42);
		let postersUrl = urlTrimmed + "photos?type=R";

		// ajax call on the posters page's URL
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let tempDiv = document.createElement('div');
				tempDiv.innerHTML = this.responseText;
				let aPosterUrl = tempDiv.querySelector('.article > ul > li:nth-child(1) > div.cover > a').getAttribute('href');

				// ajax call on the 1st poster's page
				let xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						let tempDiv = document.createElement('div');
						tempDiv.innerHTML = this.responseText;
						let hdPosterAnchor = tempDiv.querySelector('span.magnifier > a');
						let info = document.querySelector('#info');
						info.appendChild(hdPosterAnchor);
					}
				};
				xhttp.open("GET", aPosterUrl, true);
				xhttp.send();
				// another ajax ends
			}
		};
		xhttp.open("GET", postersUrl, true);
		xhttp.send();
		// ajax call ends
	}
})();